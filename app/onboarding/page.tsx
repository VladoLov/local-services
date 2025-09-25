"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
/* import { CheckIcon } from "@radix-ui/react-icons"; */

export default function OnboardingPage() {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleContinue = () => {
    // U stvarnoj aplikaciji, ovdje biste poslali zahtjev serveru
    // kako biste ažurirali ulogu korisnika u bazi podataka.
    console.log("Odabrana uloga:", selectedRole);
    alert(`Odabrana uloga: ${selectedRole}`);
    // Nakon uspješnog slanja, možete preusmjeriti korisnika.
    // Primjer: router.push("/dashboard");
  };

  const roles = [
    { id: "master", label: "Želim biti Master" },
    { id: "company", label: "Želim biti Kompanija" },
    { id: "reviewer", label: "Želim ostaviti recenziju" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-lg p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Dobrodošli!</h1>
          <p className="mt-2 text-gray-600">
            Molimo odaberite ulogu koja Vas najbolje opisuje.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {roles.map((role) => (
            <div key={role.id}>
              <button
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`w-full flex flex-col items-center justify-center p-6 border-2 rounded-lg text-center transition-all duration-200 ease-in-out
                  ${
                    selectedRole === role.id
                      ? "bg-blue-500 text-white border-blue-600 shadow-md"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                  }
                `}
              >
                {selectedRole === role.id && (
                  <CheckIcon className="h-6 w-6 mb-2" />
                )}
                <span className="font-semibold">{role.label}</span>
              </button>
            </div>
          ))}
        </div>
        <Button
          onClick={handleContinue}
          disabled={!selectedRole}
          className="w-full"
        >
          Nastavi
        </Button>
      </Card>
    </div>
  );
}
