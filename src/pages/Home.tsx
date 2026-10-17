import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Layers, 
  Globe, 
  Code, 
  Cpu, 
  ArrowRight, 
  ChevronRight, 
  Award,
  GraduationCap
} from 'lucide-react';
import { SEO } from '../components/SEO';

export function Home() {
  const oLevelModules = [
    {
      code: 'M1-R5',
      name: 'IT Tools & Network Basics',
      hindi: 'सूचना प्रौद्योगिकी उपकरण और नेटवर्क',
      icon: Layers,
      color: 'from-blue-600 to-indigo-600',
      notesHref: '/chapter-wise-notes/m1-r5',
      mcqHref: '/chapter-wise-mcq/m1-r5',
      chapters: '9 Chapters'
    },
    {
      code: 'M2-R5',
      name: 'Web Designing & Publishing',
      hindi: 'वेब डिजाइनिंग और प्रकाशन (HTML, CSS, JS)',
      icon: Globe,
      color: 'from-fuchsia-600 to-pink-600',
      notesHref: '/chapter-wise-notes/m2-r5',
      mcqHref: '/chapter-wise-mcq/m2-r5',
      chapters: '6 Chapters'
    },
    {
      code: 'M3-R5',
      name: 'Programming in Python',
      hindi: 'पायथन प्रोग्रामिंग (Data Types, Loops, Functions)',
      icon: Code,
      color: 'from-emerald-600 to-teal-600',
      notesHref: '/chapter-wise-notes/m3-r5',
      mcqHref: '/chapter-wise-mcq/m3-r5',
      chapters: '9 Chapters'
    },
    {
      code: 'M4-R5',
      name: 'Internet of Things (IoT)',
      hindi: 'इंटरनेट ऑफ थिंग्स और अनुप्रयोग (Arduino & Sensors)',
      icon: Cpu,
      color: 'from-amber-600 to-orange-600',
      notesHref: '/chapter-wise-notes/m4-r5',
      mcqHref: '/chapter-wise-mcq/m4-r5',
      chapters: '6 Chapters'
    },
    {
      code: 'CCC',
      name: 'Course on Computer Concepts',
      hindi: 'कंप्यूटर अवधारणाओं पर पाठ्यक्रम (80 Hours)',
      icon: Award,
      color: 'from-rose-600 to-red-600',
      notesHref: '/chapter-wise-notes',
      mcqHref: '/chapter-wise-mcq',
      chapters: 'Full Syllabus'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      <SEO 
        title="NIELIT O Level & CCC Free Notes, MCQs & Courses"
        description="Free NIELIT O Level (M1-R5 to M4-R5) & CCC exam preparation: Chapter notes, syllabus, CBT mock tests, video masterclasses and passing calculator."
      />

      {/* =========================================================================
          HERO SECTION - ORIGINAL SPACIOUS DESIGN (AS REQUESTED)
         ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eef4fe] via-[#f7faff] to-[#ffffff] text-slate-900 border-b border-slate-200/60 min-h-[calc(100vh-2.75rem)] min-h-[calc(100dvh-2.75rem)] flex flex-col justify-center">
        {/* Soft Background Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] sm:w-[900px] sm:h-[550px] bg-gradient-to-tr from-blue-300/20 via-indigo-300/15 to-purple-300/15 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute -bottom-10 left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-0" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl flex-1 flex flex-col justify-center py-10 sm:py-16">
          <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8 my-auto">
            
            {/* 1. EYEBROW TAG */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-blue-50/90 border border-blue-200/90 text-blue-800 text-xs sm:text-sm font-extrabold shadow-2xs">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>NIELIT O Level & CCC की तैयारी अब और आसान</span>
            </div>

            {/* 2. MAIN HERO HEADLINE */}
            <div className="space-y-1.5 sm:space-y-2.5 max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight leading-[1.12]">
                <span className="block text-slate-900">O Level और CCC में</span>
                <span className="block mt-1 sm:mt-2">
                  पाएं पहली बार में{' '}
                  <span className="relative inline-block text-[#e76767]">
                    100% सफलता
                    {/* Gradient underline curve */}
                    <svg
                      className="absolute -bottom-2 sm:-bottom-3 left-0 w-full overflow-visible"
                      height="10"
                      viewBox="0 0 200 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 6C60 1.5 140 1.5 198 6"
                        stroke="url(#hero-curve-gradient)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="hero-curve-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#2563eb" />
                          <stop offset="50%" stopColor="#4f46e5" />
                          <stop offset="100%" stopColor="#9333ea" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </span>
              </h1>
            </div>

            {/* 3. SUBHEADING */}
            <p className="text-sm sm:text-base md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal px-2">
              फ्री चैप्टर-वाइज़ नोट्स, टॉपिक MCQs प्रैक्टिस, ऑनलाइन CBT टेस्ट और रिजल्ट कैलकुलेटर के साथ करें अपनी तैयारी को स्मार्ट।
            </p>

            {/* 4. CALL TO ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto pt-2">
              <Link
                to="/chapter-wise-mcq"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-2xl font-extrabold text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-500/25 transition-all cursor-pointer group"
              >
                <span>MCQs प्रैक्टिस</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/chapter-wise-notes"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-2xl font-bold text-slate-800 hover:text-blue-700 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-300/80 shadow-2xs transition-all text-sm sm:text-base cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>O Level नोट्स</span>
              </Link>
              <Link
                to="/courses"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-2xl font-extrabold text-amber-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 active:scale-95 shadow-md shadow-amber-500/25 transition-all text-sm sm:text-base cursor-pointer"
              >
                <GraduationCap className="w-5 h-5 text-amber-950" />
                <span>Paid Courses</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          MODULE-WISE PREPARATION SECTION (CLEAN & DIRECT)
         ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 py-8 sm:py-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Module-Wise Preparation</h2>
            <p className="text-xs text-slate-500">Pick any paper to start notes reading or MCQs</p>
          </div>
          <Link to="/chapter-wise-notes" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          {oLevelModules.map((mod) => (
            <div 
              key={mod.code}
              className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr ${mod.color} text-white flex items-center justify-center shrink-0 font-black text-xs shadow-xs`}>
                  {mod.code}
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {mod.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                    {mod.hindi} • {mod.chapters}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <Link
                  to={mod.notesHref}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>Notes</span>
                </Link>
                <Link
                  to={mod.mcqHref}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>MCQs</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
