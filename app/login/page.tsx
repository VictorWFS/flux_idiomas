'use client';

import { log } from "console";
import { useState } from "react";
import LoginForm from '@/components/LoginForm';

export default function LoginPage () {
    return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-cover bg-left bg-no-repeat"
        style={{ backgroundImage: "url('/images/login-background-3.png')" }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/45 to-black" />

      <div className="relative flex min-h-screen items-center justify-end px-6 md:px-12 lg:px-24">
        <LoginForm />
      </div>
    </main>

    )
}