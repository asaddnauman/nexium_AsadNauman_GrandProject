// src/components/Contact.tsx
import React from "react";

const Contact = () => {
  return (
    <div className="py-20 px-6 text-white font-[Gabriola]">
      <h2 className="text-6xl font-bold mb-8">Contact</h2>
      <p className="text-3xl leading-relaxed max-w-4xl">
        Got a question or project idea? Let&apos;s connect! You can reach me at
        <a
          href="mailto:asadnaumanofficial@gmail.com"
          className="underline ml-2"
        >
          asadnaumanofficial@gmail.com
        </a>
      </p>
    </div>
  );
};

export default Contact;
