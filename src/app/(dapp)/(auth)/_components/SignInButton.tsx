'use client';

import React from 'react';
import { handleGoogleSignIn } from '@/app/(dapp)/(auth)/_actions/sign-in-with-google.action';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

function SignInButton({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Button
      onClick={() => handleGoogleSignIn()}
      variant="outline"
      className="w-full"
      type="button"
    >
      <Icons.google className="mr-2 h-4 w-4" />
      {children || 'Sign In'}
    </Button>
  );
}

export default SignInButton;
