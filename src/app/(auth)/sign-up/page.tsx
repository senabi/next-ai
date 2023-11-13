import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OAuthSignIn } from "../_components/oauth-signin";

export default function SignUp() {
  return (
    <div className="mx-auto my-auto w-full min-w-min max-w-sm py-4 md:w-7/12 md:py-9">
      <h2 className="text-xl font-semibold md:text-2xl">Sign Up</h2>
      <p className="text-muted-foreground [&_a]:ml-1">
        Already have an account?
        <Link className="font-medium" href="/sign-in">
          Sign in
        </Link>
        .
      </p>
      <div className="my-4">
        <form
          className="new_user"
          id="new_user"
          action="/sign-up"
          acceptCharset="UTF-8"
          method="post"
        >
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
            By registering, you agree to the processing of your personal data by
            PlanetScale as described in the{" "}
            <a href="https://planetscale.com/legal/privacy" target="_blank">
              Privacy Policy
            </a>
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
              <Link href="https://planetscale.com/legal/agreement" target="_blank">
                Terms of Service
              </Link>
            </Label>
          </div>
          <div className="flex justify-between">
            <Button
              name="button"
              type="submit"
              className="btn btn-primary w-full"
            >
              Sign up
            </Button>
          </div>
        </form>
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
    </div>
  );
}

