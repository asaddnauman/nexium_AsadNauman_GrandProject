"use client";

import React from "react";

export default function Recommendations() {
  return (
    <section
      id="recommendations"
      className="py-16 bg-white/80 backdrop-blur-md rounded-xl shadow-md mt-10"
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2
          className="text-4xl font-bold mb-10"
          style={{ fontFamily: "Gabriola", fontSize: "72px" }}
        >
          Recommendations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p style={{ fontFamily: "Gabriola", fontSize: "32px" }}>
              “Asad has a rare combination of hardware and web development
              expertise. His dedication and quick learning stood out during his
              internship.”
            </p>
            <p
              className="mt-4 font-semibold text-lg"
              style={{ fontFamily: "Gabriola", fontSize: "32px" }}
            >
              – Nexium Supervisor
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <p style={{ fontFamily: "Gabriola", fontSize: "32px" }}>
              “His smart energy monitoring project was a highlight of our
              department showcase. I highly recommend him for real-world tech
              innovation.”
            </p>
            <p
              className="mt-4 font-semibold text-lg"
              style={{ fontFamily: "Gabriola", fontSize: "32px" }}
            >
              – UET Instructor
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <p style={{ fontFamily: "Gabriola", fontSize: "32px" }}>
              “The Blog Summariser app by Asad was visually stunning and
              functionally solid. He’s a creative and reliable developer.”
            </p>
            <p
              className="mt-4 font-semibold text-lg"
              style={{ fontFamily: "Gabriola", fontSize: "32px" }}
            >
              – Peer Developer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
