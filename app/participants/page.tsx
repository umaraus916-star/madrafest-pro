"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Participant = {
  id: number;
  chest_no: string;
  students: {
    name: string;
  };
  programmes: {
    name: string;
  };
};

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParticipants();
  }, []);
  async function loadParticipants() {
    const { data, error } = await supabase
      .from("participants")
      .select(`
        id,
        chest_no,
        students(name),
        programmes(name)
      `)
      .order("chest_no", { ascending: true });

    if (!error && data) {
      setParticipants(data as Participant[]);
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Participants
        </h1>

        <Link
          href="/participants/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Participant
        </Link>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        {loading ? (

          <div className="p-6">
            Loading...
          </div>

        ) : participants.length === 0 ? (

          <div className="p-6">
            No participants found
          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Programme</th>
                <th className="p-3 text-left">Chest No</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {participants.map((participant) => (
                <tr key={participant.id} className="border-t">

                  <td className="p-3">
                    {participant.students?.name}
                  </td>

                  <td className="p-3">
                    {participant.programmes?.name}
                  </td>

                  <td className="p-3 font-bold">
                    {participant.chest_no}
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
              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}
