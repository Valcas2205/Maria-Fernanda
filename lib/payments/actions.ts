"use server"

import { getApiBaseUrl, getCheckoutDomain } from "./config"
import type {
  CheckoutContext,
  CheckoutSurface,
  ContactPayload,
  PaymentPayload,
} from "./types"

async function parseError(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as { message?: string | string[] }
    if (typeof data.message === "string") return data.message
    if (Array.isArray(data.message)) return data.message.join("; ")
  } catch {
    // ignore
  }
  return `Error ${res.status}: ${res.statusText}`
}

export async function issueCheckoutTokenAction(input: {
  subscriptionId: string
  timePeriod: string
  surface: CheckoutSurface
  amountUsd?: number
}): Promise<{ token: string; expiresAt: string }> {
  const apiUrl = getApiBaseUrl()
  const res = await fetch(`${apiUrl}/payments/checkout-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-waas-internal-secret": process.env.WAAS_INTERNAL_SECRET!
    },
    cache: "no-store",
    body: JSON.stringify({ ...input, domain: getCheckoutDomain() }),
  })
  if (!res.ok) {
    throw new Error(await parseError(res))
  }
  return (await res.json()) as { token: string; expiresAt: string }
}

export async function getCheckoutContextAction(
  token: string,
): Promise<CheckoutContext> {
  const apiUrl = getApiBaseUrl()
  const domain = getCheckoutDomain()
  const url =
    `${apiUrl}/payments/checkout-context` +
    `?token=${encodeURIComponent(token)}` +
    `&domain=${encodeURIComponent(domain)}`
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "x-waas-internal-secret": process.env.WAAS_INTERNAL_SECRET!
    }
  })
  if (!res.ok) {
    throw new Error(await parseError(res))
  }
  return (await res.json()) as CheckoutContext
}

export async function upsertCheckoutCustomerAction(
  token: string,
  payload: ContactPayload,
): Promise<{ customerId: string }> {
  const apiUrl = getApiBaseUrl()
  const res = await fetch(`${apiUrl}/payments/customers/upsert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-waas-internal-secret": process.env.WAAS_INTERNAL_SECRET!
    },
    cache: "no-store",
    body: JSON.stringify({ token, domain: getCheckoutDomain(), ...payload }),
  })
  if (!res.ok) {
    throw new Error(await parseError(res))
  }
  return (await res.json()) as { customerId: string }
}

export async function submitCheckoutPaymentAction(
  token: string,
  payload: PaymentPayload,
): Promise<{ paymentId: string; status: "pending" | "verifying" | "approved" }> {
  const apiUrl = getApiBaseUrl()
  const res = await fetch(`${apiUrl}/payments/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-waas-internal-secret": process.env.WAAS_INTERNAL_SECRET!
    },
    cache: "no-store",
    body: JSON.stringify({ token, domain: getCheckoutDomain(), ...payload }),
  })
  if (!res.ok) {
    throw new Error(await parseError(res))
  }
  return (await res.json()) as { paymentId: string; status: "pending" | "approved" }
}
