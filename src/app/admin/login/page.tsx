import { Metadata } from 'next'
import LoginClient from './LoginClient'

export const metadata: Metadata = {
  title: 'Admin Login — LabelNest',
  robots: { index: false, follow: false },
}

export default function AdminLogin() {
  return <LoginClient />
}
