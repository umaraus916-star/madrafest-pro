"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [admissionNo, setAdmissionNo] = useState("");
  const [name, setName] = useState("");
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

    if (!error && data) {
      setAdmissionNo(data.admission_no);
      setName(data.name);
      setStudentClass(data.class);
    }
  }

  async function updateStudent() {
    const { error } = await supabase
      .from("students")
      .update({
        admission_no: admissionNo,
        name: name,
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
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Edit Student
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
          onClick={updateStudent}
          className="w-full bg-green-600 text-white p-3 rounded"
        >
          Update Student
        </button>

      </div>
    </div>
  );
}
