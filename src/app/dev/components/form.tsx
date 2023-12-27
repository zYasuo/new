"use client";

import { useState } from "react";
import { createUser } from "@/actions";
import { useAction } from "@/hooks/use-action";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

export const FormRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { execute } = useAction(createUser, {
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
      setIsLoading(false);
    },
    onError(error) {
      toast({
        title: "Erro",
        description: error,
        variant: "destructive",
        action: (
          <ToastAction altText="ok" className="border-none">
            <Icons.spinner className="animate-spin mr-2 w-6 h-6" />
          </ToastAction>
        ),
      });
      setIsLoading(false);
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

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
          <Input type="text" placeholder="Nome" name="name" required />
          <Input
            type="text"
            placeholder="Sobrenome"
            name="sobrenome"
            required
          />
        </div>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          autoComplete=""
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          name="password"
          autoComplete="new-password"
          required
        />
        <Button type="submit" disabled={isLoading} className="py-6 w-full">
          {isLoading ? (
            <Icons.spinner className="animate-spin" />
          ) : (
            <>
              Registrar
              <span className="ml-2">
                <PaperPlaneIcon />
              </span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
};
