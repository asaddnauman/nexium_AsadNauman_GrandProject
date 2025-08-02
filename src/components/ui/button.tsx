import * as React from "react";
import { cn } from "@/lib/utils";

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/40 backdrop-blur text-white font-semibold transition",
      className
    )}
    {...props}
  />
));
Button.displayName = "Button";
