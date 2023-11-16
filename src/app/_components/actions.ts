"use server";

import { action } from "@/lib/safe-action";
import { caller } from "@/trpc/server";
import { revalidatePath } from "next/cache";
import { zfd } from "zod-form-data";


const schema = zfd.formData({ name: zfd.text() });
export const createPostSafeAction = action(schema, async ({ name }) => {
  await caller().post.create({ name });
  return revalidatePath("/talk");
});
