"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Student = {
  id: string;
  name: string;
};

type Programme = {
  id: string;
  name: string;
};

export default function AddParticipantPage() {
  const router = useRouter();

  const [students, setStudents] = useState<Student[]>([]);
  const [programmes, setProgrammes] = useState<Programme[]>([]);

  const [studentId, setStudentId] = useState("");
  const [programmeId, setProgrammeId] = useState("");
  const [chestNo, setChestNo] = useState("");

  useEffect(() => {
    loadData();
  }, []);
  async function loadData() {
    const { data: studentData } = await supabase
      .from("students")
      .select("id, name")
      .order("name");

    const { data: programmeData } = await supabase
      .from("programmes")
      .select("id, name")
      .order("name");

    if (studentData) {
      setStudents(studentData);
    }

    if (programmeData) {
      setProgrammes(programmeData);
    }
  }

  async function saveParticipant() {
    const { error } = await supabase
      .from("participants")
      .insert([
        {
          student_id: studentId,
          programme_id: programmeId,
          chest_no: chestNo,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Participant added successfully!");
    router.push("/participants");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Add Participant
      </h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">

        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select Student</option>

          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>

        <select
          value={programmeId}
          onChange={(e) => setProgrammeId(e.target.value)}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select Programme</option>

          {programmes.map((programme) => (
            <option key={programme.id} value={programme.id}>
              {programme.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Chest Number"
          value={chestNo}
          onChange={(e) => setChestNo(e.target.value)}
          className="w-full border rounded-lg p-3"
        />
        <button
          onClick={saveParticipant}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Save Participant
        </button>

      </div>
    </div>
  );
}
