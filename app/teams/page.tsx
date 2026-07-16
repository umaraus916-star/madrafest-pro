"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Team = {
  id: number;
  team_name: string;
  color: string;
  points: number;
};

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeams();
  }, []);

  async function loadTeams() {
    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .order("id", { ascending: true });

    if (!error && data) {
      setTeams(data);
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Teams
        </h1>

        <Link
          href="/teams/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Team
        </Link>

      </div>      <div className="bg-white rounded-xl shadow overflow-hidden">

        {loading ? (

          <div className="p-6">
            Loading...
          </div>

        ) : teams.length === 0 ? (

          <div className="p-6">
            No teams found
          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Team Name</th>
                <th className="p-3 text-left">Color</th>
                <th className="p-3 text-left">Points</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

           <tbody>
  {teams.map((team) => {
    return (
      <tr key={team.id} className="border-t">
        <td className="p-3">{team.team_name}</td>

        <td className="p-3">
          <span
            className="inline-block h-5 w-5 rounded-full border"
            style={{ backgroundColor: team.color }}
          />
          <span className="ml-2">{team.color}</span>
        </td>

        <td className="p-3 font-bold">
          {team.points}
        </td>

        <td className="p-3">
          <button className="bg-yellow-500 text-white px-3 py-1 rounded">
            Edit
          </button>

          <button className="ml-2 bg-red-600 text-white px-3 py-1 rounded">
            Delete
          </button>
        </td>
      </tr>
    );
  })}
</tbody>

          </table>

        )}

      </div>

    </div>
  );
}
