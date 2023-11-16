import { Button } from "@/components/loading/action-submit-button";
import { Input } from "@/components/ui/input";
// import { createAction } from "@/server/api/trpc";
// import { caller } from "@/trpc/server";
// import { revalidatePath } from "next/cache";
import { createPost } from "./actions";
// import { useFormState } from "react-dom";
// import { toast } from "sonner";

// async function AddPost(data: FormData) {
//   "use server";
//   await caller().post.create({ name: data.get("name") as string });
//   revalidatePath("/");
// }

export function CreatePost() {
  // const [state, formAction] = useFormState(createPost, undefined);
  // React.useEffect(() => {
  //   if (state?.type == "error") {
  //     toast.error(state.error);
  //   }
  //   if (state?.type == "success" && state.message) {
  //     toast.success(state.message);
  //   }
  // }, [state]);
  return (
    <form className="flex flex-col gap-2" action={createPost}>
      <Input type="text" name="name" placeholder="Title" autoFocus />
      <Button type="submit">Submit</Button>
    </form>
  );
}
