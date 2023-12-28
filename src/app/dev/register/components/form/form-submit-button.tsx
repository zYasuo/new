"use client";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

interface FormButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant,
}: FormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex items-center">
      <Button
      type="submit"
      disabled={disabled || pending}
      className={cn(className)}
      size="sm"
      variant={variant}
      
    >
       {pending && <Icons.spinner className="animate-spin mr 2" />}
      {children}
    </Button>
    </div>
    
  );
};