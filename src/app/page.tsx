import { Metadata } from "next";
import { FormRegister } from "./dev/register/form";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormLogin } from "./dev/login/form";

export const metadata: Metadata = {
  title: "Bem Vindo ao DA",
  description: "Pagina Inicial - Plataforma",
};

export default function Home() {
  return (
    <>
      <div className="md:hidden"></div>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              className="w-6 h-6 mr-2 text-zinc-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15"
              />
            </svg>
            DA
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <Tabs defaultValue="Entrar" className="w-[400px] ">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="Registrar">Registrar</TabsTrigger>
                <TabsTrigger value="Entrar">Entrar</TabsTrigger>
              </TabsList>
              <TabsContent value="Registrar" className="space-y-6">
                <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight mt-2">
                    Criar Conta
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Entre com suas informações
                  </p>
                </div>
                <FormRegister />
                <p className="px-8 text-center text-sm text-muted-foreground">
                  Ao clicar em continuar, você concorda com nossos{" "}
                  <Link
                    href="/terms"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Termos de Serviços
                  </Link>{" "}
                  e{" "}
                  <Link
                    href="/privacy"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Politicas de Privacidade
                  </Link>
                  .
                </p>
              </TabsContent>
              <TabsContent value="Entrar" className="space-y-6">
                <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight mt-2">
                    Entrar
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Entre com suas informações
                  </p>
                </div>
                <FormLogin />
                <p className="px-8 text-center text-sm text-muted-foreground">
                  Ao clicar em continuar, você concorda com nossos{" "}
                  <Link
                    href="/terms"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Termos de Serviços
                  </Link>{" "}
                  e{" "}
                  <Link
                    href="/privacy"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Politicas de Privacidade
                  </Link>
                  .
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}