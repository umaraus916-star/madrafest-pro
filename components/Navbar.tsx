"use client";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between bg-white border-b px-6 py-4 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          MadraFest Pro
        </h1>
        <p className="text-sm text-gray-500">
          Meelad Fest Management System
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-semibold text-gray-800">
            Super Admin
          </p>
          <p className="text-sm text-gray-500">
            Online
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
          A
        </div>
      </div>
    </header>
  );
}
