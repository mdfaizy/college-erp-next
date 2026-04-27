// // import Header from "@/components/header/Header";
// import Link from "next/link";

// export default function HomePage() {
//   return (
//     <div className="bg-gray-50 min-h-screen">

//       {/* Header */}
//       {/* <Header /> */}

//       {/* Hero */}
//       <section className="text-center py-20 px-6">
//         <h2 className="text-4xl font-bold text-gray-800 mb-4">
//           Smart College ERP System
//         </h2>

//         <p className="text-gray-600 max-w-xl mx-auto">
//           Manage students, courses, departments, attendance and exams in one place 🚀
//         </p>

//         <div className="mt-6 flex justify-center gap-4">
//           <Link
//             href="/register"
//             className="bg-blue-600 text-white px-6 py-3 rounded-xl"
//           >
//             Get Started
//           </Link>

//           <Link
//             href="/login"
//             className="border px-6 py-3 rounded-xl"
//           >
//             Login
//           </Link>
//         </div>
//       </section>

//       {/* Features */}
//       <section className="grid md:grid-cols-3 gap-6 px-6 py-10 max-w-6xl mx-auto">
//         {[
//           "Student Management",
//           "Course & Department",
//           "Attendance System",
//           "Exam & Results",
//           "Fees Management",
//           "Reports & Analytics",
//         ].map((item, i) => (
//           <div
//             key={i}
//             className="bg-white p-6 rounded-2xl shadow hover:shadow-lg"
//           >
//             <h3 className="font-semibold text-lg">{item}</h3>
//           </div>
//         ))}
//       </section>

//       {/* Stats */}
//       <section className="bg-blue-600 text-white py-12 text-center">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
//           <div>
//             <h3 className="text-2xl font-bold">10K+</h3>
//             <p>Students</p>
//           </div>
//           <div>
//             <h3 className="text-2xl font-bold">500+</h3>
//             <p>Teachers</p>
//           </div>
//           <div>
//             <h3 className="text-2xl font-bold">100+</h3>
//             <p>Colleges</p>
//           </div>
//           <div>
//             <h3 className="text-2xl font-bold">24/7</h3>
//             <p>Support</p>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="text-center py-6 text-gray-500 text-sm">
//         © 2026 College ERP System
//       </footer>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { 
  Users, 
  BookOpen, 
  CheckCircle, 
  BarChart3, 
  CreditCard, 
  ShieldCheck, 
  ChevronRight,
  ArrowUpRight,
  Globe,
  Zap
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* Navigation (Quick ERP Style) */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 border-b border-slate-50 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
            <Zap size={20} fill="currentColor" />
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tight italic">Nexus<span className="text-indigo-600">ERP</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600 uppercase tracking-widest">
          <Link href="#" className="hover:text-indigo-600 transition-colors">Solutions</Link>
          <Link href="#" className="hover:text-indigo-600 transition-colors">Security</Link>
          <Link href="#" className="hover:text-indigo-600 transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold text-slate-700 hover:text-indigo-600">Login</Link>
          <Link href="/register" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-slate-200 hover:bg-indigo-600 transition-all active:scale-95">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-50 rounded-full blur-[100px] opacity-60"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 animate-fade-in">
            <ShieldCheck size={14} /> Trusted by 100+ Institutions Worldwide
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8">
            The Operating System for <span className="text-indigo-600">Modern Colleges.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Eliminate paperwork and streamline campus operations with our AI-powered 
            enterprise resource planning platform.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
            <Link
              href="/register"
              className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Start Free Trial <ChevronRight size={20} />
            </Link>
            <button className="w-full sm:w-auto border border-slate-200 bg-white text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              Book Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Powerful Core Modules</h2>
            <p className="text-slate-500 font-medium">Everything you need to run a high-performing campus.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Users />} 
              title="Student Lifecycle" 
              desc="From admission to graduation, track every milestone in a unified profile." 
            />
            <FeatureCard 
              icon={<BookOpen />} 
              title="Smart Curriculum" 
              desc="Dynamic course mapping, department hierarchies, and elective management." 
            />
            <FeatureCard 
              icon={<CheckCircle />} 
              title="Biometric Attendance" 
              desc="Real-time tracking with automated alerts for low attendance and proxy detection." 
            />
            <FeatureCard 
              icon={<BarChart3 />} 
              title="Exam & Analytics" 
              desc="Instant results generation with deep visual insights into student performance." 
            />
            <FeatureCard 
              icon={<CreditCard />} 
              title="Digital Treasury" 
              desc="Fee collection with automated invoicing and online payment integrations." 
            />
            <FeatureCard 
              icon={<Globe />} 
              title="Global Reports" 
              desc="One-click compliance reports for NAAC, NIRF, and university audits." 
            />
          </div>
        </div>
      </section>

      {/* Stats Section (Premium Style) */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
            <StatItem value="10k+" label="Students Enrolled" />
            <StatItem value="500+" label="Expert Educators" />
            <StatItem value="120+" label="Global Partners" />
            <StatItem value="99.9%" label="System Uptime" />
          </div>

          <div className="mt-16 pt-12 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
            <h3 className="text-white text-2xl font-bold max-w-sm text-center md:text-left">
              Ready to digitize your institution today?
            </h3>
            <Link href="/register" className="bg-indigo-500 hover:bg-indigo-400 text-white px-10 py-4 rounded-2xl font-black transition-all flex items-center gap-2">
              Create Account <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-1 rounded text-slate-400">
              <Zap size={16} />
            </div>
            <span className="font-bold text-slate-400 tracking-tighter italic">NexusERP</span>
          </div>
          <p className="text-slate-400 text-sm">
            © 2026 Nexus Systems Inc. Built for the future of education.
          </p>
          <div className="flex gap-6 text-slate-400 text-sm font-bold">
            <Link href="#" className="hover:text-indigo-600">Privacy</Link>
            <Link href="#" className="hover:text-indigo-600">Terms</Link>
            <Link href="#" className="hover:text-indigo-600">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Utility Components
function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function StatItem({ value, label }: any) {
  return (
    <div className="text-center">
      <h4 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">{value}</h4>
      <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">{label}</p>
    </div>
  );
}