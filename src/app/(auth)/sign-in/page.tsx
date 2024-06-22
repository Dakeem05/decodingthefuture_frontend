import SignInForm from '@/components/auth/SignInForm'

export default function SignIn() {
  return (
    <div>
      <div className="lg:flex flex-col items-start justify-center h-screen">
        <h1 className="lg:text-3xl text-xl mb-3 lg:mb-9">Log in to Decoding The Future Quest </h1>
        <SignInForm />
      </div>
    </div>
  )
}
