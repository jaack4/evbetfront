import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";

const manrope = Manrope({ 
  subsets: ["latin"],
  variable: "--font-sans"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "Clearline - EV Sports Betting",
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
          socialButtonsBlockButton: 'bg-zinc-800 border border-white/10 hover:bg-zinc-700 text-white',
          socialButtonsBlockButtonText: 'text-white',
          socialButtonsBlockButtonArrow: 'text-white',
          socialButtonsProviderIcon: 'brightness-100',
          formFieldInput: 'bg-zinc-800 border border-white/10 text-white',
          formFieldLabel: 'text-zinc-400',
          footerActionLink: 'text-white hover:text-zinc-300',
          identityPreviewText: 'text-white',
          identityPreviewEditButton: 'text-zinc-400',
          formFieldInputShowPasswordButton: 'text-zinc-400 hover:text-white',
          formFieldAction: 'text-white',
          formHeaderTitle: 'text-white',
          formHeaderSubtitle: 'text-zinc-400',
          dividerLine: 'bg-white/10',
          dividerText: 'text-zinc-400',
          formResendCodeLink: 'text-white hover:text-zinc-300',
          otpCodeFieldInput: 'bg-zinc-800 border border-white/10 text-white',
          formFieldErrorText: 'text-red-400',
          alertText: 'text-zinc-300',
          identityPreviewEditButtonIcon: 'text-zinc-400',
          formFieldWarningText: 'text-amber-400',
          profileSectionTitleText: 'text-white',
          profileSectionContent: 'text-zinc-300',
          badge: 'text-white',
          navbarButton: 'text-zinc-400 hover:text-white',
          pageScrollBox: 'bg-zinc-900',
        },
        variables: {
          colorPrimary: '#ffffff',
          colorBackground: '#18181b',
          colorInputBackground: '#27272a',
          colorInputText: '#ffffff',
          colorText: '#ffffff',
          colorTextSecondary: '#a1a1aa',
          colorTextOnPrimaryBackground: '#000000',
          colorDanger: '#ef4444',
          colorNeutral: '#ffffff',
        }
      }}
    >
      <html lang="en">
        <body className={`${manrope.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
