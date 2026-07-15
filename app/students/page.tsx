"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    setLoading(true);

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.log(error);
      alert(JSON.stringify(error));
    } else {
      console.log(data);
      setStudents(data || []);
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
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700">
        👨‍🎓 Students
      </h1>

      <div className="mt-6 rounded-xl bg-white p-5 shadow">

        <h2 className="text-xl font-bold text-black">
          Student List
        </h2>

        <p className="mt-2 font-bold text-blue-600">
        <input
  type="text"
  placeholder="🔍 Search student..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="mt-4 mb-4 w-full rounded-lg border p-3"
/>

          Total Students: {students.length}
        </p>

        {loading ? (
          <p className="mt-4 text-gray-600">
            Loading...
          </p>
        ) : students.length === 0 ? (
          <p className="mt-4 text-red-600">
            No students found.
          </p>
        ) : (
          students
  .filter((student) =>
    student.name
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((student) => (
            <div
              key={student.id}
              className="mt-4 rounded-lg border border-gray-300 bg-gray-50 p-4"
            >
              <p className="text-black">
                <strong>Name:</strong> {student.name}
              </p>

              <p className="mt-1 text-black">
                <strong>Admission No:</strong> {student.admission_no}
              </p>

              <p className="mt-1 text-black">
                <strong>Class:</strong> {student.class}
              </p>

              <div className="mt-4 flex gap-2">
                <Link href={`/students/edit/${student.id}`}>
  <button className="rounded bg-yellow-500 px-4 py-2 text-white">
    ✏️ Edit
  </button>
</Link>

                <button
                  onClick={() => deleteStudent(student.id)}
                  className="rounded bg-red-600 px-4 py-2 text-white"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        )}

        <Link href="/students/add">
          <button className="mt-6 w-full rounded-lg bg-blue-700 p-3 font-bold text-white">
            + Add Student
          </button>
        </Link>

      </div>
    </main>
  );
}
