"use client";

import { OAuthSignIn } from "./oauth-signin";
import { EmailSignUp } from "./email-signup";
import { useAtomValue } from "jotai";
import { emailSignUpPhaseAtom } from "./atoms";

export default function SignUpOptions() {
  const phase = useAtomValue(emailSignUpPhaseAtom);

  if (phase === "code") {
    return (
      <div className="my-4">
        <EmailSignUp />
      </div>
    );
  }

  return (
    <>
      <div className="my-4">
        <EmailSignUp />
      </div>
      <div className="relative mb-3">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or with
          </span>
        </div>
      </div>
      <form action="/auth/github" acceptCharset="UTF-8" method="post">
        <OAuthSignIn />
      </form>
    </>
  );
}
