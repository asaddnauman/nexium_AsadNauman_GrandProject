import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return <p>Please sign in to access the dashboard.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome, {session.user.email}</h1>
    </div>
  );
}
