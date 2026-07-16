export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        MadraFest Pro Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Welcome Administrator
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-gray-500">Students</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-gray-500">Programmes</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-gray-500">Judges</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-gray-500">Events</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

      </div>
    </div>
  );
}
