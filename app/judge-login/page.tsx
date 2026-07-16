'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

export default function JudgeLoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  async function loginJudge() {
    const { data, error } = await supabase
      .from('judges')
      .select('*')
      .eq('phone', phone)
      .eq('password', password)
      .single();

    if (error || !data) {
      alert('Invalid phone number or password');
      return;
    }

    localStorage.setItem('judge', JSON.stringify(data));

    router.push('/judge-dashboard');
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Judge Login
      </h1>

      <div className="space-y-4">

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
          onClick={loginJudge}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>

      </div>
    </div>
  );
}
