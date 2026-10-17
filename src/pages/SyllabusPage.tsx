import { Link } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Sparkles, 
  Layers, 
  Globe, 
  Terminal, 
  Cpu, 
  CheckCircle2, 
  ExternalLink,
  BookOpen,
  GraduationCap,
  Clock,
  Award
} from 'lucide-react';
import { SEO } from '../components/SEO';

export function SyllabusPage() {
  const syllabusCards = [
    {
      code: 'M1-R5.1',
      title: 'Information Technology Tools and Network Basics',
      hindiTitle: 'आईटी टूल्स एवं नेटवर्क बेसिक्स',
      description: 'Introduction to Computer, OS, LibreOffice Suite (Writer, Calc, Impress), Internet & WWW, E-mail & Digital Financial Tools.',
      theoryHours: 48,
      labHours: 72,
      totalHours: 120,
      marks: '100 (Theory) + 100 (Practical PR1)',
      weightage: '60:40 (Theory : Practical)',
      pdfUrl: '/downloads/m1-r5-syllabus.pdf',
      notesUrl: '/chapter-wise-notes/m1-r5',
      mcqUrl: '/chapter-wise-mcq/m1-r5',
      color: 'from-blue-600 to-indigo-700',
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: Layers,
      topics: [
        'Introduction to Computer & Evolution',
        'Operating Systems (GUI & CLI concepts)',
        'Word Processing using LibreOffice Writer',
        'Spreadsheet manipulation in LibreOffice Calc',
        'Presentation Creation in LibreOffice Impress',
        'Introduction to Internet, WWW and Web Browsing',
        'E-mail, Social Networking & e-Governance',
        'Digital Financial Tools & Applications (UPI, AEPS, USSD)',
        'Overview of FutureSkills & Cyber Security'
      ]
    },
    {
      code: 'M2-R5.1',
      title: 'Web Designing and Publishing',
      hindiTitle: 'वेब डिजाइनिंग एवं पब्लिशिंग',
      description: 'HTML5 Semantic Elements, CSS3, Responsive Design (W3.CSS/Bootstrap), JavaScript Basics, Photo Editing & Web Publishing.',
      theoryHours: 48,
      labHours: 72,
      totalHours: 120,
      marks: '100 (Theory) + 100 (Practical PR2)',
      weightage: '60:40 (Theory : Practical)',
      pdfUrl: '/downloads/m2-r5-syllabus.pdf',
      notesUrl: '/chapter-wise-notes/m2-r5',
      mcqUrl: '/chapter-wise-mcq/m2-r5',
      color: 'from-sky-600 to-blue-800',
      badgeBg: 'bg-sky-100 text-sky-800 border-sky-200',
      icon: Globe,
      topics: [
        'Introduction to Web Design & Client-Server Architecture',
        'HTML & Text Editors (VS Code, Notepad++)',
        'HTML5 Semantic Elements & Media Integration',
        'Cascading Style Sheets (CSS3 Selectors, Box Model)',
        'Responsive Design using CSS Frameworks (W3.CSS)',
        'JavaScript Language Basics & Event Handling',
        'Photo Editor Tools & Web Graphics Optimization',
        'Web Publishing, Hosting & FTP Protocols'
      ]
    },
    {
      code: 'M3-R5.1',
      title: 'Programming and Problem Solving Through Python',
      hindiTitle: 'पायथन प्रोग्रामिंग एवं प्रॉब्लम सॉल्विंग',
      description: 'Algorithms & Flowcharts, Python Syntax, Operators, Control Flow, Lists/Tuples/Dictionaries, Functions & NumPy.',
      theoryHours: 48,
      labHours: 72,
      totalHours: 120,
      marks: '100 (Theory) + 100 (Practical PR3)',
      weightage: '60:40 (Theory : Practical)',
      pdfUrl: '/downloads/m3-r5-syllabus.pdf',
      notesUrl: '/chapter-wise-notes/m3-r5',
      mcqUrl: '/chapter-wise-mcq/m3-r5',
      color: 'from-emerald-600 to-teal-800',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: Terminal,
      topics: [
        'Introduction to Programming & Algorithms',
        'Flowcharts and Decision Structures',
        'Python Syntax, Variables & Basic I/O',
        'Operators, Expressions and Conditional Statements',
        'Loops (for, while, nested loops)',
        'Sequence Data Types: Lists, Tuples, Dictionaries & Sets',
        'Functions, Scope & Recursion',
        'File Handling in Python (read, write, append)',
        'NumPy Basics for Scientific Computing'
      ]
    },
    {
      code: 'M4-R5.1',
      title: 'Internet of Things (IoT) and its Applications',
      hindiTitle: 'इंटरनेट ऑफ थिंग्स (IoT)',
      description: 'IoT Architecture, Sensors & Actuators, Arduino Uno C/C++ Programming, IoT Protocols, Cyber Security & Soft Skills.',
      theoryHours: 48,
      labHours: 72,
      totalHours: 120,
      marks: '100 (Theory) + 100 (Practical PR4)',
      weightage: '60:40 (Theory : Practical)',
      pdfUrl: '/downloads/m4-r5-syllabus.pdf',
      notesUrl: '/chapter-wise-notes/m4-r5',
      mcqUrl: '/chapter-wise-mcq/m4-r5',
      color: 'from-purple-600 to-indigo-800',
      badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: Cpu,
      topics: [
        'Introduction to IoT - Sensors, Actuators & Microcontrollers',
        'Things and Connections in IoT Networks',
        'Sensors, Actuators and Microcontrollers Integration',
        'Building IoT Applications with Arduino Uno',
        'Security Aspects in IoT Devices',
        'Soft Skills, Communication & Personality Development'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24">
      <SEO
        title="NIELIT O Level & CCC Official Syllabus PDF Downloads | Skilldotpy"
        description="Download official NIELIT R5.1 Syllabus PDF for all 4 papers (M1-R5.1, M2-R5.1, M3-R5.1, M4-R5.1) and CCC. Complete marks weightage and topic outlines."
        canonicalUrl="/syllabus"
      />

      {/* =========================================================================
          SHORT MINIMAL HEADER
         ========================================================================= */}
      <section className="bg-slate-900 text-white py-2 sm:py-2.5 px-3 sm:px-6 border-b border-slate-800">
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
              NIELIT O Level & CCC Syllabus (R5.1)
            </h1>
            <p className="text-[11px] text-slate-400">
              आधिकारिक NIELIT R5.1 चारों पेपर्स एवं CCC का विस्तृत सिलेबस
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/downloads/o-level-r5-syllabus.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition-colors"
            >
              <Download className="w-3 h-3 text-white" />
              <span>O-Level PDF</span>
            </a>
            <a
              href="/downloads/ccc-syllabus.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] transition-colors"
            >
              <Download className="w-3 h-3 text-slate-950" />
              <span>CCC PDF</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SHORT PAPER BOXES
         ========================================================================= */}
      <main className="container mx-auto max-w-5xl px-3 sm:px-6 lg:px-8 mt-3 sm:mt-4">
        
        {/* 4 Short Paper Boxes */}
        <div className="space-y-2 sm:space-y-2.5">
          {syllabusCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.code}
                className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 transition-all"
              >
                {/* Paper Info - Only Paper Name, Code & Subtitle */}
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 shadow-2xs">
                    <Icon className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${card.badgeBg}`}>
                        {card.code}
                      </span>
                      <h2 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                        {card.title}
                      </h2>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                      {card.hindiTitle}
                    </p>
                  </div>
                </div>

                {/* Action Buttons - Very Minimal */}
                <div className="flex items-center gap-1.5 pt-1.5 sm:pt-0 border-t sm:border-t-0 border-slate-100 justify-end">
                  <a
                    href={card.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>PDF</span>
                  </a>
                  <Link
                    to={card.notesUrl}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-[#eab308] hover:bg-[#ca8a04] active:bg-[#a16207] text-slate-950 font-bold text-xs shadow-2xs transition-colors"
                  >
                    <span>Notes</span>
                  </Link>
                  <Link
                    to={card.mcqUrl}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition-colors"
                  >
                    <span>MCQs</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CCC Minimal Short Box */}
        <div className="mt-2.5 sm:mt-3 bg-gradient-to-r from-amber-50/80 to-orange-50/60 rounded-xl sm:rounded-2xl border border-amber-200/90 p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 shadow-2xs">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-2xs font-black text-xs">
              CCC
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded border bg-amber-100 text-amber-900 border-amber-300">
                  80-HOURS
                </span>
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  Course on Computer Concepts (CCC)
                </h2>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                कंप्यूटर अवधारणाओं पर पाठ्यक्रम (Full Syllabus)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 pt-1.5 sm:pt-0 border-t sm:border-t-0 border-amber-200/50 justify-end">
            <a
              href="/downloads/ccc-syllabus.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>PDF</span>
            </a>
            <Link
              to="/chapter-wise-notes/ccc"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-[#eab308] hover:bg-[#ca8a04] active:bg-[#a16207] text-slate-950 font-bold text-xs shadow-2xs transition-colors"
            >
              <span>Notes</span>
            </Link>
            <Link
              to="/chapter-wise-mcq/ccc"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-2xs transition-colors"
            >
              <span>MCQs</span>
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
