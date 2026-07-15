"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
export default function AddStudent()  { 
const router = useRouter();

const [name, setName] = useState("");
const [admissionNo, setAdmissionNo] = useState("");
const [studentClass, setStudentClass] = useState("");

const [photo, setPhoto] = useState<File | null>(null);
const [uploading, setUploading] = useState(false);

const saveStudent = async () => {
  const { error } = await supabase.from("students").insert([
    {
      name,
      admission_no: admissionNo,
      class: studentClass,
    },
  ]);

  if (error) {
    alert("Error: " + error.message);
    return;
  }

  alert("Student Added Successfully");
  router.push("/students");
}; 
 return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700">
        ➕ Add Student
      </h1>

      <div className="mt-6 rounded-xl bg-white p-6 shadow space-y-4">

        <input
  type="text"
  placeholder="Student Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full rounded-lg border p-3"
/>

         <input
  type="text"
  placeholder="Admission Number"
  value={admissionNo}
  onChange={(e) => setAdmissionNo(e.target.value)}
  className="w-full rounded-lg border p-3"
/>

          <input
  type="text"
  placeholder="Class"
  value={studentClass}
  onChange={(e) => setStudentClass(e.target.value)}
  className="w-full rounded-lg border p-3"
/>
        <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    if (e.target.files?.[0]) {
      setPhoto(e.target.files[0]);
    }
  }}
  className="mb-4 w-full"
/>

        <button
  onClick={saveStudent}
  className="w-full rounded-lg bg-blue-700 p-3 text-white font-bold"
>
  Save Student
</button>

      </div>
    </main>
  );
}
