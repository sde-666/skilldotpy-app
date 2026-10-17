import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  FileText,
  CheckCircle2,
  Download,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { chapterMcqService } from '../services/chapterMcqService';
import { ChapterMeta, PaperMeta } from '../types/chapterMcq';

export function PaperNotesChaptersList() {
  const { moduleId = 'm1-r5' } = useParams<{ moduleId: string }>();
  const [paper, setPaper] = useState<PaperMeta | undefined>(undefined);
  const [chapters, setChapters] = useState<ChapterMeta[]>([]);

  useEffect(() => {
    const pMeta = chapterMcqService.getPaperMeta(moduleId);
    setPaper(pMeta);

    const chList = chapterMcqService.getModuleChapters(moduleId);
    setChapters(chList);
  }, [moduleId]);

  const displayTitle = paper ? paper.title : 'Information Technology Tools and Network Basics';
  const paperCode = paper?.code || moduleId.toUpperCase();

  const getNotesUrl = (chapNum: number) => {
    if (moduleId === 'ccc') {
      return `/notes/ccc/ccc-ch${chapNum}`;
    }
    const prefix = moduleId.replace('-r5', '');
    return `/notes/${moduleId}/${prefix}-ch${chapNum}`;
  };

  const getSyllabusPdf = () => {
    switch (moduleId) {
      case 'm1-r5': return '/downloads/m1-r5-syllabus.pdf';
      case 'm2-r5': return '/downloads/m2-r5-syllabus.pdf';
      case 'm3-r5': return '/downloads/m3-r5-syllabus.pdf';
      case 'm4-r5': return '/downloads/m4-r5-syllabus.pdf';
      case 'ccc': return '/downloads/ccc-syllabus.pdf';
      default: return '/downloads/o-level-r5-syllabus.pdf';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      <SEO
        title={`${displayTitle} - Chapter-Wise Study Notes | Skilldotpy`}
        description={`Read complete chapter-wise study notes for ${displayTitle}. Comprehensive bilingual notes, formulas, diagrams, and key definitions.`}
        canonicalUrl={`/chapter-wise-notes/${moduleId}`}
      />

      {/* =========================================================================
          MINIMAL APP-STYLE HEADER
         ========================================================================= */}
      <section className="bg-slate-900 text-white py-1.5 sm:py-2 px-3 sm:px-5 border-b border-slate-800">
        <div className="container mx-auto max-w-6xl flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <Link
              to="/chapter-wise-notes"
              className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
              title="Back to All Papers"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm font-bold text-white truncate">
                {paperCode}: {displayTitle}
              </h1>
              <p className="text-[10px] text-slate-400">
                {chapters.length} Chapters • Study Notes
              </p>
            </div>
          </div>

          <a
            href={getSyllabusPdf()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-slate-800 hover:bg-slate-700 border border-amber-400/30 px-2 py-1 rounded-md transition-colors shrink-0"
          >
            <Download className="w-3 h-3" />
            <span className="hidden sm:inline">Syllabus PDF</span>
          </a>
        </div>
      </section>

      {/* Chapters Container */}
      <div className="container mx-auto max-w-6xl px-2.5 sm:px-6 pt-2.5 sm:pt-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-6 lg:p-8">

          {/* 3-Column Chapter Grid matching ChapterWiseMcq UI */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {chapters.map((ch) => {
              const notesUrl = getNotesUrl(ch.chapterNumber);
              const mcqUrl = `/chapter-wise-mcq/${moduleId}/${ch.chapterNumber}`;

              return (
                <div
                  key={ch.chapterNumber}
                  className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Chapter Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug line-clamp-2 min-h-[3.2rem] group-hover:text-blue-700 transition-colors">
                      {ch.title}
                    </h3>

                    {/* Green Dot Indicator & Notes Status */}
                    <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-slate-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-2xs shrink-0"></span>
                      <span>Full Theory & Lecture Notes</span>
                    </div>
                  </div>

                  {/* Bottom Row: Chapter Number & Buttons */}
                  <div className="flex items-center justify-between pt-5 mt-4 border-t border-slate-100 gap-2">
                    <span className="text-xs font-medium text-slate-500">
                      Chapter {ch.chapterNumber}
                    </span>

                    <div className="flex items-center gap-2">
                      <Link
                        to={mcqUrl}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs shadow-2xs transition-colors"
                        title="Practice Chapter MCQs"
                      >
                        MCQs
                      </Link>
                      <Link
                        to={notesUrl}
                        className="px-4 py-2 rounded-lg bg-[#eab308] hover:bg-[#ca8a04] active:bg-[#a16207] text-slate-950 font-bold text-xs shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Read Notes</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Guide Strip */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              💡 <strong>Study Tip:</strong> Read through the lecture notes and diagrams before attempting the chapter-wise MCQs to maximize your score in the NIELIT exam.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to={`/chapter-wise-mcq/${moduleId}`}
                className="font-bold text-blue-600 hover:underline"
              >
                Practice All {chapters.length} Chapter MCQs →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
