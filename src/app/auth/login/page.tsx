// src/app/auth/signin/page.tsx
import SignInForm from "./SignInForm"; // separate client form

export const metadata = {
  title: "AquaFlow - Sign In",
  description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};

export default function SignInPage() {
  return <SignInForm />;
}
