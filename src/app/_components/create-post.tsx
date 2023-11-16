"use client";

import * as React from "react";
import { Button } from "@/components/actions/loading-submit-button";
import { Input } from "@/components/ui/input";
import { createPostSafeAction } from "./actions";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hook";
import { P, match } from "ts-pattern";

export function CreatePost() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const { execute } = useAction(createPostSafeAction, {
    onSuccess: () => {
      formRef.current?.reset();
    },
    onError: (error) => {
      match(error)
        .with({ validationError: P.when(P.not) }, () => {
          console.error("validationError", error.validationError);
          toast.error("Some of the fields are invalid");
        })
        .with({ fetchError: P.when(P.not) }, (e) => {
          console.error("fetchError", e.fetchError);
          toast.error(e.fetchError);
        })
        .with({ serverError: P.when(P.not) }, (e) => {
          console.error("serverError", e.serverError);
          toast.error(e.serverError);
        });
    },
  });

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        execute(new FormData(e.currentTarget));
      }}
    >
      <Input type="text" name="name" placeholder="Title" autoFocus required />
      <Button type="submit">Submit</Button>
    </form>
  );
}
