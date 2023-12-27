import { z } from "zod";
import { User } from "@prisma/client";

import { ActionState } from "@/lib/create";

import { CreateUser } from "./schema";

export type InputType = z.infer<typeof CreateUser>;
export type ReturnType = ActionState<InputType, User>;