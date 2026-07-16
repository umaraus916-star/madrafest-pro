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

  useEffect(() => {
    loadJudges();
    loadProgrammes();
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
      </div>
    </div>
  );
}
