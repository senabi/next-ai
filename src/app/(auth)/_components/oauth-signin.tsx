"use client";

import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import type { OAuthStrategy } from "@clerk/types";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import * as Icons from "@/components/icons";

export function OAuthSignIn() {
  const [isLoading, setIsLoading] = React.useState<OAuthStrategy | null>(null);
  const { signIn, isLoaded: signInLoaded } = useSignIn();

  const oauthSignIn = async (provider: OAuthStrategy) => {
    if (!signInLoaded) return null;
    try {
      setIsLoading(provider);
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/talk",
      });
    } catch (cause) {
      console.error(cause);
      setIsLoading(null);
      toast("Something went wrong, please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="outline"
        className="bg-background"
        onClick={() => oauthSignIn("oauth_google")}
      >
        {isLoading === "oauth_google" ? (
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.Google className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
    </div>
  );
}
