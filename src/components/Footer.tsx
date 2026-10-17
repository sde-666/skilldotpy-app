import { Link } from 'react-router-dom';
import { Mail, ShieldCheck, BookOpen, CheckCircle2, GraduationCap, Calculator, FileText } from 'lucide-react';
import { siteConfig } from '../data/config';
import { BrandLogo } from './BrandLogo';
import { NielitLogo } from './NielitLogo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Educator Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <div className="bg-white/95 p-2 rounded-xl inline-block shadow-xs">
                <BrandLogo variant="horizontal" showTagline={true} />
              </div>
            </Link>
            <p className="mt-3 text-xs text-slate-400 leading-relaxed max-w-sm">
              Dedicated educational portal for <strong className="text-slate-200">NIELIT O Level (M1-R5 to M4-R5)</strong> & <strong className="text-slate-200">CCC</strong> exam preparation.
            </p>

            <div className="mt-4 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-2.5">
              <div className="bg-white p-1 rounded-md shrink-0">
                <NielitLogo size="xs" className="h-4" />
              </div>
              <div className="text-[10px] leading-tight text-slate-300">
                <span className="font-bold text-white block">Official NIELIT R5.1 Pattern</span>
                <span className="text-slate-400">Notes, MCQs, Courses & Result Calculator</span>
              </div>
            </div>
          </div>

          {/* Quick Study Navigation */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" /> Study Material
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link to="/chapter-wise-notes" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Chapter-Wise Notes (M1-M4)
                </Link>
              </li>
              <li>
                <Link to="/chapter-wise-mcq" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Chapter-Wise MCQ Practice
                </Link>
              </li>
              <li>
                <Link to="/mock-test" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Full CBT Mock Tests (100 Marks)
                </Link>
              </li>
              <li>
                <Link to="/syllabus" className="text-slate-400 hover:text-blue-400 transition-colors">
                  NIELIT O Level & CCC Syllabus
                </Link>
              </li>
            </ul>
          </div>

          {/* Paid Courses */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" /> Premium Courses
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link to="/courses" className="text-slate-400 hover:text-amber-400 transition-colors">
                  All Masterclass Courses
                </Link>
              </li>
              <li>
                <Link to="/my-courses" className="text-slate-400 hover:text-amber-400 transition-colors">
                  My Enrolled Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-blue-400 transition-colors">
                  About Skilldotpy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Help & Student Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Legal & Terms
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link to="/privacy-policy" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and disclaimer */}
        <div className="mt-8 border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>
            &copy; {currentYear} {siteConfig.name}. Created by {siteConfig.teacher.name}. All rights reserved.
          </p>
          <p className="text-center md:text-right max-w-md">
            Skilldotpy is an independent educational platform. NIELIT is a registered society under MeitY, Govt. of India.
          </p>
        </div>
      </div>
    </footer>
  );
}
