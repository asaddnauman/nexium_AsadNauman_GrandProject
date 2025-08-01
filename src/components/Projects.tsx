"use client";

import React from "react";

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-16 bg-white/80 backdrop-blur-md rounded-xl shadow-md mt-10"
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2
          className="text-4xl font-bold mb-10"
          style={{ fontFamily: "Gabriola", fontSize: "72px" }}
        >
          My Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3
              className="text-2xl font-semibold mb-2"
              style={{ fontFamily: "Gabriola", fontSize: "48px" }}
            >
              Smart Energy Monitor
            </h3>
            <p style={{ fontFamily: "Gabriola", fontSize: "32px" }}>
              An IoT-based energy monitoring system that tracks usage and
              transmits data to a web dashboard.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3
              className="text-2xl font-semibold mb-2"
              style={{ fontFamily: "Gabriola", fontSize: "48px" }}
            >
              AI Resume Tailor
            </h3>
            <p style={{ fontFamily: "Gabriola", fontSize: "32px" }}>
              A web app that customizes resumes using n8n AI logic and stores
              results in Supabase and MongoDB.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3
              className="text-2xl font-semibold mb-2"
              style={{ fontFamily: "Gabriola", fontSize: "48px" }}
            >
              Blog Summariser
            </h3>
            <p style={{ fontFamily: "Gabriola", fontSize: "32px" }}>
              Scrapes blogs, summarizes them using simulated AI logic,
              translates into Urdu, and stores data via APIs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
