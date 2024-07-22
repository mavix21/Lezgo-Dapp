import { User } from '@/server/db/types';
import { AdapterAccountType } from '@auth/core/adapters';

export interface AuthenticationService {
  getUser(): Promise<User>;

  signInWithProvider(provider: AdapterAccountType): Promise<{ url: string }>;

  signInWithCredentials(email: string, password: string): Promise<void>;
}
