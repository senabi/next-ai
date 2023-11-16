import { CreatePost } from "@/app/_components/create-post";
import { caller } from "@/trpc/server";

export default async function Home() {
  const posts = await caller().post.getAll()

  return (
    <div className="p-3">
      {posts.map((post) => (
        <div key={post.id}>{post.name}</div>
      ))}
      <CrudShowcase />
    </div>
  );
}

async function CrudShowcase() {
  const latestPost = await caller().post.getLatest();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <CreatePost />
    </div>
  );
}
