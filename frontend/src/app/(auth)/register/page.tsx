"use client";

import { useAuth } from '@/hooks/authContext';
import { RegisterModel } from '@/services/auth';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import Visual from "/src/logos/visual_3.png";

export default function SignUp() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const { register, login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const form = e.currentTarget;
      const emailInput = form.email as HTMLInputElement;
      const usernameInput = form['first-name'] as HTMLInputElement;
      const passwordInput = form.password as HTMLInputElement;

      const registerData: RegisterModel = {
        email: emailInput.value,
        username: usernameInput.value,
        password_hash: passwordInput.value
      };

      await register(registerData);

      // If registration successful, attempt to login
      try {
        const loginData = {
          username: usernameInput.value,
          password: passwordInput.value
        };

        await login(loginData);

        // If login successful, redirect to callback URL or home
        const callbackUrl = searchParams.get('callbackUrl');
        const isValidRedirect = callbackUrl && (
          callbackUrl.startsWith('/') ||
          callbackUrl.startsWith(window.location.origin)
        );

        if (isValidRedirect) {
          router.push(callbackUrl);
        } else {
          router.push('/');
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (loginErr) {
        // If login fails but registration succeeded, redirect to login page
        router.push('/login');
      }

      // const callbackUrl = searchParams.get('callbackUrl');

      // // Basic security check for the redirect URL
      // const isValidRedirect = callbackUrl && (
      //   callbackUrl.startsWith('/') ||
      //   callbackUrl.startsWith(window.location.origin)
      // );

      // if (isValidRedirect) {
      //   router.push(callbackUrl);
      // } else {
      //   router.push('/');
      // }

      // // Refresh the router cache
      // // router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Register failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-background rounded-lg p-8">
        {/* Left section: Form */}
        <div className="w-full md:w-1/2 pr-8">
          <h1 className="text-4xl font-bold text-secondary mb-8">Sign Up</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="text-sm text-secondary" htmlFor="first-name">First Name*</label>
                <input
                  id="first-name"
                  type="text"
                  placeholder="Placeholder"
                  className="w-full mt-1 p-2 bg-background border-b border-secondary/30 focus:outline-none focus:border-secondary placeholder-secondary/30"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="text-sm text-secondary" htmlFor="last-name">Last Name*</label>
                <input
                  id="last-name"
                  type="text"
                  placeholder="Placeholder"
                  className="w-full mt-1 p-2 bg-background border-b border-secondary/30 focus:outline-none focus:border-secondary placeholder-secondary/30"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-secondary" htmlFor="email">Email*</label>
              <input
                id="email"
                type="email"
                placeholder="Placeholder"
                className="w-full mt-1 p-2 bg-background border-b border-secondary/30 focus:outline-none focus:border-secondary placeholder-secondary/30"
                required
              />
            </div>

            <div>
              <label className="text-sm text-secondary" htmlFor="password">Password*</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                  placeholder="Placeholder"
                  className="w-full mt-1 p-2 bg-background border-b border-secondary/30 focus:outline-none focus:border-secondary placeholder-secondary/30 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-secondary/60 hover:text-secondary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="agreement"
                type="checkbox"
                className="form-checkbox border-secondary text-secondary rounded"
                required
              />
              <label htmlFor="agreement" className="text-sm text-secondary/60">Agreements</label>
            </div>

            <button
              type="submit"
              className="w-full bg-secondary text-secondary-foreground py-2 rounded-md hover:bg-secondary/90 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>

          <div className="mt-6 flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 border border-secondary/30 text-secondary rounded-md py-2 hover:bg-secondary/10 transition-colors">
              <span>G</span>
              <span>Log in with Google</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-secondary/30 text-secondary rounded-md py-2 hover:bg-secondary/10 transition-colors">
              <span></span>
              <span>Log in with Apple</span>
            </button>
          </div>

          <p className="mt-6 text-sm text-secondary/60 text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-secondary hover:text-secondary/80">
              Log in
            </Link>
          </p>
        </div>

        {/* Right section: Image placeholder */}
        <div className="hidden md:flex w-1/2 items-center justify-center border border-secondary/30 rounded-lg">
          <div className="p-8">
            <Image
              src={Visual}
              alt="logo"
            />
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-32 w-32 text-secondary/40"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg> */}
          </div>
        </div>
      </div>
    </div>
  );
}
