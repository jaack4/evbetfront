import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <SignIn 
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'shadow-2xl shadow-white/5',
          }
        }}
      />
    </div>
  )
}

