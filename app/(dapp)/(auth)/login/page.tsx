import { Logo } from '@/app/_components/layout/Logo';
import { LoginForm } from '../_components/LoginForm';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center h-svh">
      <div className="relative mx-auto flex w-[min(100%,24rem)] max-w-[400px] flex-col border rounded-md space-y-2.5 p-4">
        <div className="mx-auto">
          <Logo />
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
