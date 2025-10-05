"use client";
import React from "react";
import RevealText from "../ui/RevealText";
import SearchBar from "../SearchBar";

export default function HeroFirstSection() {
  return (
    // <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
    <section className="relative  text-Black">
      {/*  <div className="absolute inset-0 bg-black opacity-20"></div> */}
      <div className="absolute inset-0"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <RevealText>Pronađi Te Lokalne</RevealText>

            <span className="block text-yellow-900">
              <RevealText direction="left">Profesionalne Usluge</RevealText>
            </span>
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-yellow-800 max-w-3xl mx-auto">
            <RevealText delay={500}>
              Povežite se s ovlaštenim vodoinstalaterima, električarima,
              čistačima i drugim profesionalim uslugama.
            </RevealText>
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto  rounded-2xl p-6 ">
            <div className="flex flex-col lg:flex-row">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
