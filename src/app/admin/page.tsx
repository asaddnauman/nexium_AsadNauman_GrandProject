"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface UserData {
  id: string;
  email: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await supabase.from("users").select("id, email");
      if (data) setUsers(data as UserData[]);
    };
    fetchUsers();
  }, []); // ✅ no unnecessary dependency

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Page</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id} className="py-1">
            {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
