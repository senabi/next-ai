import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Verify() {
  return (
    <div className="mx-auto my-auto w-full min-w-min max-w-sm py-4 md:w-7/12 md:py-9">
      <h2 className="text-xl font-semibold md:text-2xl">Confirm code</h2>
      <p className="text-sm text-muted-foreground [&_a]:ml-1">
        We have sent you an email with a code.
        <Link className="font-medium" href="/sign-in">
          Go back
        </Link>
        .
      </p>
      <div className="my-4">
        <form id="verify_code">
          <div className="mb-3 grid gap-1.5">
            <Label htmlFor="code">Verification Code</Label>
            <Input id="code" name="code" type="number" />
          </div>
          <div className="flex justify-between">
            <Button type="submit" className="w-full">
              Confirmar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
