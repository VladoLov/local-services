import { Phone } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-blue-400">
                Majstor Zanata
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Povezujemo vlasnike objekata s provjerenim lokalnim pružateljima
              usluga širom zemlje.
            </p>
            <div className="flex space-x-4">
              <Phone className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">1-800-SERVICE</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6">Popularne Usluge</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="/services?category=majstor"
                  className="hover:text-white transition-colors"
                >
                  Majstori
                </a>
              </li>
              <li>
                <a
                  href="/services?category=elektricar"
                  className="hover:text-white transition-colors"
                >
                  Električari
                </a>
              </li>
              <li>
                <a
                  href="/services?category=cistac"
                  className="hover:text-white transition-colors"
                >
                  Čišćenje
                </a>
              </li>
              <li>
                <a
                  href="/services?category=cvecar"
                  className="hover:text-white transition-colors"
                >
                  Cvjerćarnice
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6">Kompanija</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  O Nama
                </a>
              </li>
              {/*   <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6">Podrška</h3>
            <ul className="space-y-3 text-gray-400">
              {/*     <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Safety
                </a>
              </li> */}
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Uslovi korištenja
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Politika privatnosti
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 MajstorZanata. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
}
