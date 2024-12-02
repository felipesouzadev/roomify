"use client";

export default function Topmenu() {
  const handleLogoff = () => {
    alert("Logging off...");
  };

  return (
    <header className="bg-primary shadow">
      <div className="flex justify-end items-center px-6 h-16">
        <div className="flex items-center space-x-4">
          <span className="text-secondary">Welcome, User</span>
          <button
            onClick={handleLogoff}
            className="bg-red-500 hover:bg-red-600 text-secondary px-4 py-2 rounded"
          >
            Log Off
          </button>
        </div>
      </div>
    </header>
  );
}
