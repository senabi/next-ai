import { Link } from "@/components/link";
import SignUpOptions from "../_components/signup-options";

export default function SignUp() {
  return (
    <div className="mx-auto my-auto w-full min-w-min max-w-sm py-4 md:w-7/12 md:py-9">
      <h2 className="text-xl font-semibold md:text-2xl">Sign Up</h2>
      <p className="text-sm text-muted-foreground [&_a]:ml-1">
        Already have an account?
        <Link className="font-medium" href="/sign-in">
          Sign in
        </Link>
        .
      </p>
      <SignUpOptions />
    </div>
  );
}
