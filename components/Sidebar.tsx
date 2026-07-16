import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 bg-slate-900 text-white min-h-screen flex-col p-5">
      <h1 className="text-2xl font-bold mb-8">
        MadraFest Pro
      </h1>

      <nav className="flex flex-col gap-3">

        <Link href="/dashboard">Dashboard</Link>

        <Link href="/institutions">Institutions</Link>

        <Link href="/students">Students</Link>

        <Link href="/events">Events</Link>

        <Link href="/programmes">Programmes</Link>

        <Link href="/participants">Participants</Link>

        <Link href="/judges">Judges</Link>

        <Link href="/results">Results</Link>

        <Link href="/settings">Settings</Link>

      </nav>
    </aside>
  );
}
