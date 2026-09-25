"use client";

import { useEffect, useState } from "react";

type Lab = {
  id: number;
  name: string;
  status: string;
};

export default function Home() {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/labs")
      .then((response) => response.json())
      .then((data) => {
        setLabs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load labs:", error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-800 bg-slate-900 p-6">

          <h1 className="text-2xl font-bold">
            DevOps<span className="text-blue-400">Lab</span>
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Local DevOps Playground
          </p>

          <nav className="mt-10 space-y-2">

            <button className="w-full rounded-lg bg-slate-800 px-4 py-3 text-left">
              Dashboard
            </button>

            <button className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800">
              Labs
            </button>

            <button className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800">
              Progress
            </button>

            <button className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800">
              Terminal
            </button>

            <button className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800">
              Infrastructure
            </button>

            <button className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800">
              Monitoring
            </button>

          </nav>
        </aside>

        {/* Main content */}
        <section className="flex-1 p-10">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-3xl font-bold">
                DevOps Learning Environment
              </h2>

              <p className="mt-2 text-slate-400">
                Practice the complete DevOps lifecycle locally.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-400"></span>
              Local Environment
            </div>

          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-4">

            <StatCard
              title="Labs"
              value={loading ? "..." : `${labs.length}`}
              description="Available"
            />

            <StatCard
              title="Completed"
              value="0"
              description="Labs completed"
            />

            <StatCard
              title="Progress"
              value="0%"
              description="Overall"
            />

            <StatCard
              title="Environment"
              value="Local"
              description="No AWS required"
            />

          </div>

          {/* Learning Progress */}
          <section className="mt-10">

            <h3 className="text-xl font-semibold">
              DevOps Progress
            </h3>

            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

              <ProgressCard name="Linux" progress={0} />

              <ProgressCard name="Git & GitHub" progress={0} />

              <ProgressCard name="Docker" progress={0} />

              <ProgressCard name="CI/CD" progress={0} />

              <ProgressCard name="Terraform" progress={0} />

              <ProgressCard name="Kubernetes" progress={0} />

            </div>

          </section>

          {/* Labs */}
          <section className="mt-10">

            <div className="flex items-center justify-between">

              <h3 className="text-xl font-semibold">
                DevOps Labs
              </h3>

              <span className="text-sm text-slate-500">
                {labs.length} labs
              </span>

            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">

              {labs.map((lab) => (

                <div
                  key={lab.id}
                  className="rounded-xl border border-slate-800 bg-slate-900 p-6"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <h4 className="text-lg font-semibold">
                        {lab.name}
                      </h4>

                      <p className="mt-1 text-sm text-slate-400">
                        Status: {lab.status}
                      </p>

                    </div>

                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500">
                      Start
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </section>

        </section>

      </div>
    </main>
  );
}


function StatCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm text-slate-400">{title}</p>

      <p className="mt-2 text-3xl font-bold">{value}</p>

      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  );
}


function ProgressCard({
  name,
  progress,
}: {
  name: string;
  progress: number;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

      <div className="flex justify-between">

        <span className="font-medium">
          {name}
        </span>

        <span className="text-sm text-slate-400">
          {progress}%
        </span>

      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">

        <div
          className="h-full rounded-full bg-blue-500"
          style={{ width: `${progress}%` }}
        />

      </div>

    </div>
  );
}
