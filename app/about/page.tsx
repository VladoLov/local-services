import React from "react";
import Image from "next/image";
import workers from "../../public/eric-wang-um.webp";

/**
 * A simple About Us page component for a non-profit application.
 * It explains the app's mission to help people find skilled workers easily.
 */
export default function AboutPage() {
  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <div className="container mx-auto max-w-4xl p-6 bg-white rounded-xl shadow-lg mt-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          O nama
        </h1>

        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          <div className="md:w-1/2 mb-6 md:mb-0">
            {/* You can replace this with a relevant image or illustration */}
            <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
              {/* Placeholder for an image or illustration */}
              <Image
                src={workers}
                alt="Ilustracija pomoći"
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
          </div>

          <div className="md:w-1/2 text-gray-700">
            <p className="mb-4 text-lg">
              Dobrodošli na našu platformu, stvorenu s jednom jednostavnom
              misijom: olakšati vam pronalazak pouzdanih majstora i usluga u
              vašoj blizini.
            </p>
            <p className="mb-4 text-lg">
              Ova aplikacija je slobodna za korištenje i razvijena je na
              neprofitnoj osnovi. Naš jedini cilj je pružiti vam jednostavno i
              učinkovito rješenje za pronalaženje pravih stručnjaka, bez
              skrivenih troškova ili provizija.
            </p>
            <p className="mb-4 text-lg">
              Vjerujemo da potraga za kvalitetnom uslugom treba biti brza i bez
              stresa. Zato smo stvorili mjesto gdje se kvalitetni majstori mogu
              lako pronaći, a vi možete brzo dobiti potrebnu pomoć.
            </p>
            <p className="text-lg">Hvala vam što ste dio naše zajednice!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
