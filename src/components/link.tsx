"use client";

import * as React from "react";
import NextLink, { type LinkProps } from "next/link";
import { cn } from "@/lib/utils";

interface CustomLinkProps
  extends LinkProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {}

const Link = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ className, ...rest }, ref) => {
    return (
      <NextLink
        ref={ref}
        className={cn(
          className,
          "text-blue-500 hover:text-blue-300 focus-visible:outline-ring",
        )}
        {...rest}
      />
    );
  },
);

Link.displayName = "Link";

export { Link };
