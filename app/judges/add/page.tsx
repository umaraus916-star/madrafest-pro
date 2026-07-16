"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddJudgePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  async function saveJudge() {
    const { error } = await supabase
      .from("judges")
      .insert([
        {
          name,
          phone,
          password,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Judge added successfully!");
    router.push("/judges");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Add Judge
      </h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">

        <input
          type="text"
          placeholder="Judge Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-3"
        />
        <button
          onClick={saveJudge}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Save Judge
        </button>

      </div>
    </div>
  );
}
