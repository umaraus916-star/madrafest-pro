"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddTeamPage() {
  const router = useRouter();

  const [teamName, setTeamName] = useState("");
  const [color, setColor] = useState("");

  async function saveTeam() {
    const { error } = await supabase
      .from("teams")
      .insert([
        {
          team_name: teamName,
          color: color,
          points: 0,
        },
      ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Team Added Successfully");
      router.push("/teams");
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add Team</h1>

      <div className="bg-white rounded-xl p-6 space-y-4">
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          placeholder="Color (Red, Blue...)"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <button
          onClick={saveTeam}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Save Team
        </button>
      </div>
    </div>
  );
}
