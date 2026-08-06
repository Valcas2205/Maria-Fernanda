export type PaymentMethod = "zelle" | "pagomovil" | "paypal"

export type CheckoutSurface = "pricing" | "cart" | "product" | "other"

export interface CheckoutProduct {
  subscriptionId: string
  name: string
  description: string | null
  priceUsd: number
}

export interface CheckoutContext {
  tenant: {
    id: string
    slug: string
    name: string
    custom_domain: string | null
  }
  checkout: {
    subscriptionId: string
    timePeriod: string
    surface: CheckoutSurface
    methodsEnabled: PaymentMethod[]
    instructions: Record<string, string>
    product: CheckoutProduct | null
    amountUsd: number | null
    amountVes: number | null
  }
}

export interface ContactPayload {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
}

export interface PaymentPayload {
  customerId: string
  method: PaymentMethod
  amountUsd?: number
  amountVes?: number
  metadata?: Record<string, unknown>
  status?: "pending" | "verifying" | "approved" | "rejected"
}
