import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-burgundy-600 active:bg-burgundy-700",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-red-700",
        outline:
          "border border-border bg-card hover:bg-accent hover:text-accent-foreground text-foreground shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-accent",
        ghost:
          "hover:bg-accent hover:text-accent-foreground text-foreground",
        link:
          "text-primary underline-offset-4 hover:underline",
        hazard:
          "bg-burgundy-500/15 border border-burgundy-500/30 text-burgundy-500 hover:bg-burgundy-500/25 hover:border-burgundy-500/50 shadow-sm",
        tactical:
          "bg-silver-500/15 border border-silver-500/30 text-silver-600 hover:bg-silver-500/25 shadow-sm",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
