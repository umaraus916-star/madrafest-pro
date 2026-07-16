"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Programme = {
  id: number;
  code: string;
  name: string;
  category: string;
  stage: string;
  type: string;
  max_marks: number;
};

export default function ProgrammesPage() {
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgrammes();
  }, []);
  async function loadProgrammes() {
    const { data, error } = await supabase
      .from("programmes")
      .select("*")
      .order("id", { ascending: true });

    if (!error && data) {
      setProgrammes(data);
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Programmes
        </h1>

        <Link
          href="/programmes/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Programme
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        {loading ? (

          <div className="p-6">
            Loading...
          </div>

        ) : programmes.length === 0 ? (

          <div className="p-6">
            No programmes found
          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Marks</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {programmes.map((programme) => (
                <tr key={programme.id} className="border-t">

                  <td className="p-3">
                    {programme.code}
                  </td>

                  <td className="p-3">
                    {programme.name}
                  </td>

                  <td className="p-3">
                    {programme.category}
                  </td>

                  <td className="p-3">
                    {programme.type}
                  </td>

                  <td className="p-3 font-bold">
                    {programme.max_marks}
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
