import { z } from "zod";

export type FieldErros<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  fieldsErrors?: FieldErros<TInput>;
  error?: string | null;
  data?: TOutput;
};

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validateData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validationResult = schema.safeParse(data);
    if (!validationResult.success) {
      return {
        fieldsErrors: validationResult.error.flatten()
          .fieldErrors as FieldErros<TInput>,
        error: null,
      };
    }
    return handler(validationResult.data);
  };
};