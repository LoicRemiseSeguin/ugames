// src/pages/signup/page.tsx
import React from 'react';

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-background border border-border rounded-lg shadow-lg p-8">
        {/* Left Section: Form */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold text-primary mb-8">Sign Up</h1>
          <form className="space-y-6">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="text-sm text-primary" htmlFor="first-name">First Name*</label>
                <input
                  id="first-name"
                  type="text"
                  placeholder="Placeholder"
                  className="input-field placeholder-muted-foreground"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="text-sm text-primary" htmlFor="last-name">Last Name*</label>
                <input
                  id="last-name"
                  type="text"
                  placeholder="Placeholder"
                  className="input-field placeholder-muted-foreground"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-primary" htmlFor="email">Email*</label>
              <input
                id="email"
                type="email"
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
            </div>

            <div className="flex items-center space-x-2">
              <input id="agreement" type="checkbox" className="form-checkbox" required />
              <label htmlFor="agreement" className="text-sm text-muted-foreground">Agreements</label>
            </div>

            <button type="submit" className="btn-primary w-full text-lg font-semibold">
              Sign Up
            </button>
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
            Already have an account? <a href="#" className="text-primary underline">Log in</a>
          </p>
        </div>

        {/* Right Section: Image Placeholder with Left Margin */}
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
