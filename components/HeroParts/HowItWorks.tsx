import { CheckCircle, MessageCircle, Search } from "lucide-react";
import React from "react";

export default function HowItWorks() {
  return (
    // <section className="py-20 bg-gray-50">
    <section className="pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Kako Funkcioniše
          </h2>
          <p className="text-xl text-gray-600">
            Povežite se sa pravim profesionalcem u samo nekoliko koraka
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Pretražite & Uporedite
            </h3>
            <p className="text-gray-600 text-lg">
              Pregledajte stotine ovlaštenih profesionalaca u vašem području.
              Uporedite ocjene, recenzije i cijene.
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Dobijte Ponude
            </h3>
            <p className="text-gray-600 text-lg">
              Pošaljite više upita za zainteresovane profesionalace. Postavite
              pitanja i razgovarajte o detaljima vašeg projekta.
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Unajmite & Završite Posao
            </h3>
            <p className="text-gray-600 text-lg">
              Odaberite najboljeg profesionalca za vaše potrebe. Uživajte u
              novom ambijentu vašeg doma.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
