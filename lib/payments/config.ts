/**
 * URL base de la API de pagos (api.ladevhouse.com), usada server-side.
 * En local apunta al NestJS de ladevhouse-waas (puerto 4000 por defecto).
 */
export function getApiBaseUrl(): string {
  const raw = (process.env.API_URL || "").trim().replace(/\/$/, "")
  if (raw) {
    return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
  }
  return process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://api.ladevhouse.com"
}

/**
 * Dominio canonico del tenant para resolver el tenant en la API.
 * Debe coincidir con el `custom_domain` registrado en Directus, sin importar
 * el host real del request (ej. previews de Vercel).
 */
export function getCheckoutDomain(): string {
  return (process.env.CHECKOUT_TENANT_DOMAIN || "todoesunbalance.com")
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
}
