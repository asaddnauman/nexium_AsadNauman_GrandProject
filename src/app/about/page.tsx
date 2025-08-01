"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat bg-black bg-opacity-60 text-white font-[Gabriola] p-10">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-90 text-black rounded-xl p-8 shadow-2xl mt-10">
        <h1 className="text-[64px] text-center mb-6">
          About AI Resume Builder
        </h1>

        <p className="text-[28px] mb-6 leading-relaxed">
          Welcome to <strong>AI Resume Builder</strong>, your intelligent
          assistant for creating job-specific resumes. Upload your resume in{" "}
          <strong>.pdf</strong> or <strong>.doc</strong> format, choose your
          desired job role, and let our powerful AI tailor your content to stand
          out for that position.
        </p>

        <p className="text-[28px] mb-6 leading-relaxed">
          This platform ensures your resume highlights relevant skills and
          achievements aligned with your selected role—boosting your chances of
          landing interviews.
        </p>

        <h2 className="text-[40px] mt-10 mb-4">Meet the Creator</h2>
        <p className="text-[28px] leading-relaxed">
          I’m <strong>Asad Nauman</strong>, an aspiring electrical engineer
          passionate about technology, smart systems, and user-centric software
          solutions. I designed this tool to empower job seekers with tailored
          resumes using AI-powered automation. Let’s build a smarter future
          together!
        </p>
      </div>
    </div>
  );
}
