import '../styles/globals.css';

export const metadata = {
  title: 'BuscarCEP',
  description: 'Buscador de CEP',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        </body>
    </html>
  )
}
