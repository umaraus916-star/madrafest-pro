"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { use } from "react";

export default function StudentIDCard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    loadStudent();
  }, []);

  async function loadStudent() {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("id", id)
    .single();

  console.log("ID:", id);
  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    alert(error.message);
    return;
  }

  setStudent(data);
}

  if (!student) return <p className="p-10">Loading...</p>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-[340px] rounded-2xl border-2 border-blue-700 bg-white p-5 text-center shadow-2xl">

        <h1 className="text-3xl font-bold text-blue-700">
          🎓 MadraFest Pro
        </h1>

        <img
          src={student.photo_url}
          className="mx-auto mt-4 h-36 w-36 rounded-full border-4 border-blue-700 object-cover shadow-lg"
        />

       <h2 className="mt-4 text-3xl font-extrabold text-black">
  {student.name}
</h2>

<p className="mt-2 text-lg text-gray-700">
  Admission No: {student.admission_no}
</p>

<p className="text-lg text-gray-700">
  Class: {student.class}
</p>
<hr className="my-4" />

<p className="text-sm text-gray-500">
MadraFest Pro Student ID
</p>
      <button
  onClick={() => window.print()}
  className="mt-6 w-full rounded-lg bg-blue-700 py-3 font-bold text-white print:hidden"
>
  🖨️ Print ID Card
</button>

      </div>
    </main>
  );
}
