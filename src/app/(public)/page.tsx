// import Header from "@/components/header/Header";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header */}
      {/* <Header /> */}

      {/* Hero */}
      <section className="text-center py-20 px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Smart College ERP System
        </h2>

        <p className="text-gray-600 max-w-xl mx-auto">
          Manage students, courses, departments, attendance and exams in one place 🚀
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="border px-6 py-3 rounded-xl"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 px-6 py-10 max-w-6xl mx-auto">
        {[
          "Student Management",
          "Course & Department",
          "Attendance System",
          "Exam & Results",
          "Fees Management",
          "Reports & Analytics",
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg"
          >
            <h3 className="font-semibold text-lg">{item}</h3>
          </div>
        ))}
      </section>

      {/* Stats */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold">10K+</h3>
            <p>Students</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">500+</h3>
            <p>Teachers</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">100+</h3>
            <p>Colleges</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">24/7</h3>
            <p>Support</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © 2026 College ERP System
      </footer>
    </div>
  );
}