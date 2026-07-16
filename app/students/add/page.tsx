"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddStudentPage() {
  const router = useRouter();

  const [admissionNo, setAdmissionNo] = useState("");
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");

  const saveStudent = async () => {
    const { error } = await supabase
      .from("students")
      .insert([
        {
          admission_no: admissionNo,
          name: name,
          class: studentClass,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Student Added Successfully");
    router.push("/students");
  };

  return (
    <div className="max-w-xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Add Student
      </h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <input
          className="w-full border p-3 rounded"
          placeholder="Admission No"
          value={admissionNo}
          onChange={(e) => setAdmissionNo(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Class"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
        />

        <button
          onClick={saveStudent}
          className="w-full bg-blue-600 text-white p-3 rounded-lg"
        >
          Save Student
        </button>

      </div>
    </div>
  );
}
