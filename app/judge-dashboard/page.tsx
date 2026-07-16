'use client';

import { useEffect, useState } from 'react';

type Judge = {
  name: string;
  phone: string;
};

export default function JudgeDashboardPage() {
  const [judge, setJudge] = useState<Judge | null>(null);

  useEffect(() => {
    const savedJudge = localStorage.getItem('judge');

    if (savedJudge) {
      setJudge(JSON.parse(savedJudge));
    }
  }, []);

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
      </div>
    </div>
  );
}
