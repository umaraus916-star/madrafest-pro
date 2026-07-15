"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditStudentPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [admissionNo, setAdmissionNo] = useState("");
  const [studentClass, setStudentClass] = useState("");

  useEffect(() => {
    loadStudent();
  }, []);

  async function loadStudent() {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    setName(data.name);
    setAdmissionNo(data.admission_no);
    setStudentClass(data.class);
  }

  async function updateStudent() {
    const { error } = await supabase
      .from("students")
      .update({
        name,
        admission_no: admissionNo,
        class: studentClass,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      alert("Student Updated Successfully");
      router.push("/students");
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700">
        ✏️ Edit Student
      </h1>

      <div className="mt-6 rounded-xl bg-white p-5 shadow">
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full rounded border p-3"
        />

        <input
          type="text"
          placeholder="Admission Number"
          value={admissionNo}
          onChange={(e) => setAdmissionNo(e.target.value)}
          className="mb-4 w-full rounded border p-3"
        />

        <input
          type="text"
          placeholder="Class"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
          className="mb-4 w-full rounded border p-3"
        />

        <button
          onClick={updateStudent}
          className="w-full rounded bg-blue-700 p-3 font-bold text-white"
        >
          Save Changes
        </button>
      </div>
    </main>
  );
}
