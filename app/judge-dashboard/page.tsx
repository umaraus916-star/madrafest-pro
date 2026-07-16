'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

type Judge = {
  name: string;
  phone: string;
};

export default function JudgeDashboardPage() {
  const [judge, setJudge] = useState<Judge | null>(null);

const [programmes, setProgrammes] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const savedJudge = localStorage.getItem('judge');

  if (savedJudge) {
    const judgeData = JSON.parse(savedJudge);

    setJudge(judgeData);

    loadProgrammes(judgeData.id);
  }
}, []);

async function loadProgrammes(judgeId: string) {
  setLoading(true);

  const { data } = await supabase
    .from('judge_programmes')
    .select(`
      id,
      programmes(name)
    `)
    .eq('judge_id', judgeId);

  if (data) {
    setProgrammes(data);
  }

  setLoading(false);
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Judge Dashboard
      </h1>

      <div className="mt-6 border rounded p-4">
        <h2 className="text-xl font-semibold">
          Welcome
        </h2>

        <p className="mt-2">
          {judge ? judge.name : 'Loading...'}
        </p>

        <p className="text-sm text-gray-500">
          {judge?.phone}
        </p>

<hr className="my-6" />

<h2 className="text-xl font-semibold mb-4">
  My Programmes
</h2>

{loading ? (
  <p>Loading...</p>
) : (
  <div className="space-y-3">
    {programmes.map((item: any) => (
      <div
        key={item.id}
        className="border rounded-lg p-4"
      >
        <h3 className="font-semibold text-lg">
          {item.programmes?.name}
        </h3>

        <button
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Enter Marks
        </button>
      </div>
    ))}
  </div>
)} 

     </div>
    </div>
  );
}
