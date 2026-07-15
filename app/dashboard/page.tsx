export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        🎉 MadraFest Pro
      </h1>

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-white rounded-xl p-5 shadow">
          👨‍🎓
          <h2 className="mt-2 font-bold">Students</h2>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          🏆
          <h2 className="mt-2 font-bold">Events</h2>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          📝
          <h2 className="mt-2 font-bold">Registration</h2>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          📊
          <h2 className="mt-2 font-bold">Results</h2>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          🏅
          <h2 className="mt-2 font-bold">Certificates</h2>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          ⚙️
          <h2 className="mt-2 font-bold">Settings</h2>
        </div>

      </div>
    </main>
  );
}
