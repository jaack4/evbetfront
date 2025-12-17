import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <SignUp 
        signInUrl="/sign-in"
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

