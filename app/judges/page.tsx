'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

type Judge = {
  id: string;
  name: string;
  phone: string;
};

export default function JudgesPage() {
  const [judges, setJudges] = useState<Judge[]>([]);
const [search, setSearch] = useState('');

  async function loadJudges() {
    const { data } = await supabase
      .from('judges')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setJudges(data);
    }
  }

async function deleteJudge(id: string) {
  const ok = confirm("Delete this judge?");

  if (!ok) return;

  await supabase
    .from("judges")
    .delete()
    .eq("id", id);

  loadJudges();
}

  useEffect(() => {
    loadJudges();
  }, []);
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Judges</h1>

        <Link
          href="/judges/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Judge
        </Link>
      </div>
<input
  type="text"
  placeholder="Search judge..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full border p-2 rounded mb-4"
/>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>

        {judges
  .filter((judge) =>

    judge.name.toLowerCase().includes(search.toLowerCase()) ||

    judge.phone.toLowerCase().includes(search.toLowerCase())
  )
  .map((judge) => (

          <tr key={judge.id}>
            <td className="border p-2">{judge.name}</td>

            <td className="border p-2">{judge.phone}</td>

            <td className="border p-2">
              <Link
                href={`/judges/edit/${judge.id}`}
                className="text-blue-600 mr-4"
              >
                Edit
              </Link>

<button
  onClick={() => deleteJudge(judge.id)}
  className="text-red-600"
>
  Delete
</button>

            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

