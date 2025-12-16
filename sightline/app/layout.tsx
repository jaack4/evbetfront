import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sightline - EV Sports Betting",
  description: "Find the best EV sports bets in real-time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: 'bg-white text-black hover:bg-zinc-200',
          card: 'bg-zinc-900 border border-white/10',
          headerTitle: 'text-white',
          headerSubtitle: 'text-zinc-400',
          socialButtonsBlockButton: 'bg-zinc-800 border border-white/10 hover:bg-zinc-700',
          socialButtonsBlockButtonText: 'text-white',
          formFieldInput: 'bg-zinc-800 border border-white/10 text-white',
          formFieldLabel: 'text-zinc-400',
          footerActionLink: 'text-white hover:text-zinc-300',
          identityPreviewText: 'text-white',
          identityPreviewEditButton: 'text-zinc-400',
        },
        variables: {
          colorPrimary: '#ffffff',
          colorBackground: '#18181b',
          colorInputBackground: '#27272a',
          colorInputText: '#ffffff',
        }
      }}
    >
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
