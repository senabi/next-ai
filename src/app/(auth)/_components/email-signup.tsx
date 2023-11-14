"use client";

import * as React from "react";
import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUp } from "@clerk/nextjs";
import { z } from "zod";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import type { ClerkAPIErrorJSON } from "@clerk/types";
import { useSetAtom } from "jotai";
import { emailSignUpPhaseAtom } from "./atoms";

const passwordChecker = z
  .object({
    pass: z.string().min(1),
    passConfirm: z.string().min(1),
  })
  .refine((data) => data.pass === data.passConfirm, {
    message: "Passwords do not match",
  });
const emailChecker = z.string().email();

export function EmailSignUp() {
  const setPhase = useSetAtom(emailSignUpPhaseAtom);
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { signUp, isLoaded, setActive } = useSignUp();
  const [verifying, setVerifying] = React.useState(false);
  const newUserForm = React.useRef<HTMLFormElement>(null);
  const codeForm = React.useRef<HTMLFormElement>(null);

  async function onSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      if (!isLoaded) return;
      const email = new FormData(e.currentTarget).get("user[email]");
      const password = new FormData(e.currentTarget).get("user[password]");
      const passwordConfirm = new FormData(e.currentTarget).get(
        "user[password_confirmation]",
      );
      const tos = new FormData(e.currentTarget).get("tos");
      console.log(email, password, passwordConfirm, tos);
      const emailParsed = emailChecker.safeParse(email);
      const passwordParsed = passwordChecker.safeParse({
        pass: password,
        passConfirm: passwordConfirm,
      });
      if (!emailParsed.success) {
        toast.error(
          "There's something wrong with your email, please try again.",
        );
        return;
      }
      if (!passwordParsed.success) {
        if (
          typeof password === "string" &&
          typeof passwordConfirm === "string" &&
          password !== passwordConfirm
        ) {
          toast.error("Passwords do not match");
          return;
        }
        toast.error(
          "There's something wrong with your passwords, please try again.",
        );
        return;
      }
      if (tos !== "on") {
        toast.error("Please agree to the terms of service.");
        return;
      }

      // Start the sign-up process using the email and password provided
      await signUp.create({
        emailAddress: email as string,
        password: password as string,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // Set 'verifying' true to display second form and capture the OTP code
      setVerifying(true);

      toast.success("Check your inbox for a verification email.");
      newUserForm.current?.reset();
      setPhase("code");
    } catch (e) {
      const errObj = e as { errors?: ClerkAPIErrorJSON[] };
      const errors = errObj.errors ?? [];
      errors.map((err) => toast.error(err.message));
      console.error("Error:", JSON.stringify(e, null, 2));
    } finally {
      setLoading(false);
    }
  }

  // This function will handle the user submitting a code for verification
  async function handleVerify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isLoaded) return;
    const code = new FormData(e.currentTarget).get("code") as string;
    if (!code || typeof code !== "string") {
      toast.error("Please enter a code.");
      return;
    }
    setLoading(true);

    try {
      // Submit the code that the user provides to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        // The status can also be `abandoned` or `missing_requirements`
        // Please see https://clerk.com/docs/references/react/use-sign-up#result-status for  more information
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      // Check the status to see if it is complete
      // If complete, the user has been created -- set the session active
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        // Redirect the user to a post sign-up route
        router.push("/");
      }
    } catch (err) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      const errObj = err as { errors?: ClerkAPIErrorJSON[] };
      const errors = errObj.errors ?? [];
      errors.map((err) => {
        if (err.code === "verification_expired") {
          toast.error("Code expired, please try again.");
        }
      });
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  }

  if (!verifying) {
    return (
      <form onSubmit={handleVerify} id="verify_code" ref={codeForm}>
        <div className="mb-3 grid gap-1.5">
          <Label htmlFor="code">Verification Code</Label>
          <Input id="code" name="code" />
        </div>
        <div className="flex justify-between">
          <Button type="submit" className="w-full">Confirmar</Button>
        </div>
      </form>
    );
  }

  return (
    <form id="new_user" onSubmit={onSignUp} ref={newUserForm}>
      <div className="mb-3 grid gap-1.5">
        <Label htmlFor="user_email">Email</Label>
        <Input
          autoFocus
          autoComplete="email"
          required
          type="email"
          defaultValue=""
          name="user[email]"
          id="user_email"
        />
      </div>
      <div className="mb-3 grid gap-1.5">
        <Label className="mb-0" htmlFor="user_password">
          Password
        </Label>
        <Input
          className="js-password-strength"
          autoComplete="off"
          required
          type="password"
          name="user[password]"
          id="user_password"
          spellCheck="false"
        />
      </div>
      <div className="mb-4 grid gap-1.5">
        <Label htmlFor="user_password_confirmation">
          Password confirmation
        </Label>
        <Input
          autoComplete="new-password"
          required
          type="password"
          name="user[password_confirmation]"
          id="user_password_confirmation"
        />
      </div>
      <p className="mb-3 text-sm text-muted-foreground">
        By registering, you agree to the processing of your personal data as
        described in the{" "}
        <Link href="#" target="_blank">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mb-4 flex items-center space-x-2">
        <Checkbox
          className="mr-1"
          defaultValue={1}
          name="tos"
          id="tos"
          required
        />
        <Label className="mb-0 font-normal" htmlFor="tos">
          {"I've read and agree to the "}
          <Link href="#" target="_blank">
            Terms of Service
          </Link>
        </Label>
      </div>
      <div className="flex justify-between">
        <Button
          name="button"
          type="submit"
          className="w-full"
          disabled={loading || !isLoaded || !setActive}
        >
          {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Sign up
        </Button>
      </div>
    </form>
  );
}
