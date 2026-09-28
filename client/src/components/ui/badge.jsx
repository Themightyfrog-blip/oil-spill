import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase transition-colors font-mono focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-border bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-red-200 bg-red-50 text-red-700 border",
        outline:
          "text-foreground border-border",
        amber:
          "border-burgundy-500/30 bg-burgundy-500/10 text-burgundy-600",
        emerald:
          "border-silver-500/30 bg-silver-500/10 text-silver-700",
        warning:
          "border-burgundy-600/40 bg-burgundy-600/15 text-burgundy-400",
        subtle:
          "border-border bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
