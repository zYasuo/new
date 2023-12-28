"use client";

import { createUser } from "@/actions/create-user";
import { useAction } from "@/hooks/use-action";


import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { FormInput } from "./components/form/form-input";
import { FormSubmit } from "./components/form/form-submit-button";
import { Icons } from "@/components/ui/icons";
import { FaPaperPlane } from "react-icons/fa";
import { TbFaceIdError } from "react-icons/tb";

export const FormRegister = () => {
  const { execute, fieldErrors, isLoading } = useAction(createUser, {
    onSuccess(data) {
      toast({
        title: "Successo",
        description: "Usuário criado com sucesso!",
        variant: "default",
        action: (
          <ToastAction altText="ok" className="border-none">
            <Icons.spinner className="animate-spin mr-2 w-6 h-6" />
          </ToastAction>
        ),
      });
    },
    onError(error) {
      toast({
        title: "Erro",
        description: error,
        variant: "destructive",
        action: (
          <ToastAction altText="ok" className="border-none">
            <TbFaceIdError  />
          </ToastAction>
        ),
      });
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const sobrenome = formData.get("sobrenome") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    execute({
      id: email,
      name,
      sobrenome,
      email,
      password,
    });
  };

  return (
    <div>
      <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
        <div className="grid space-x-2 grid-cols-2">
          <FormInput
            id="name"
            placeholder="Primeiro nome"
            required
            errors={fieldErrors}
            disabled={isLoading}

          />
          <FormInput
            id="sobrenome"
            placeholder="Seu sobrenome"
            required
            errors={fieldErrors}
            disabled={isLoading}

          />
        </div>
        <FormInput
          id="email"
          placeholder="seuemail@exemplo.com.br"
          required
          errors={fieldErrors}
          disabled={isLoading}

        />
        <FormInput
          id="password"
          type="password"
          placeholder="Sua senha"
          required
          errors={fieldErrors}
          disabled={isLoading}

        />
        <FormSubmit disabled={isLoading} className="py-6 w-full">
          {isLoading ? (
            <Icons.spinner className="animate-spin" />
          ) : (
            <>
              Registrar
              <span className="ml-2">
                <FaPaperPlane />
              </span>
            </>
          )}
        </FormSubmit>
      </form>
    </div>
  );
};
