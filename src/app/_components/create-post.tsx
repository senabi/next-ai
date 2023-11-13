import { Button } from "@/components/loading/action-submit-button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/server";
import { revalidatePath } from "next/cache";

async function AddPost(data: FormData) {
  "use server";
  await api().post.create({ name: data.get("name") as string });
  revalidatePath("/");
}

export function CreatePost() {
  return (
    <form className="flex flex-col gap-2" action={AddPost}>
      <Input type="text" name="name" placeholder="Title" />
      <Button type="submit">Submit</Button>
    </form>
  );
}
