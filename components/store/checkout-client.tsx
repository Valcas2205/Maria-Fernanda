'use client';

import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/lib/cart-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  ArrowLeft,
  Loader2,
  Tablet,
  BookOpen,
  CreditCard,
  Lock,
  Copy,
  Check,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  issueCheckoutTokenAction,
  upsertCheckoutCustomerAction,
  submitCheckoutPaymentAction,
} from '@/lib/payments/actions';

type StepKey = 'contact' | 'shipping' | 'payment-method' | 'confirm';

type PaymentMethodKey = 'pago_movil' | 'zelle' | 'paypal';

const PAYMENT_METHOD_TITLES: Record<PaymentMethodKey, string> = {
  pago_movil: 'Pago Móvil',
  zelle: 'Zelle',
  paypal: 'PayPal',
};

// Cuenta receptora de Pago Móvil. Los valores "copiables" van sin puntos,
// guiones ni símbolos porque así los exigen los formularios/SMS de los
// bancos venezolanos (código de banco de 4 dígitos, cédula y teléfono en
// puros dígitos).
const PAGO_MOVIL_BANK_CODE = '0138'; // Banco Plaza
const PAGO_MOVIL_BANK_NAME = 'Banco Plaza';
const PAGO_MOVIL_ID = '26540635'; // V-26.540.635
const PAGO_MOVIL_PHONE = '04245414804'; // 0424-5414804

const ZELLE_PAYPAL_EMAIL = 'mafeazcunes@gmail.com';
const ZELLE_PAYPAL_NAME = 'Maria Azcunes';

type PaymentCopyLine = { id: string; display: string; copyValue: string };

const formatMontoBsForCopy = (amountBs: number): string =>
  // Bs con coma decimal y sin separador de miles, formato que aceptan los
  // campos de monto de Pago Móvil (igual que el comando SMS "PAGAR ... 58,95")
  amountBs.toFixed(2).replace('.', ',');

const formatMontoUsdForCopy = (amountUsd: number): string => amountUsd.toFixed(2);

function getPaymentLines(
  paymentMethod: string,
  total: number,
  bcvRate: number | null,
): PaymentCopyLine[] {
  if (paymentMethod === 'pago_movil') {
    const montoBs = bcvRate ? total * bcvRate : null;
    return [
      {
        id: 'banco',
        display: `${PAGO_MOVIL_BANK_NAME} (${PAGO_MOVIL_BANK_CODE})`,
        copyValue: PAGO_MOVIL_BANK_CODE,
      },
      {
        id: 'telefono',
        display: `${PAGO_MOVIL_PHONE.slice(0, 4)}-${PAGO_MOVIL_PHONE.slice(4)}`,
        copyValue: PAGO_MOVIL_PHONE,
      },
      {
        id: 'cedula',
        display: `V-${PAGO_MOVIL_ID.slice(0, 2)}.${PAGO_MOVIL_ID.slice(2, 5)}.${PAGO_MOVIL_ID.slice(5)}`,
        copyValue: PAGO_MOVIL_ID,
      },
      {
        id: 'monto',
        display: montoBs
          ? `${montoBs.toLocaleString('es-VE', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} Bs`
          : `${total.toFixed(2)} USD`,
        copyValue: montoBs ? formatMontoBsForCopy(montoBs) : formatMontoUsdForCopy(total),
      },
    ];
  }

  // zelle / paypal
  return [
    {
      id: 'monto',
      display: `${total.toFixed(2)} USD`,
      copyValue: formatMontoUsdForCopy(total),
    },
    { id: 'email', display: ZELLE_PAYPAL_EMAIL, copyValue: ZELLE_PAYPAL_EMAIL },
    { id: 'nombre', display: ZELLE_PAYPAL_NAME, copyValue: ZELLE_PAYPAL_NAME },
  ];
}

function getCopyAllValue(paymentMethod: string, lines: PaymentCopyLine[]): string {
  if (paymentMethod === 'pago_movil') {
    const byId = Object.fromEntries(lines.map((l) => [l.id, l.copyValue]));
    // Texto compatible con la opción "Pegar datos" de apps como BDVApp: detectan
    // banco, teléfono, cédula y monto por patrón dentro del texto sin importar
    // el orden, así que no llevan ninguna palabra clave ni separador especial.
    return `${byId.banco} ${byId.telefono} ${byId.cedula} ${byId.monto}`;
  }
  return lines.map((l) => l.copyValue).join('\n');
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';

  if (digits.startsWith('58')) {
    const phone = digits.slice(0, 12);
    if (phone.length <= 2) return `+${phone}`;
    if (phone.length <= 5) return `+${phone.slice(0, 2)} ${phone.slice(2)}`;
    if (phone.length <= 8)
      return `+${phone.slice(0, 2)} ${phone.slice(2, 5)}-${phone.slice(5)}`;
    return `+${phone.slice(0, 2)} ${phone.slice(2, 5)}-${phone.slice(5, 8)}-${phone.slice(8)}`;
  } else if (digits.startsWith('1')) {
    const phone = digits.slice(0, 11);
    if (phone.length <= 1) return `+${phone}`;
    if (phone.length <= 4) return `+${phone.slice(0, 1)} (${phone.slice(1)}`;
    if (phone.length <= 7)
      return `+${phone.slice(0, 1)} (${phone.slice(1, 4)}) ${phone.slice(4)}`;
    return `+${phone.slice(0, 1)} (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7)}`;
  } else {
    const phone = digits.slice(0, 15);
    if (phone.length <= 3) return `+${phone}`;
    if (phone.length <= 6) return `+${phone.slice(0, 3)} ${phone.slice(3)}`;
    return `+${phone.slice(0, 3)} ${phone.slice(3, 6)}-${phone.slice(6)}`;
  }
};

const handlePhoneChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setForm: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      agency: string;
      deliveryType: string;
      country: string;
      paymentMethod: string;
      paymentReference: string;
      docType: string;
      docNumber: string;
    }>
  >,
) => {
  let value = e.target.value;

  if (!value) {
    setForm((prev) => ({ ...prev, phone: '' }));
    return;
  }

  // Si ya tiene +, respetar lo que escriba el usuario
  if (value.startsWith('+')) {
    const formatted = formatPhoneNumber(value);
    setForm((prev) => ({ ...prev, phone: formatted }));
    return;
  }

  // Si solo tiene números sin +
  let digits = value.replace(/\D/g, '');

  // Si empieza con 0 (formato local venezolano), remover el 0
  if (digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  // Si después de remover el 0, está vacío, no hacer nada
  if (!digits) {
    setForm((prev) => ({ ...prev, phone: '' }));
    return;
  }

  // Si empieza con 1, asumir USA
  if (digits.startsWith('1')) {
    value = '+1' + digits.slice(1);
  }
  // Si empieza con 58, asumir Venezuela
  else if (digits.startsWith('58')) {
    value = '+58' + digits.slice(2);
  }
  // Si empieza con 4 (típico Venezuela), agregar +58
  else if (digits.startsWith('4')) {
    value = '+58' + digits;
  }

  const formatted = formatPhoneNumber(value);
  console.log('📱 Phone input:', {
    original: e.target.value,
    digits,
    value,
    formatted,
  });
  setForm((prev) => ({ ...prev, phone: formatted }));
};

export function CheckoutClient() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bcvRate, setBcvRate] = useState<number | null>(null);
  const [copiedMethod, setCopiedMethod] = useState<string | null>(null);
  const [phoneDropdownOpen, setPhoneDropdownOpen] = useState(false);
  const phoneDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (phoneDropdownRef.current && !phoneDropdownRef.current.contains(e.target as Node)) {
        setPhoneDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    async function fetchBcv() {
      try {
        const res = await fetch('/api/bcv');
        if (res.ok) {
          const data = await res.json();
          if (data.rate) setBcvRate(data.rate);
        }
      } catch (e) {
        console.error('Error loading BCV rate', e);
      }
    }
    fetchBcv();
  }, []);

  const hasPhysical = items.some((i) => i.product.type === 'physical');

  const [stepIndex, setStepIndex] = useState(0);
  const steps: { key: StepKey; label: string }[] = [
    { key: 'contact', label: 'Contacto' } as const,
    ...(hasPhysical ? [{ key: 'shipping' as const, label: 'Envío' }] : []),
    { key: 'payment-method' as const, label: 'Pago' },
    { key: 'confirm' as const, label: 'Confirmar' },
  ];

  const safeStepIndex = Math.min(stepIndex, steps.length - 1);
  const currentStepKey = steps[safeStepIndex]?.key ?? 'contact';
  const isFirstStep = safeStepIndex === 0;
  const isLastStep = safeStepIndex === steps.length - 1;

  const stepClass = (key: StepKey) =>
    `${currentStepKey === key ? 'block' : 'hidden'}`;

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '+58',
    phone: '',
    address: '',
    city: '',
    state: '',
    agency: '',
    zipCode: '',
    deliveryType: 'barquisimeto', // "barquisimeto" | "nacional"
    shippingRegion: 'nacional', // "nacional" | "internacional"
    country: 'Venezuela',
    paymentMethod: 'pago_movil',
    paymentReference: '',
    docType: 'V',
    docNumber: '',
  });

  const isDocNumberRequired =
    form.paymentMethod !== 'zelle' && form.paymentMethod !== 'paypal';

  // test

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function validateContactStep(): boolean {
    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.phone.trim()
    ) {
      setError(
        'Por favor completa todos los campos: nombre, apellido, correo electrónico y teléfono.',
      );
      return false;
    }
    if (!isValidEmail(form.email)) {
      setError(
        'El correo electrónico no es válido. Por favor verifica e intenta de nuevo.',
      );
      return false;
    }

    const phoneDigits = form.phone.replace(/\D/g, '');
    let isValidPhone = false;
    switch(form.phoneCode) {
      case '+58':
        isValidPhone = phoneDigits.length === 10 || phoneDigits.length === 11;
        break;
      case '+1':
      case '+1-CA':
      case '+57':
        isValidPhone = phoneDigits.length === 10;
        break;
      case '+34':
        isValidPhone = phoneDigits.length === 9;
        break;
      default:
        isValidPhone = phoneDigits.length >= 7;
    }

    if (!isValidPhone) {
      setError('Por favor ingresa un número de teléfono válido para el país seleccionado.');
      return false;
    }

    setError('');
    return true;
  }

  function validateShippingStep(): boolean {
    if (form.shippingRegion === 'nacional') {
      if (form.deliveryType === 'barquisimeto') {
        if (!form.address.trim()) {
          setError('Por favor ingresa tu dirección exacta para que podamos entregarte el pedido.');
          return false;
        }
      } else if (
        !form.state.trim() ||
        !form.city.trim() ||
        !form.agency.trim()
      ) {
        setError('Por favor completa el estado, ciudad y la agencia MRW o Zoom.');
        return false;
      }
    } else {
      // Internacional
      if (
        !form.address.trim() ||
        !form.city.trim() ||
        !form.state.trim() ||
        !form.zipCode.trim()
      ) {
        setError('Por favor completa todos los campos de la dirección internacional (incluyendo Código Postal).');
        return false;
      }
    }
    setError('');
    return true;
  }

  function goNext() {
    if (currentStepKey === 'contact' && !validateContactStep()) return;
    if (currentStepKey === 'shipping' && !validateShippingStep()) return;
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }

  function goBack() {
    setError('');
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function copyPaymentDetails(id: string, text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMethod(id);
      setTimeout(() => setCopiedMethod(null), 2000);
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.paymentReference ||
      (isDocNumberRequired && !form.docNumber)
    ) {
      setError(
        'Por favor completa todos los campos requeridos antes de confirmar el pedido.'
      );
      return;
    }
    if (!isValidEmail(form.email)) {
      setError(
        'Por favor ingresa un correo electrónico válido. (ej: nombre@dominio.com)',
      );
      return;
    }
    setError('');
    setLoading(true);
    try {
      const { token } = await issueCheckoutTokenAction({
        subscriptionId: 'cart',
        timePeriod: 'one-time',
        surface: 'cart',
        amountUsd: total,
      });

      const location = [form.address, form.city, form.state, form.country]
        .filter(Boolean)
        .join(', ');
      const rawPhone = form.phone.trim();
      const phone =
        rawPhone.length >= 6 ? `${form.phoneCode} ${rawPhone}` : '0000000';

      const { customerId } = await upsertCheckoutCustomerAction(token, {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email,
        phone,
        location,
      });

      const paymentMethod =
        form.paymentMethod === 'zelle' ? 'zelle' : (form.paymentMethod === 'paypal' ? 'paypal' : 'pagomovil');

      const metadata = {
        items: items.map((i) => ({
          id: i.product.id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
        })),
        deliveryType: form.deliveryType,
        agency: form.agency,
        paymentReference: form.paymentReference,
        senderId: `${form.docType}${form.docNumber}`,
      };

      const finalStatus = paymentMethod === 'pagomovil' ? 'verifying' : 'pending';

      const { status, paymentId } = await submitCheckoutPaymentAction(token, {
        customerId,
        method: paymentMethod,
        amountUsd: total,
        amountVes:
          bcvRate && paymentMethod === 'pagomovil'
            ? total * bcvRate
            : undefined,
        metadata,
        status: finalStatus,
      });

      clearCart();
      router.push(
        `/thank-you?session=cart&status=${status}&paymentId=${paymentId}&method=${paymentMethod}`,
      );
    } catch (err) {
      console.error(err);
      let errorMessage = 'Parece que hay un problema momentáneo en nuestro servidor. Por favor, intenta de nuevo en unos instantes.';

      if (err instanceof Error) {
        if (err.message.includes('fetch') || err.message.includes('network')) {
          errorMessage = 'Problema de conexión. Verifica tu internet e intenta de nuevo.';
        }
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const paymentLines = getPaymentLines(form.paymentMethod, total, bcvRate);

  if (items.length === 0) {
    return (
      <section className="px-6 py-20 text-center">
        <h1 className="font-serif text-3xl font-bold text-[#1a1a1a] mb-4">
          Tu carrito está vacío
        </h1>
        <Link
          href="/tienda"
          className="inline-flex items-center gap-2 rounded-xl bg-secondary px-7 py-3.5 text-base font-bold text-white hover:opacity-90"
        >
          Ir a la tienda
        </Link>
      </section>
    );
  }

  return (
    <section className="px-6 py-10 md:py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/tienda/carrito"
          className={`${
            currentStepKey === 'contact' ? 'inline-flex' : 'hidden'
          } lg:inline-flex mb-8 items-center gap-2 text-sm font-semibold text-[#5c4b32]/70 transition-colors hover:text-[#A7895C]`}
        >
          <ArrowLeft size={16} />
          Volver al carrito
        </Link>

        <h1 className="font-serif text-4xl font-bold text-[#1a1a1a] mb-10 md:text-5xl">
          Finalizar compra
        </h1>

        {/* Step indicator */}
        <div className="mb-10 flex w-full items-center justify-between overflow-x-auto pb-6">
          {steps.map((step, i) => {
            const isCompleted = i < safeStepIndex;
            const isCurrent = i === safeStepIndex;
            return (
              <div key={step.key} className="flex flex-1 items-center justify-center gap-2 md:gap-4 relative px-2">
                <div className="flex items-center gap-2 md:gap-3">
                  <span
                    className={`font-serif text-2xl md:text-4xl font-bold transition-colors ${
                      isCompleted || isCurrent ? 'text-secondary' : 'text-[#5c4b32]/30'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`text-[10px] md:text-sm font-bold uppercase tracking-wider transition-colors ${
                      isCompleted || isCurrent ? 'text-[#1a1a1a]' : 'text-[#5c4b32]/40'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 h-8 w-px -translate-y-1/2 bg-border" />
                )}
              </div>
            );
          })}
        </div>

        {/* Shipping region toggle removed from here */}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              {/* Contact info */}
              <div className={`${stepClass('contact')} rounded-2xl bg-card p-6 shadow-sm`}>
                <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] mb-5">
                  Información de contacto
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-base font-semibold text-[#5c4b32]"
                      htmlFor="firstName"
                    >
                      Nombre *
                    </label>
                    <Input
                      size="lg"
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-base font-semibold text-[#5c4b32]"
                      htmlFor="lastName"
                    >
                      Apellido *
                    </label>
                    <Input
                      size="lg"
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Tu apellido"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-base font-semibold text-[#5c4b32]"
                      htmlFor="email"
                    >
                      Correo electrónico *
                    </label>
                    <Input
                      size="lg"
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@correo.com"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-base font-semibold text-[#5c4b32]"
                      htmlFor="phone"
                    >
                      Teléfono (WhatsApp)
                    </label>
                    {/* Custom flag phone dropdown */}
                    {(() => {
                      const intlOptions = [
                        { code: '+1',    img: 'https://flagcdn.com/w40/us.png', label: 'USA +1',  placeholder: '202-555-0123' },
                        { code: '+58',   img: 'https://flagcdn.com/w40/ve.png', label: 'VEN +58', placeholder: '414-000-0000' },
                      ];
                      const options = intlOptions;
                      const selected = options.find(o => o.code === form.phoneCode) ?? options[0];
                      return (
                        <div className="flex rounded-xl border border-border bg-background transition focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20" style={{overflow: 'visible'}}>
                          {/* Trigger */}
                          <div className="relative" ref={phoneDropdownRef} style={{flexShrink: 0}}>
                            <button
                              type="button"
                              onClick={() => setPhoneDropdownOpen(v => !v)}
                              className="flex items-center gap-1.5 pl-3 pr-2 py-3 border-r border-border text-sm font-semibold text-[#1a1a1a] hover:bg-[#5c4b32]/5 transition select-none whitespace-nowrap h-full rounded-l-xl"
                            >
                              <img src={selected.img} alt="" className="w-5 h-4 object-cover rounded-sm" style={{display:'inline-block'}} />
                              <span className="text-xs text-[#5c4b32]/80">{selected.code.replace('-CA','')}</span>
                              <svg className={`w-3 h-3 text-[#5c4b32]/50 transition-transform ${phoneDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            {/* Dropdown list */}
                            {phoneDropdownOpen && (
                              <div className="absolute left-0 top-full mt-1 w-48 rounded-xl border border-border bg-white shadow-2xl" style={{zIndex: 9999}}>
                                {options.map(opt => (
                                  <button
                                    key={opt.code}
                                    type="button"
                                    onClick={() => {
                                      setForm(prev => ({ ...prev, phoneCode: opt.code, phone: '' }));
                                      setPhoneDropdownOpen(false);
                                    }}
                                    className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition hover:bg-[#A7895C]/10 ${
                                      form.phoneCode === opt.code ? 'bg-secondary/10 font-bold text-secondary' : 'text-[#1a1a1a]'
                                    }`}
                                  >
                                    <img src={opt.img} alt="" className="w-6 h-4 object-cover rounded-sm flex-shrink-0" />
                                    <span>{opt.label}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          {/* Phone input */}
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={(e) => {
                              const digits = e.target.value.replace(/\D/g, '');
                              let maxDigits = 10;
                              if (selected.code === '+58') maxDigits = 11;
                              
                              if (digits.length <= maxDigits) {
                                let formatted = digits;
                                if (selected.code === '+58' && digits.startsWith('0')) {
                                  if (digits.length > 7) formatted = `${digits.slice(0,4)}-${digits.slice(4,7)}-${digits.slice(7)}`;
                                  else if (digits.length > 4) formatted = `${digits.slice(0,4)}-${digits.slice(4)}`;
                                } else {
                                  if (digits.length > 6) formatted = `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6)}`;
                                  else if (digits.length > 3) formatted = `${digits.slice(0,3)}-${digits.slice(3)}`;
                                }
                                setForm((prev) => ({ ...prev, phone: formatted }));
                              }
                            }}
                            placeholder={selected.placeholder}
                            className="flex-1 min-w-0 bg-transparent px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#5c4b32]/40 outline-none"
                          />
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Shipping — only if physical product */}
              {hasPhysical && (
                <div className={`${stepClass('shipping')} rounded-2xl bg-card p-6 shadow-sm`}>
                  <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] mb-5">
                    Información de Envío
                  </h2>

                  {/* Shipping region toggle */}
                  <div className="mb-8 flex items-center justify-center">
                    <div className="inline-flex rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                      <button
                        type="button"
                        onClick={() => setForm((prev) => ({ 
                          ...prev, 
                          shippingRegion: 'nacional', 
                          country: 'Venezuela'
                        }))}
                        className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all ${
                          form.shippingRegion === 'nacional'
                            ? 'bg-secondary text-white'
                            : 'text-[#5c4b32]/60 hover:text-[#5c4b32]'
                        }`}
                      >
                        Envío Nacional
                      </button>
                      <div className="w-px bg-border" />
                      <button
                        type="button"
                        onClick={() => setForm((prev) => ({ 
                          ...prev, 
                          shippingRegion: 'internacional', 
                          country: 'Estados Unidos',
                          paymentMethod: prev.paymentMethod === 'pago_movil' ? 'zelle' : prev.paymentMethod
                        }))}
                        className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all ${
                          form.shippingRegion === 'internacional'
                            ? 'bg-secondary text-white'
                            : 'text-[#5c4b32]/60 hover:text-[#5c4b32]'
                        }`}
                      >
                        Envío a EE. UU.
                      </button>
                    </div>
                  </div>

                  {form.shippingRegion === 'nacional' ? (
                    /* ── NACIONAL ── */
                    <>
                      <div className="mb-6 flex gap-4">
                        <label
                          className={`flex-1 cursor-pointer rounded-xl border-2 p-3 text-center transition-all ${
                            form.deliveryType === 'barquisimeto'
                              ? 'border-[#A7895C] bg-[#A7895C]/10 text-[#A7895C]'
                              : 'border-border text-[#5c4b32]/70 hover:border-[#A7895C]/40'
                          }`}
                        >
                          <input
                            type="radio"
                            name="deliveryType"
                            value="barquisimeto"
                            checked={form.deliveryType === 'barquisimeto'}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <span className="text-sm font-bold">Delivery en Barquisimeto</span>
                        </label>
                        <label
                          className={`flex-1 cursor-pointer rounded-xl border-2 p-3 text-center transition-all ${
                            form.deliveryType === 'nacional'
                              ? 'border-[#A7895C] bg-[#A7895C]/10 text-[#A7895C]'
                              : 'border-border text-[#5c4b32]/70 hover:border-[#A7895C]/40'
                          }`}
                        >
                          <input
                            type="radio"
                            name="deliveryType"
                            value="nacional"
                            checked={form.deliveryType === 'nacional'}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <span className="text-sm font-bold">Envío Nacional (MRW/Zoom)</span>
                        </label>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        {form.deliveryType === 'barquisimeto' ? (
                          <div className="flex flex-col gap-1.5 sm:col-span-2">
                            <label className="text-sm font-semibold text-[#5c4b32]" htmlFor="address">
                              Dirección exacta para el delivery *
                            </label>
                            <Input
                              size="lg"
                              id="address"
                              name="address"
                              type="text"
                              required={hasPhysical}
                              value={form.address}
                              onChange={handleChange}
                              placeholder="Ej: Urb. del Este, Calle 2, Edificio Los Robles, Apto 4"
                            />
                          </div>
                        ) : (
                          <>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-sm font-semibold text-[#5c4b32]" htmlFor="state">Estado *</label>
                              <Input size="lg" id="state" name="state" type="text" required={hasPhysical} value={form.state} onChange={handleChange} placeholder="Ej: Carabobo" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-sm font-semibold text-[#5c4b32]" htmlFor="city">Ciudad *</label>
                              <Input size="lg" id="city" name="city" type="text" required={hasPhysical} value={form.city} onChange={handleChange} placeholder="Ej: Valencia" />
                            </div>
                            <div className="flex flex-col gap-1.5 sm:col-span-2">
                              <label className="text-sm font-semibold text-[#5c4b32]" htmlFor="agency">Nombre/Código de Agencia MRW o Zoom *</label>
                              <Input size="lg" id="agency" name="agency" type="text" required={hasPhysical} value={form.agency} onChange={handleChange} placeholder="Ej: MRW Agencia Centro o Zoom Av. Bolívar" />
                            </div>
                          </>
                        )}
                      </div>
                      <p className="mt-5 flex items-center gap-2 rounded-xl bg-[#A7895C]/10 px-4 py-3 text-xs text-[#5c4b32]">
                        <span>📦</span>
                        {form.deliveryType === 'barquisimeto'
                          ? 'El costo del delivery se coordinará contigo por WhatsApp después de la compra.'
                          : 'Los envíos nacionales se realizan con Cobro en Destino (COD) por la agencia indicada.'}
                      </p>
                    </>
                  ) : (
                    /* ── INTERNACIONAL ── */
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                          <label className="text-sm font-semibold text-[#5c4b32]" htmlFor="address">
                            Dirección completa *
                          </label>
                          <Input
                            size="lg"
                            id="address"
                            name="address"
                            type="text"
                            required={hasPhysical}
                            value={form.address}
                            onChange={handleChange}
                            placeholder="Ej: 123 Main St, Apt 4B"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-semibold text-[#5c4b32]" htmlFor="city">Ciudad *</label>
                          <Input size="lg" id="city" name="city" type="text" required={hasPhysical} value={form.city} onChange={handleChange} placeholder="Ej: Miami" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-semibold text-[#5c4b32]" htmlFor="state">Estado / Provincia *</label>
                          <Input size="lg" id="state" name="state" type="text" required={hasPhysical} value={form.state} onChange={handleChange} placeholder="Ej: Florida" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-semibold text-[#5c4b32]" htmlFor="zipCode">Código Postal *</label>
                          <Input size="lg" id="zipCode" name="zipCode" type="text" required={hasPhysical} value={form.zipCode} onChange={handleChange} placeholder="Ej: 33101" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-semibold text-[#5c4b32]" htmlFor="agency">
                            Agencia de envío
                          </label>
                          <Input size="lg" id="agency" name="agency" type="text" value={form.agency} onChange={handleChange} placeholder="Ej: FedEx, DHL, UPS..." />
                        </div>
                      </div>
                      <p className="mt-5 flex items-center gap-2 rounded-xl bg-[#A7895C]/10 px-4 py-3 text-xs text-[#5c4b32]">
                        <span>✈️</span>
                        Los envíos a Estados Unidos se coordinan por WhatsApp. Te contactaremos para confirmar el costo y la agencia de envío.
                      </p>
                    </>
                  )}
                </div>
              )}


              {/* Payment method */}
              <div
                className={`${
                  currentStepKey === 'payment-method' ||
                  currentStepKey === 'confirm'
                    ? 'block'
                    : 'hidden'
                } rounded-2xl bg-card p-6 shadow-sm`}
              >
                <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] mb-5">
                  Métodos de Pago
                </h2>
                <div className={`${currentStepKey === 'payment-method' ? 'grid' : 'hidden'} gap-4 ${form.shippingRegion === 'internacional' ? 'sm:grid-cols-2 max-w-2xl mx-auto' : 'sm:grid-cols-3'} mb-6`}>
                  {/* Pago Movil */}
                  {form.shippingRegion !== 'internacional' && (
                    <label
                      className={`cursor-pointer rounded-2xl border-2 p-4 lg:p-6 transition-all ${
                        form.paymentMethod === 'pago_movil'
                          ? 'border-secondary bg-secondary/5'
                          : 'border-border hover:border-secondary/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="pago_movil"
                        checked={form.paymentMethod === 'pago_movil'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="font-bold text-[#1a1a1a] mb-2 lg:mb-3 text-sm lg:text-base">
                        Pago Móvil
                      </div>
                      <div className="text-xs lg:text-sm text-[#5c4b32] lg:leading-relaxed">
                        <p>{PAGO_MOVIL_BANK_NAME} ({PAGO_MOVIL_BANK_CODE})</p>
                        <p>V-{PAGO_MOVIL_ID.slice(0, 2)}.{PAGO_MOVIL_ID.slice(2, 5)}.{PAGO_MOVIL_ID.slice(5)}</p>
                        <p>{PAGO_MOVIL_PHONE.slice(0, 4)}-{PAGO_MOVIL_PHONE.slice(4)}</p>
                      </div>
                    </label>
                  )}

                  {/* Zelle */}
                  <label
                    className={`cursor-pointer rounded-2xl border-2 p-4 lg:p-6 transition-all ${
                      form.paymentMethod === 'zelle'
                        ? 'border-secondary bg-secondary/5'
                        : 'border-border hover:border-secondary/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="zelle"
                      checked={form.paymentMethod === 'zelle'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="font-bold text-[#1a1a1a] mb-2 lg:mb-3 text-sm lg:text-base">
                      Zelle
                    </div>
                    <div className="text-xs lg:text-sm text-[#5c4b32] lg:leading-relaxed break-all">
                      <p>mafeazcunes@gmail.com</p>
                      <p>Maria Azcunes</p>
                    </div>
                  </label>

                  {/* PayPal */}
                  <label
                    className={`cursor-pointer rounded-2xl border-2 p-4 lg:p-6 transition-all ${
                      form.paymentMethod === 'paypal'
                        ? 'border-secondary bg-secondary/5'
                        : 'border-border hover:border-secondary/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={form.paymentMethod === 'paypal'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="font-bold text-[#1a1a1a] mb-2 lg:mb-3 text-sm lg:text-base">
                      PayPal
                    </div>
                    <div className="text-xs lg:text-sm text-[#5c4b32] lg:leading-relaxed break-all">
                      <p>mafeazcunes@gmail.com</p>
                      <p>Maria Azcunes</p>
                    </div>
                  </label>
                </div>

                <div className={stepClass('confirm')}>
                  {/* Recap of selected payment method */}
                  <div className="mb-6 rounded-2xl bg-[#A7895C]/10 p-6 text-[#5c4b32]">
                    <div className="mb-6 flex items-center justify-between gap-3">
                      <p className="font-serif text-2xl font-bold">
                        {PAYMENT_METHOD_TITLES[form.paymentMethod as PaymentMethodKey]}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          copyPaymentDetails(
                            'all',
                            getCopyAllValue(form.paymentMethod, paymentLines),
                          )
                        }
                        className={`flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition active:scale-95 ${
                          copiedMethod === 'all'
                            ? 'bg-secondary text-white'
                            : 'bg-secondary/15 text-secondary hover:bg-secondary/25'
                        }`}
                      >
                        {copiedMethod === 'all' ? (
                          <Check size={14} />
                        ) : (
                          <Copy size={14} />
                        )}
                        Copiar todos
                      </button>
                    </div>
                    <div className="space-y-4">
                      {paymentLines.map((line) => (
                        <button
                          key={line.id}
                          type="button"
                          onClick={() => copyPaymentDetails(line.id, line.copyValue)}
                          className={`flex w-full items-center justify-between gap-3 rounded-lg p-4 text-left transition active:scale-95 ${
                            copiedMethod === line.id
                              ? 'bg-secondary/20'
                              : 'bg-white/60 hover:bg-white/80'
                          }`}
                        >
                          <p className="font-semibold text-base leading-relaxed text-[#5c4b32]">
                            {line.display}
                          </p>
                          <div className={`flex-shrink-0 rounded-lg p-2 transition ${
                            copiedMethod === line.id
                              ? 'bg-secondary/30 text-secondary'
                              : 'bg-secondary/10 text-secondary'
                          }`}>
                            {copiedMethod === line.id ? (
                              <Check size={20} />
                            ) : (
                              <Copy size={20} />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="max-w-2xl mx-auto w-full space-y-5">
                    <div className="flex flex-col gap-1.5">
                      <label
                        className="text-sm font-semibold text-[#5c4b32]"
                        htmlFor="paymentReference"
                      >
                      Número de referencia o recibo *
                    </label>
                    <Input
                      size="lg"
                      id="paymentReference"
                      name="paymentReference"
                      type="text"
                      required
                      value={form.paymentReference}
                      onChange={handleChange}
                      placeholder="Ej: 12345678"
                    />
                    <p className="text-xs text-[#5c4b32]/60 mt-1">
                      Realiza el pago al método seleccionado y coloca el número de
                      referencia aquí.
                    </p>
                  </div>

                  {form.paymentMethod !== 'zelle' && form.paymentMethod !== 'paypal' && (
                    <div className="flex flex-col gap-1.5">
                      <label
                        className="text-sm font-semibold text-[#5c4b32]"
                        htmlFor="senderId"
                      >
                        Cédula de Identidad (Titular de la cuenta) *
                      </label>
                      <div className="flex rounded-xl border border-border bg-background transition focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20 overflow-hidden">
                        <select
                          name="docType"
                          value={form.docType}
                          onChange={handleChange}
                          className="bg-transparent pl-4 pr-2 py-3 text-sm text-[#1a1a1a] outline-none border-r border-border"
                        >
                          <option value="V">V</option>
                          <option value="E">E</option>
                          <option value="J">J</option>
                          <option value="G">G</option>
                          <option value="P">P</option>
                          <option value="C">C</option>
                        </select>
                        <input
                          id="docNumber"
                          name="docNumber"
                          type="text"
                          required
                          value={form.docNumber}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setForm((prev) => ({ ...prev, docNumber: val }));
                          }}
                          placeholder="12345678"
                          className="flex-1 bg-transparent px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#5c4b32]/40 outline-none"
                        />
                      </div>
                      <p className="text-xs text-[#5c4b32]/60 mt-1">
                        Necesitamos tu cédula para que nuestro sistema valide el
                        pago automáticamente.
                      </p>
                    </div>
                  )}
                </div>
                </div>
              </div>

              {error && (
                <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              {/* Step navigation */}
              <div className="flex items-center gap-3">
                {!isFirstStep && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="flex-1 rounded-xl border-2 border-border py-3 text-sm font-bold text-[#5c4b32] transition hover:border-[#A7895C]/40"
                  >
                    Volver
                  </button>
                )}
                {!isLastStep && (
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex-1 rounded-xl bg-secondary py-4 text-base font-bold text-white transition hover:opacity-90"
                  >
                    Siguiente
                  </button>
                )}
              </div>
            </motion.div>

            {/* Order summary */}
            <div className={stepClass('confirm')}>
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <h2 className="font-serif text-xl font-bold text-[#1a1a1a] mb-5">
                  Tu pedido
                </h2>
                <div className="flex flex-col gap-3 mb-5">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-start gap-3"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-secondary/10">
                        {item.product.type === 'digital' ? (
                          <Tablet
                            className="h-5 w-5 text-secondary"
                            strokeWidth={1.5}
                          />
                        ) : (
                          <BookOpen
                            className="h-5 w-5 text-[#A7895C]"
                            strokeWidth={1.5}
                          />
                        )}
                      </div>
                      <div className="flex flex-1 justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#1a1a1a] leading-tight truncate">
                            {item.product.name}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-[#5c4b32]/60">
                              ×{item.quantity}
                            </p>
                          )}
                        </div>
                        <span className="text-base lg:text-lg font-bold text-[#A7895C] shrink-0">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border/50 pt-4 mb-6">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-[#5c4b32]">Total</span>
                    <div className="flex flex-col items-end">
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif text-3xl lg:text-4xl font-bold text-[#A7895C]">
                          ${total.toFixed(2)}
                        </span>
                        <span className="text-xs lg:text-sm text-[#5c4b32]/50">USD</span>
                      </div>
                      {form.paymentMethod === 'pago_movil' && bcvRate && (
                        <div className="text-base lg:text-lg font-semibold text-secondary mt-1 animate-in fade-in zoom-in-95 duration-300">
                          {(total * bcvRate).toLocaleString('es-VE', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{' '}
                          Bs
                          <span className="text-xs text-[#5c4b32]/50 ml-1 font-normal">
                            (Tasa BCV)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary py-4 text-base font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={18} />
                      Confirmar pedido
                    </>
                  )}
                </button>

                <div className="mt-4 flex flex-col gap-1 items-center justify-center text-xs text-[#5c4b32]/70 text-center">
                  <p>
                    Al confirmar el pedido, nuestro sistema validará tu pago
                    automáticamente.
                  </p>
                  <p>Por favor mantén esta ventana abierta.</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
