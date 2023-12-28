"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ToastAction } from "@radix-ui/react-toast";

import { FormInput } from "./components/form/form-input";
import { FormSubmit } from "./components/form/form-submit-button";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/ui/icons";
import { FaSignInAlt } from "react-icons/fa";
import { TbFaceIdError } from "react-icons/tb";

export const FormLogin = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const rest = await signIn<"credentials">("credentials", {
      email,
      password,
      redirect: false,
    });

    if (rest?.error) {
      toast({
        title: "Error",
        description: rest.error,
        variant: "destructive",
        action: (
          <ToastAction altText="Tente Novamente">
            <TbFaceIdError />
          </ToastAction>
        ),
      });
      setLoading(false);
    } else {
      toast({
        title: "Successo",
        description: "Login efetuado com sucesso",
        variant: "default",
        action: (
          <ToastAction altText="ok" className="border-none">
            <Icons.spinner className="animate-spin mr-2 w-6 h-6" />
          </ToastAction>
        ),
      });
      router.push("/intranet");
    }
  };

  return (
    <div>
      <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
        <FormInput
          id="email"
          placeholder="seuemail@exemplo.com.br"
          disabled={isLoading}
          required
        />
        <FormInput
          id="password"
          type="password"
          placeholder="Sua senha"
          disabled={isLoading}
          required
        />
        <FormSubmit disabled={isLoading} className="py-6 w-full">
          {isLoading ? (
            <Icons.spinner className="animate-spin" />
          ) : (
            <>
              Entrar
              <span className="ml-2">
                <FaSignInAlt />
              </span>
            </>
          )}
        </FormSubmit>
      </form>
    </div>
  );
};
