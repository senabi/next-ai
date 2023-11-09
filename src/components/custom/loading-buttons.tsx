"use client";
import { type ButtonProps, Button as ButtonUI } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends ButtonProps {
  icon?: React.ReactNode;
}

export const SubmitActionButton = React.forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ icon, children, ...props }, ref) => {
    const { pending } = useFormStatus();
    const disabled = pending || props.disabled;

    return (
      <ButtonUI ref={ref} disabled={disabled} {...props}>
        {pending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : icon}
        {children}
      </ButtonUI>
    );
  },
);

SubmitActionButton.displayName = "Button";

