/**
 * Edit Stadium Page
 * Full-page form for editing an existing Stadium/Arena
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ArenaConfigurator from "@/components/admin/ArenaConfigurator";
import { ArenaConfig } from "@/types/arenaConfig";

export default function EditStadiumPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [arena, setArena] = useState<ArenaConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArena();
  }, [params.id]);

  const fetchArena = async () => {
    try {
      const response = await fetch(`/api/arenas/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setArena(data.data);
      } else {
        alert("Failed to load Stadium");
        router.push("/admin/game/stadiums");
      }
    } catch (error) {
      console.error("Error fetching Stadium:", error);
      alert("Failed to load Stadium");
      router.push("/admin/game/stadiums");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedArena: ArenaConfig) => {
    try {
      const response = await fetch(`/api/arenas/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedArena),
      });

      const data = await response.json();

      if (data.success) {
        alert("Stadium updated successfully!");
        router.push("/admin/game/stadiums");
      } else {
        alert(`Failed to update Stadium: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating Stadium:", error);
      alert("Failed to update Stadium");
    }
  };

  const handleCancel = () => {
    router.push("/admin/game/stadiums");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Stadium...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleCancel}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Edit Stadium: {arena?.name}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Modify properties for this battle stadium
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="max-w-7xl mx-auto">
        <ArenaConfigurator
          arena={arena}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
