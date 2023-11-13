"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useSignIn, useSignUp } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
//import * as Icons from "@acme/ui/icons";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";

export function EmailSignIn() {
  const [isLoading, setIsLoading] = React.useState(false);

  const { signIn, isLoaded: signInLoaded, setActive } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const router = useRouter();

  const signInWithLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    if (!signInLoaded || typeof email !== "string") return null;

    // the catch here prints out the error.
    // if the user doesn't exist we will return a 422 in the network response.
    // so push that to the sign up.
    setIsLoading(true);
    await signIn
      .create({
        identifier: email,
      })
      .catch((error) => {
        console.log("sign-in error", JSON.stringify(error));
      });

    const firstFactor = signIn.supportedFirstFactors.find(
      (f) => f.strategy === "email_link",
      // This cast shouldn't be necessary but because TypeScript is dumb and can't infer it.
    ) as { emailAddressId: string } | undefined;

    if (firstFactor) {
      const magicFlow = signIn.createMagicLinkFlow();

      setIsLoading(false);
      toast(
        <div className="grid gap-1">
          <div className="text-sm font-semibold [&+div]:text-xs">
            Email sent
          </div>
          <div className="text-sm opacity-90">
            Check your inbox for a verification email.
          </div>
        </div>,
      );
      const response = await magicFlow
        .startMagicLinkFlow({
          emailAddressId: firstFactor.emailAddressId,
          redirectUrl: `${window.location.origin}/`,
        })
        .catch(() => {
          toast.error("Something went wrong, please try again.");
        });

      const verification = response?.firstFactorVerification;
      if (verification?.status === "expired") {
        toast(
          "Link expired, please try again."
        );
      }

      magicFlow.cancelMagicLinkFlow();
      if (response?.status === "complete") {
        await setActive({ session: response.createdSessionId });
        router.push(`/dashboard`);
      }
    } else {
      if (!signUpLoaded) return null;
      await signUp.create({
        emailAddress: email,
      });
      const { startMagicLinkFlow } = signUp.createMagicLinkFlow();

      setIsLoading(false);
      toast(
        <div className="grid gap-1">
          <div className="text-sm font-semibold [&+div]:text-xs">
            Email sent
          </div>
          <div className="text-sm opacity-90">
            Check your inbox for a verification email.
          </div>
        </div>,
      );
      const response = await startMagicLinkFlow({
        redirectUrl: `${window.location.origin}/`,
      })
        .catch(() => {
          toast.error("Something went wrong, please try again.");
        })
        .then((res) => res);

      if (response?.status === "complete") {
        await setActive({ session: response.createdSessionId });
        router.push(`/dashboard`);
        return;
      }
    }
  };

  return (
    <form className="grid gap-2" onSubmit={signInWithLink}>
      <div className="grid gap-1">
        <Input
          name="email"
          placeholder="name@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          className="bg-background"
        />
      </div>
      <Button disabled={isLoading}>
        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        Sign In with Email
      </Button>
    </form>
  );
}
