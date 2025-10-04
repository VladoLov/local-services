"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Wrench, User, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export enum Role {
  Firma = "Firma",
  Majstor = "Majstor",
  Korisnik = "Korisnik",
}

interface RoleOption {
  value: Role;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  popular?: boolean;
}

const roleOptions: RoleOption[] = [
  {
    value: Role.Firma,
    title: "Firma",
    description: "Registrirajte svoju firmu i ponudite usluge",
    icon: Building2,
    features: [
      "Kreiranje profila firme",
      "Dodavanje usluga",
      "Upravljanje zaposlenicima",
      "Analitika poslovanja",
    ],
  },
  {
    value: Role.Majstor,
    title: "Majstor",
    description: "Ponudite svoje vještine kao nezavisan majstor",
    icon: Wrench,
    features: [
      "Osobni profil majstora",
      "Prikaz specijalizacije",
      "Portfolio radova",
      "Direktan kontakt s klijentima",
    ],
    popular: true,
  },
  {
    value: Role.Korisnik,
    title: "Korisnik",
    description: "Pronađite i rezervirajte usluge",
    icon: User,
    features: [
      "Pretraživanje usluga",
      "Rezervacija termina",
      "Ocjenjivanje majstora",
      "Povijest narudžbi",
    ],
  },
];

interface RoleSelectionProps {
  onRoleSelect: (role: Role) => void;
  selectedRole?: Role;
}

export function RoleSelection({
  onRoleSelect,
  selectedRole,
}: RoleSelectionProps) {
  const [hoveredRole, setHoveredRole] = useState<Role | null>(null);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Odaberite svoju ulogu
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Odaberite kako ćete koristiti našu platformu. Možete promijeniti ovu
          opciju kasnije.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {roleOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedRole === option.value;
          const isHovered = hoveredRole === option.value;

          return (
            <Card
              key={option.value}
              className={cn(
                "relative cursor-pointer transition-all duration-200 hover:shadow-lg",
                {
                  "ring-2 ring-primary ring-offset-2": isSelected,
                  "hover:ring-1 hover:ring-primary/50": !isSelected,
                }
              )}
              onMouseEnter={() => setHoveredRole(option.value)}
              onMouseLeave={() => setHoveredRole(null)}
              onClick={() => onRoleSelect(option.value)}
            >
              {option.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Popularno
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center transition-colors",
                      {
                        "bg-primary text-primary-foreground":
                          isSelected || isHovered,
                        "bg-muted text-muted-foreground":
                          !isSelected && !isHovered,
                      }
                    )}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                </div>
                <CardTitle className="text-xl">{option.title}</CardTitle>
                <CardDescription className="text-sm">
                  {option.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {option.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={isSelected ? "default" : "outline"}
                  className="w-full mt-6 group"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRoleSelect(option.value);
                  }}
                >
                  {isSelected ? "Odabrano" : "Odaberi"}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedRole && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Odabrali ste:{" "}
            <span className="font-semibold text-foreground">
              {selectedRole}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
