// Where a newsletter signup came from. Collected in the browser at submit time and sent
// with the email; the API validates form_id / list_key, so a client cannot invent a list.
export interface SignupContext {
  page_path: string
  referrer: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_term: string
  utm_content: string
}

export function readSignupContext(): SignupContext {
  const q = new URLSearchParams(window.location.search)
  const get = (k: string) => (q.get(k) ?? '').slice(0, 200)
  return {
    page_path: window.location.pathname,
    referrer: document.referrer.slice(0, 500),
    utm_source: get('utm_source'),
    utm_medium: get('utm_medium'),
    utm_campaign: get('utm_campaign'),
    utm_term: get('utm_term'),
    utm_content: get('utm_content'),
  }
}

export async function submitSignup(email: string, form_id: string, list_key: string): Promise<boolean> {
  const res = await fetch('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, form_id, list_key, ...readSignupContext() }),
  })
  return res.ok
}
