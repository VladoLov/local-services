import { SignUpForm } from "@/components/specialComponents/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Registracija
          </h1>
          <p className="text-muted-foreground">
            Kreirajte svoj račun i počnite koristiti platformu
          </p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
