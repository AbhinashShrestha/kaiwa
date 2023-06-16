'use client';

import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function LandingPage() {
    return (
        <div className="
            flex 
            min-h-full
            flex-col
            justify-center
            py-12
            sm:px-6
            lg:px-8
            bg-teal-50
        ">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image 
                    alt="Messaging app logo"
                    height="80"
                    width="80"
                    className="mx-auto w-auto"
                    src="/images/logo.png"
                />
                <h2 className="mt-6
                    text-center
                    text-3xl
                    font-bold
                    tracking-tight
                    text-gray-900">
                    Sign in to your Account
                </h2>
            </div>
            <AuthForm />
        </div>
    )
  }


  