// "Trusted by" logos. While this list is empty, /clients returns 404 and no
// nav, footer or sitemap entry links to it. Add the first entry and the page
// goes live everywhere on the next deploy.
//
// logo: a full https URL (R2 or the customer's own approved asset). Only add a
// customer here once they have agreed to be named.

export interface ClientLogo {
  name: string
  logo: string
  url?: string
  note?: string // e.g. "Fund manager, Mumbai"
}

export const CLIENTS: ClientLogo[] = []

export const HAS_CLIENTS = CLIENTS.length > 0
