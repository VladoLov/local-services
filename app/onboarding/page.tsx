"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProgressSteps } from "@/components/specialComponents/progress-steps";
import {
  RoleSelection,
  Role,
} from "@/components/specialComponents/role-selection";
import { FirmProfileForm } from "@/components/specialComponents/firm-profile-form";
import { MasterProfileForm } from "@/components/specialComponents/master-profile-form";
import { OnboardingImageUpload } from "@/components/specialComponents/onboarding-image-upload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Odabir uloge",
    description: "Kako ćete koristiti platformu",
  },
  {
    id: 2,
    title: "Profil",
    description: "Osnovne informacije",
  },
  {
    id: 3,
    title: "Slike",
    description: "Dodajte fotografije",
  },
  {
    id: 4,
    title: "Završetak",
    description: "Sve je spremno!",
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<Role | undefined>();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const router = useRouter();

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleProfileComplete = () => {
    // Skip to image upload step
    setCurrentStep(3);
  };

  const handleSkipProfile = () => {
    // Skip to image upload step
    setCurrentStep(3);
  };

  const handleImageComplete = (imageUrls: string[]) => {
    setUploadedImages(imageUrls);
    setCurrentStep(4);
  };

  const handleSkipImages = () => {
    setCurrentStep(4);
  };

  const handleFinishOnboarding = () => {
    // Redirect to homepage
    router.push("/");
  };

  const canProceedFromStep1 = selectedRole !== undefined;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <ProgressSteps steps={steps} currentStep={currentStep} />
        </div>

        {/* Step Content */}
        <div className="space-y-8">
          {/* Step 1: Role Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <RoleSelection
                onRoleSelect={handleRoleSelect}
                selectedRole={selectedRole}
              />

              {canProceedFromStep1 && (
                <div className="flex justify-center">
                  <Button
                    onClick={handleNextStep}
                    size="lg"
                    className="min-w-32"
                  >
                    Nastavi
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Profile Forms */}
          {currentStep === 2 && (
            <div>
              {selectedRole === Role.Firma && (
                <FirmProfileForm
                  onSuccess={handleProfileComplete}
                  onSkip={handleSkipProfile}
                />
              )}

              {selectedRole === Role.Majstor && (
                <MasterProfileForm
                  onSuccess={handleProfileComplete}
                  onSkip={handleSkipProfile}
                />
              )}

              {selectedRole === Role.Korisnik && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">
                      Dobrodošli!
                    </h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Kao korisnik, možete odmah početi pretraživati i
                      rezervirati usluge.
                    </p>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Vaš profil je spreman</CardTitle>
                      <CardDescription>
                        Možete dodati dodatne informacije kasnije u postavkama
                        profila
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={handleProfileComplete}
                        className="w-full"
                      >
                        Nastavi
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Image Upload */}
          {currentStep === 3 && (
            <OnboardingImageUpload
              onComplete={handleImageComplete}
              onSkip={handleSkipImages}
            />
          )}

          {/* Step 4: Completion */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">
                  Dobrodošli na platformu!
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto text-lg">
                  Vaš profil je uspješno kreiran. Sada možete početi koristiti
                  sve funkcionalnosti platforme.
                </p>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3 text-center">
                      <div className="space-y-2">
                        <h4 className="font-semibold">Uloga</h4>
                        <p className="text-muted-foreground">{selectedRole}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Profil</h4>
                        <p className="text-muted-foreground">
                          {selectedRole === Role.Korisnik
                            ? "Osnovni"
                            : "Kreiran"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Slike</h4>
                        <p className="text-muted-foreground">
                          {uploadedImages.length > 0
                            ? `${uploadedImages.length} dodano`
                            : "Nema slika"}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        onClick={handleFinishOnboarding}
                        size="lg"
                        className="w-full"
                      >
                        Idemo na početnu stranicu
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Možete urediti svoj profil bilo kada u postavkama
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
