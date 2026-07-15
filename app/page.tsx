export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-indigo-900 p-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          MadraFest Pro
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Login to Continue
        </p>

        <div className="mt-8">
          <label className="block text-sm font-medium">
            Username
          </label>

          <input
            type="text"
            placeholder="Enter Username"
            className="mt-2 w-full rounded-lg border p-3"
          />
        </div>

        <div className="mt-5">
          <label className="block text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter Password"
            className="mt-2 w-full rounded-lg border p-3"
          />
        </div>

        <button className="mt-8 w-full rounded-lg bg-blue-700 p-3 text-white font-semibold">
          Login
        </button>
      </div>
    </main>
  );
}
