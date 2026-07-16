"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddProgrammePage() {
  const router = useRouter();

  const [programmeCode, setProgrammeCode] = useState("");
  const [programmeName, setProgrammeName] = useState("");
  const [category, setCategory] = useState("");
  const [stage, setStage] = useState("");
  const [type, setType] = useState("");
  const [maxMarks, setMaxMarks] = useState(100);
  async function saveProgramme() {
  alert(
    JSON.stringify({
      programmeCode,
      programmeName,
      category,
      stage,
      type,
      maxMarks,
    })
  );

  const { error } = await supabase.from("programmes").insert([
    {
      code: programmeCode,
      name: programmeName,
      category,
      stage,
      type,
      max_marks: maxMarks,
    },
  ]);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Programme added successfully!");
  router.push("/programmes");
}

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Add Programme
      </h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">

        <input
          type="text"
          placeholder="Programme Code"
          value={programmeCode}
          onChange={(e) => setProgrammeCode(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Programme Name"
          value={programmeName}
          onChange={(e) => setProgrammeName(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Category (LP / UP / HS / HSS)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Stage"
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Type (Individual / Group)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="number"
          placeholder="Max Marks"
          value={maxMarks}
          onChange={(e) => setMaxMarks(Number(e.target.value))}
          className="w-full border rounded-lg p-3"
        />
        <button
          onClick={saveProgramme}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Save Programme
        </button>

      </div>
    </div>
  );
}
