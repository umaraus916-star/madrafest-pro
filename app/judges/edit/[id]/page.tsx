'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';

export default function EditJudgePage() {
  const router = useRouter();
  const params = useParams();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    loadJudge();
  }, []);

  async function loadJudge() {
    const { data } = await supabase
      .from('judges')
      .select('*')
      .eq('id', params.id)
      .single();

    if (data) {
      setName(data.name);
      setPhone(data.phone);
      setPassword(data.password);
    }
  }

  async function updateJudge() {
    await supabase
      .from('judges')
      .update({
        name,
        phone,
        password,
      })
      .eq('id', params.id);

    router.push('/judges');
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Judge</h1>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Judge Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={updateJudge}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Judge
        </button>

      </div>
    </div>
  );
}


