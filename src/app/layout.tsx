

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
      <body style={{ backgroundImage: "url('./background.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>{children}</body>
    </html>
  )
}
