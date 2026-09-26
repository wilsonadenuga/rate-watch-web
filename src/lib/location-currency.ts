import { headers } from 'next/headers'

const FALLBACK_SOURCE_CURRENCY = 'USD'

const EUROZONE_COUNTRIES = [
  'AT',
  'BE',
  'BG',
  'CY',
  'DE',
  'EE',
  'ES',
  'FI',
  'FR',
  'GR',
  'HR',
  'IE',
  'IT',
  'LT',
  'LU',
  'LV',
  'MT',
  'NL',
  'PT',
  'SI',
  'SK',
  // non-EU countries that use the euro
  'AD',
  'MC',
  'ME',
  'SM',
  'VA',
  'XK',
]

const COUNTRY_CURRENCY: Record<string, string> = {
  US: 'USD',
  GB: 'GBP',
  CA: 'CAD',
  ...Object.fromEntries(EUROZONE_COUNTRIES.map((country) => [country, 'EUR'])),
}

function parseNetlifyGeo(value: string | null) {
  if (!value) return null
  try {
    return JSON.parse(Buffer.from(value, 'base64').toString('utf8'))?.country?.code ?? null
  } catch {
    return null
  }
}

// Hosting platforms add the visitor's country (ISO 3166-1 alpha-2) to each request
async function getVisitorCountry() {
  const h = await headers()
  return (
    h.get('x-country') ?? // Netlify
    parseNetlifyGeo(h.get('x-nf-geo')) ?? // Netlify
    h.get('x-vercel-ip-country') ?? // Vercel
    h.get('cf-ipcountry') // Cloudflare
  )
}

export async function getLocationSourceCurrency() {
  const country = (await getVisitorCountry())?.toUpperCase()
  return (country && COUNTRY_CURRENCY[country]) || FALLBACK_SOURCE_CURRENCY
}
