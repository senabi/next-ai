"use server";

// import { posts } from "@/server/db/schema";
import { caller } from "@/trpc/server";
import { revalidatePath } from "next/cache";
// import { z } from "zod";

type StateMessage =
  | { type: "success"; message: string }
  | { type: "error"; error: string };

export async function createPost(
  //_prev: StateMessage | undefined,
  formData: FormData,
): Promise<StateMessage> {
  try {
    await caller().post.create({ name: formData.get("name") as string });
    revalidatePath("/talk");
    return { type: "success", message: "" };
  } catch (e) {
    console.error(e);
    return { type: "error", error: "Failed to create" };
  }
}

// export const addPostAction = createAction(
//   protectedProcedure
//     .input(z.object({ name: z.string().min(1) }))
//     .mutation(async (opts) => {
//       const res = await opts.ctx.db
//         .insert(posts)
//         .values({ name: opts.input.name });
//       console.log(res);
//       revalidatePath("/talk");
//       return { message: opts.input.name };
//     }),
// );
