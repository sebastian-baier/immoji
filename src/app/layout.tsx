import './globals.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Baier Finances</title>
        <meta name="description" content="App description" />
      </head>
      {children}
    </html>
  );
}
