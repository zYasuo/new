"use server";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create";
import { CreateUser } from "./schema";
import { InputType, ReturnType } from "./types";
import bcrypt from "bcrypt";

const handler = async (data: InputType): Promise<ReturnType> => {
   console.log(data);
  const { id, name, sobrenome, email, password } = data;
  let user;
  
  const userExists = await db.user.findUnique({
    where: {
      id: email,
    },
  });

  if (userExists) {
    return {
      error: "Usuário já existe",
    };
  }

  try {
    user = await db.user.create({
      data: {
        id: email,
        name,
        sobrenome,
        email,
        hashedPassword: await bcrypt.hash(password, 10),
      },
    });
  } catch (error) {
    return {
      error: "Falha ao Criar Usuário",
    };
  }

  return { data: user };
};

export const createUser = createSafeAction(CreateUser, handler);
