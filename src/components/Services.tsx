"use client";

import React from "react";

const Services = () => {
  return (
    <section id="services" className="p-10 bg-gray-50 text-center">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">Smart Grid Design</h3>
          <p>
            Design and simulation of intelligent, energy-efficient grids using
            MATLAB and AI.
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">Web Dashboards</h3>
          <p>
            Real-time monitoring dashboards using React, Supabase, and MongoDB.
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">Hardware Prototyping</h3>
          <p>
            From PCB routing to IoT prototyping using Altium, EasyEDA, and
            microcontrollers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
