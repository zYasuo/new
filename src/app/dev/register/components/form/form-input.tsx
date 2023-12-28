"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";

interface FormInputProps {
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[]> | undefined;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue = "",
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          <Input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            required={required}
            disabled={disabled || pending}
            className={cn("text-sm px-2 py-6", className)}
            aria-describedby={`${id}-error`}
            defaultValue={defaultValue}
            ref={ref}
            onBlur={onBlur}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";