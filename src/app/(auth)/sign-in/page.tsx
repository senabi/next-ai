import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OAuthSignIn } from "../_components/oauth-signin";

export default function SignIn() {
  return (
    <div className="mx-auto my-auto w-full min-w-min max-w-sm py-4 md:w-7/12 md:py-9">
      <h2 className="text-xl font-semibold md:text-2xl">Sign In</h2>
      <p className="text-muted-foreground [&_a]:ml-1">
        Are you new here?
        <Link className="font-medium" href="/sign-up">
          Create an account
        </Link>
        .
      </p>
      <div className="my-4">
        <form
          className="new_user"
          id="new_user"
          action="/sign-in"
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
            <Label htmlFor="user_password">Password</Label>
            <Input
              autoComplete="current-password"
              required
              type="password"
              name="user[password]"
              id="user_password"
            />
          </div>
          <div className="mb-4 flex justify-between">
            <Link
              className="hover:!text-blue-500 !text-muted-foreground transition-colors"
              href="/password/new"
            >
              Forgot password?
            </Link>
          </div>
          <Button name="button" type="submit" className="w-full">
            Sign in
          </Button>
        </form>{" "}
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

      <div className="grid">
        {/* <form action="/auth/github" acceptCharset="UTF-8" method="post"> */}
        {/*   <input */}
        {/*     type="hidden" */}
        {/*     name="authenticity_token" */}
        {/*     defaultValue="_6XhvkVdrtClBtFOvmjyp7Ewjltwcdbvfycimu-BJiV4_iRsrqc2CjXQ3MzBkXVz7wbojMFtijtGRTBvHUVSBw" */}
        {/*     autoComplete="off" */}
        {/*   /> */}
        {/*   <button type="submit" className="btn btn-secondary w-full"> */}
        {/*     <svg */}
        {/*       width={32} */}
        {/*       height="20px" */}
        {/*       viewBox="0 0 32 32" */}
        {/*       fill="none" */}
        {/*       xmlns="http://www.w3.org/2000/svg" */}
        {/*     > */}
        {/*       <path */}
        {/*         fillRule="evenodd" */}
        {/*         clipRule="evenodd" */}
        {/*         d="M16 0C7.16 0 0 7.16 0 16C0 23.08 4.58 29.06 10.94 31.18C11.74 31.32 12.04 30.84 12.04 30.42C12.04 30.04 12.02 28.78 12.02 27.44C8 28.18 6.96 26.46 6.64 25.56C6.46 25.1 5.68 23.68 5 23.3C4.44 23 3.64 22.26 4.98 22.24C6.24 22.22 7.14 23.4 7.44 23.88C8.88 26.3 11.18 25.62 12.1 25.2C12.24 24.16 12.66 23.46 13.12 23.06C9.56 22.66 5.84 21.28 5.84 15.16C5.84 13.42 6.46 11.98 7.48 10.86C7.32 10.46 6.76 8.82 7.64 6.62C7.64 6.62 8.98 6.2 12.04 8.26C13.32 7.9 14.68 7.72 16.04 7.72C17.4 7.72 18.76 7.9 20.04 8.26C23.1 6.18 24.44 6.62 24.44 6.62C25.32 8.82 24.76 10.46 24.6 10.86C25.62 11.98 26.24 13.4 26.24 15.16C26.24 21.3 22.5 22.66 18.94 23.06C19.52 23.56 20.02 24.52 20.02 26.02C20.02 28.16 20 29.88 20 30.42C20 30.84 20.3 31.34 21.1 31.18C24.2763 30.1077 27.0363 28.0664 28.9917 25.3432C30.947 22.6201 31.9991 19.3524 32 16C32 7.16 24.84 0 16 0Z" */}
        {/*         fill="currentColor" */}
        {/*       /> */}
        {/*     </svg> */}
        {/*     GitHub */}
        {/*   </button> */}
        {/* </form>{" "} */}
        <OAuthSignIn />
      </div>
    </div>
  );
}
