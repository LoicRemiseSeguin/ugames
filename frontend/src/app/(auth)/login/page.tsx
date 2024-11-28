"use client";

import { useAuth } from '@/hooks/authContext';
import { LoginModel } from '@/services/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const form = e.currentTarget;
      const usernameInput = form.username as HTMLInputElement;
      const passwordInput = form.password as HTMLInputElement;

      const loginData: LoginModel = {
        username: usernameInput.value,
        password: passwordInput.value
      };

      await login(loginData);

      const callbackUrl = searchParams.get('callbackUrl');

      // Basic security check for the redirect URL
      const isValidRedirect = callbackUrl && (
        callbackUrl.startsWith('/') ||
        callbackUrl.startsWith(window.location.origin)
      );

      if (isValidRedirect) {
        router.push(callbackUrl);
      } else {
        router.push('/');
      }

      // Refresh the router cache
      // router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-background border border-border rounded-lg shadow-lg p-8">
        {/* Section de gauche : Formulaire */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold text-primary mb-8">Log In</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* <div>
              <label className="text-sm text-primary" htmlFor="email">Email Address*</label>
              <input
                id="email"
                type="email"
                placeholder="Placeholder"
                className="input-field placeholder-muted-foreground"
                required
              />
            </div> */}
            <div>
              <label className="text-sm text-primary">Username*</label>
              <input
                id="username"
                // type="email"
                placeholder="Placeholder"
                className="input-field placeholder-muted-foreground"
                required
              />
            </div>

            <div>
              <label className="text-sm text-primary" htmlFor="password">Password*</label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder="Placeholder"
                  className="input-field placeholder-muted-foreground pr-10"
                  required
                />
                <button type="button" className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                  👁️
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">It must be a combination of minimum 8 letters, numbers, and symbols.</p>
            </div>

            <div className="flex items-center justify-between">
              <a href="#" className="text-sm text-primary underline">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="btn-primary w-full text-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>

          <div className="mt-6 flex space-x-2">
            <button className="btn-outline w-full flex items-center justify-center space-x-2 text-sm">
              <span>G</span>
              <span>Log in with Google</span>
            </button>
            <button className="btn-outline w-full flex items-center justify-center space-x-2 text-sm">
              <span></span>
              <span>Log in with Apple</span>
            </button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground text-center">
            No account yet? <a href="#" className="text-primary underline">Sign Up</a>
          </p>
        </div>

        {/* Section de droite : Espace réservé pour l'image avec marge à gauche */}
        <div className="hidden md:flex w-1/2 items-center justify-center p-8 border border-border ml-4">
          <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 8a2 2 0 11-4 0 2 2 0 014 0zm-4 6h4a1 1 0 011 1v1H8v-1a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
