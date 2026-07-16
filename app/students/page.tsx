"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Student = {
  id: string;
  admission_no: string;
  name: string;
  class: string;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setStudents(data);
    }

    setLoading(false);
  }
async function deleteStudent(id: string) {
  const ok = confirm("Delete this student?");

  if (!ok) return;

  const { error } = await supabase
    .from("students")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
  } else {
    alert("Student Deleted Successfully");
    loadStudents();
  }
}
  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Students
        </h1>

        <Link
          href="/students/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Student
        </Link>

      </div>      <div className="bg-white rounded-xl shadow overflow-hidden">

        {loading ? (

          <div className="p-6">
            Loading...
          </div>

        ) : students.length === 0 ? (

          <div className="p-6">
            No students found
          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Admission No</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Class</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>

              {students.map((student) => (

                <tr
                  key={student.id}
                  className="border-t"
                >
                  <td className="p-3">
                    {student.admission_no}
                  </td>

                  <td className="p-3">
                    {student.name}
                  </td>

                  <td className="p-3">
                    {student.class}
                  </td>
                   <td className="p-3">
  <Link
    href={`/students/edit/${student.id}`}
    className="bg-yellow-500 text-white px-3 py-1 rounded"
  >
    Edit
  </Link>
<button
  onClick={() => deleteStudent(student.id)}
  className="bg-red-600 text-white px-3 py-1 rounded ml-2"
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
