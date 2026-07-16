'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

type Programme = {
  id: string;
  name: string;
};

type Criteria = {
  id: string;
  name: string;
};

type CurrentCriteria = {
  id: string;
  max_marks: number;
  criteria: {
    name: string;
  } | null;
};

export default function CriteriaPage() {
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [criteria, setCriteria] = useState<Criteria[]>([]);
  const [currentCriteria, setCurrentCriteria] = useState<CurrentCriteria[]>([]);

  const [programmeId, setProgrammeId] = useState('');
  const [criteriaId, setCriteriaId] = useState('');
  const [maxMarks, setMaxMarks] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProgrammes();
    loadCriteria();
  }, []);

  async function loadProgrammes() {
    const { data } = await supabase
      .from('programmes')
      .select('*')
      .order('name');

    if (data) {
      setProgrammes(data);
    }
  }

  async function loadCriteria() {
    const { data } = await supabase
      .from('criteria')
      .select('*')
      .order('name');

    if (data) {
      setCriteria(data);
    }
  }

  async function loadCurrentCriteria(programmeId: string) {
    if (!programmeId) {
      setCurrentCriteria([]);
      return;
    }

    setLoading(true);

    const { data } = await supabase
      .from('programme_criteria')
      .select(`
        id,
        max_marks,
        criteria(name)
      `)
      .eq('programme_id', programmeId)
      .order('display_order');

    if (data) {
      setCurrentCriteria(data as CurrentCriteria[]);
    }

    setLoading(false);
  }
  async function addCriteria() {
    if (!programmeId || !criteriaId || !maxMarks) {
      alert('Please fill all fields');
      return;
    }

    const { error } = await supabase
      .from('programme_criteria')
      .insert([
        {
          programme_id: programmeId,
          criteria_id: criteriaId,
          max_marks: Number(maxMarks),
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert('Criteria Added');

    loadCurrentCriteria(programmeId);

    setCriteriaId('');
    setMaxMarks('');
  }

  async function deleteCriteria(id: string) {
    const ok = confirm('Delete this criteria?');

    if (!ok) return;

    const { error } = await supabase
      .from('programme_criteria')
      .delete()
      .eq('id', id);

    if (error) {
      alert(error.message);
      return;
    }

    loadCurrentCriteria(programmeId);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Criteria Management
      </h1>

      <div className="space-y-4">

        <select
          value={programmeId}
          onChange={(e) => {
            const value = e.target.value;
            setProgrammeId(value);
            loadCurrentCriteria(value);
          }}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Programme</option>

          {programmes.map((programme) => (
            <option key={programme.id} value={programme.id}>
              {programme.name}
            </option>
          ))}
        </select>

        <select
          value={criteriaId}
          onChange={(e) => setCriteriaId(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Criteria</option>

          {criteria.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Max Marks"
          value={maxMarks}
          onChange={(e) => setMaxMarks(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={addCriteria}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Criteria
        </button>
        <hr className="my-6" />

        <h2 className="text-xl font-semibold">
          Current Criteria
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Criteria</th>
                <th className="border p-2">Max Marks</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {currentCriteria.map((item) => (
                <tr key={item.id}>
                  <td className="border p-2">
                    {item.criteria?.name}
                  </td>

                  <td className="border p-2">
                    {item.max_marks}
                  </td>

                  <td className="border p-2">
                    <button
                      onClick={() => deleteCriteria(item.id)}
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
