import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Preview,
} from '@react-email/components';
import * as React from 'react';

interface OrderPendingEmailProps {
  firstName: string;
  orderId: string;
  items: Array<{ name: string; quantity: number; price?: number }>;
  amountVes: number | null;
  amountUsd: number;
}

export const OrderPendingEmail: React.FC<Readonly<OrderPendingEmailProps>> = ({
  firstName,
  orderId,
  items,
  amountVes,
  amountUsd,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Hemos recibido tu orden #{orderId.split('-')[0]}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>
            ¡Hola, {firstName}!
          </Heading>
          
          <Text style={textCentered}>
            Hemos recibido tu orden <strong style={{ color: '#A7895C' }}>#{orderId.split('-')[0]}</strong>.
          </Text>

          <Section style={alertCard}>
            <Heading as="h2" style={alertHeading}>Tu pago está en verificación ⏳</Heading>
            <Text style={alertText}>
              Actualmente nos encontramos procesando y comprobando tu pago. Una vez que haya sido validado por nuestro equipo, recibirás otro correo con la confirmación final y el acceso a tus productos.
            </Text>
          </Section>

          <Heading as="h3" style={subheading}>Resumen de tu Orden</Heading>
          
          <Section style={itemsList}>
            {items && items.length > 0 ? (
              items.map((item, i) => (
                <Text key={i} style={itemRow}>
                  <span style={itemQuantity}>{item.quantity}x</span> {item.name}
                </Text>
              ))
            ) : (
              <Text style={itemRow}>1x Suscripción / Servicio Digital</Text>
            )}
          </Section>

          <Hr style={hrLight} />
          
          <Section style={totalRow}>
            <Text style={totalLabel}>Total a pagar</Text>
            <Text style={totalAmount}>
              ${amountUsd.toFixed(2)} {amountVes && <span style={totalVes}>(Bs {amountVes.toFixed(2)})</span>}
            </Text>
          </Section>

          <Hr style={hr} />
          
          <Text style={footerText}>
            Si tienes alguna pregunta sobre tu orden, puedes responder directamente a este correo.
          </Text>
          
          <Text style={footer}>
            Todo es un Balance © {new Date().getFullYear()}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f9f6f0',
  fontFamily: 'Georgia, "Times New Roman", Times, serif',
  padding: '40px 0',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e5e5',
  borderRadius: '12px',
  margin: '0 auto',
  padding: '40px',
  maxWidth: '600px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
};

const heading = {
  color: '#5c4b32',
  fontSize: '28px',
  fontWeight: 'normal',
  textAlign: 'center' as const,
  margin: '0 0 10px',
};

const textCentered = {
  color: '#5c4b32',
  fontSize: '16px',
  textAlign: 'center' as const,
  margin: '0 0 30px',
};

const alertCard = {
  backgroundColor: '#fdfbf7',
  padding: '24px',
  borderRadius: '8px',
  marginBottom: '30px',
  border: '1px solid #e8e1d5',
  textAlign: 'center' as const,
};

const alertHeading = {
  margin: '0 0 10px 0',
  color: '#A7895C',
  fontSize: '18px',
  fontWeight: 'bold',
};

const alertText = {
  margin: '0',
  color: '#5c4b32',
  fontSize: '15px',
  lineHeight: '22px',
};

const subheading = {
  color: '#5c4b32',
  fontSize: '20px',
  fontWeight: 'normal',
  marginTop: '10px',
  marginBottom: '15px',
  borderBottom: '1px solid #eaeaea',
  paddingBottom: '10px',
};

const itemsList = {
  marginBottom: '15px',
};

const itemRow = {
  color: '#5c4b32',
  fontSize: '16px',
  margin: '12px 0',
};

const itemQuantity = {
  color: '#A7895C',
  fontWeight: 'bold',
  marginRight: '8px',
};

const hrLight = {
  borderColor: '#f0f0f0',
  margin: '15px 0',
};

const totalRow = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
};

const totalLabel = {
  color: '#5c4b32',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
  display: 'inline-block',
  width: '50%',
};

const totalAmount = {
  color: '#5c4b32',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
  display: 'inline-block',
  width: '50%',
  textAlign: 'right' as const,
};

const totalVes = {
  fontSize: '14px',
  color: '#8b7c66',
  fontWeight: 'normal',
};

const hr = {
  borderColor: '#eaeaea',
  margin: '35px 0 20px',
};

const footerText = {
  color: '#8b7c66',
  fontSize: '14px',
  textAlign: 'center' as const,
  margin: '0 0 20px',
};

const footer = {
  color: '#b3a89b',
  fontSize: '13px',
  textAlign: 'center' as const,
};
