'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

type Judge = {
  id: string;
  name: string;
};

type Programme = {
  id: string;
  name: string;
};

export default function JudgeAssignmentPage() {
  const [judges, setJudges] = useState<Judge[]>([]);
  const [programmes, setProgrammes] = useState<Programme[]>([]);

  const [judgeId, setJudgeId] = useState('');
  const [programmeId, setProgrammeId] = useState('');

const [assignments, setAssignments] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  loadJudges();
  loadProgrammes();
  loadAssignments();
}, []); 

  async function loadJudges() {
    const { data } = await supabase
      .from('judges')
      .select('*')
      .order('name');

    if (data) setJudges(data);
  }

  async function loadProgrammes() {
    const { data } = await supabase
      .from('programmes')
      .select('*')
      .order('name');

    if (data) setProgrammes(data);
  }

async function loadAssignments() {
  setLoading(true);

  const { data } = await supabase
    .from('judge_programmes')
    .select(`
      id,
      judges(name),
      programmes(name)
    `)
    .order('created_at', { ascending: false });

  if (data) {
    setAssignments(data);
  }

  setLoading(false);
}

  async function assignJudge() {
    if (!judgeId || !programmeId) {
      alert('Please select Judge and Programme');
      return;
    }

    const { error } = await supabase
      .from('judge_programmes')
      .insert([
        {
          judge_id: judgeId,
          programme_id: programmeId,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert('Assignment Saved');

    setJudgeId('');
    setProgrammeId('');
  }

async function deleteAssignment(id: string) {
  const ok = confirm('Delete this assignment?');

  if (!ok) return;

  await supabase
    .from('judge_programmes')
    .delete()
    .eq('id', id);

  loadAssignments();
}

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Judge Assignment
      </h1>

      <div className="space-y-4">
        <select
          value={judgeId}
          onChange={(e) => setJudgeId(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Judge</option>

          {judges.map((judge) => (
            <option key={judge.id} value={judge.id}>
              {judge.name}
            </option>
          ))}
        </select>

        <select
          value={programmeId}
          onChange={(e) => setProgrammeId(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Programme</option>

          {programmes.map((programme) => (
            <option key={programme.id} value={programme.id}>
              {programme.name}
            </option>
          ))}
        </select>

        <button
          onClick={assignJudge}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Assign Judge
        </button>

<hr className="my-6" />

<h2 className="text-xl font-semibold mb-4">
  Assignment List
</h2>

{loading ? (
  <p>Loading...</p>
) : (
  <table className="w-full border">
    <thead>
 <tr className="bg-gray-100">
  <th className="border p-2">Judge</th>
  <th className="border p-2">Programme</th>
  <th className="border p-2">Action</th>
</tr>
    </thead>

    <tbody>
      {assignments.map((item: any) => (
<tr key={item.id}>
  <td className="border p-2">
    {item.judges?.name}
  </td>

  <td className="border p-2">
    {item.programmes?.name}
  </td>

  <td className="border p-2">
    <button
      onClick={() => deleteAssignment(item.id)}
      className="text-red-600"
    >
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
