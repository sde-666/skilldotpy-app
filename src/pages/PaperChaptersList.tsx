import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowLeft, 
  BookOpen, 
  Sparkles,
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { chapterMcqService } from '../services/chapterMcqService';
import { ChapterMeta, PaperMeta } from '../types/chapterMcq';

export function PaperChaptersList() {
  const { moduleId = 'm1-r5' } = useParams<{ moduleId: string }>();
  const [paper, setPaper] = useState<PaperMeta | undefined>(undefined);
  const [chapters, setChapters] = useState<ChapterMeta[]>([]);
  const [chapterCounts, setChapterCounts] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const pMeta = chapterMcqService.getPaperMeta(moduleId);
    setPaper(pMeta);

    const chList = chapterMcqService.getModuleChapters(moduleId);
    setChapters(chList);

    const unsub = chapterMcqService.subscribe((items) => {
      const counts: { [key: number]: number } = {};
      items.filter(i => i.moduleId === moduleId).forEach((item) => {
        counts[item.chapterNumber] = (counts[item.chapterNumber] || 0) + 1;
      });
      setChapterCounts(counts);
      setChapters(chapterMcqService.getModuleChapters(moduleId));
      setPaper(chapterMcqService.getPaperMeta(moduleId));
    });

    return () => unsub();
  }, [moduleId]);

  const displayTitle = paper ? paper.title : 'Information Technology Tools and Network Basics';

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      <SEO
        title={`${displayTitle} - Chapter-Wise MCQs | Skilldotpy`}
        description={`Practice all chapter-wise MCQs for ${displayTitle}. Instant feedback, detailed explanations, and complete NIELIT R5.1 exam coverage.`}
        canonicalUrl={`/chapter-wise-mcq/${moduleId}`}
      />

      {/* =========================================================================
          MINIMAL APP-STYLE HEADER
         ========================================================================= */}
      <section className="bg-slate-900 text-white py-1.5 sm:py-2 px-3 sm:px-5 border-b border-slate-800">
        <div className="container mx-auto max-w-6xl flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <Link
              to="/chapter-wise-mcq"
              className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
              title="Back to All Papers"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm font-bold text-white truncate">
                {paper?.code || moduleId.toUpperCase()}: {displayTitle}
              </h1>
              <p className="text-[10px] text-slate-400">
                {chapters.length} Chapters • MCQs Practice
              </p>
            </div>
          </div>

          <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-md text-[11px] font-bold shrink-0">
            {paper?.code || moduleId.toUpperCase()}
          </span>
        </div>
      </section>

      {/* Chapters Container */}
      <div className="container mx-auto max-w-6xl px-2.5 sm:px-6 pt-2.5 sm:pt-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-6 lg:p-8">

          {/* 3-Column Chapter Grid matching Image 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {chapters.map((ch) => {
              const liveCount = chapterCounts[ch.chapterNumber] || 0;
              const displayCount = liveCount > 0 ? liveCount : ch.mcqCount;

              return (
                <div
                  key={ch.chapterNumber}
                  className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Chapter Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug line-clamp-2 min-h-[3.2rem]">
                      {ch.title}
                    </h3>

                    {/* Green Dot Indicator & MCQ Count */}
                    <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-slate-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-2xs shrink-0"></span>
                      <span>{displayCount} MCQs</span>
                    </div>
                  </div>

                  {/* Bottom Row: Chapter Number & "View MCQs" Teal Button */}
                  <div className="flex items-center justify-between pt-5 mt-4 border-t border-slate-100">
                    <span className="text-xs font-medium text-slate-500">
                      Chapter {ch.chapterNumber}
                    </span>

                    <Link
                      to={`/chapter-wise-mcq/${moduleId}/${ch.chapterNumber}`}
                      className="px-4 py-2 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] active:bg-[#075985] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                    >
                      View MCQs
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Guide Strip */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              💡 <strong>Practice Tip:</strong> Click "View MCQs" on any chapter to start instant practice. Each answer is verified in real-time with comprehensive explanations.
            </p>
            <Link
              to={paper?.id ? (paper.id === 'ccc' ? '/ccc' : `/o-level/${paper.id}`) : '/o-level'}
              className="font-bold text-blue-600 hover:underline shrink-0"
            >
              Read Full Syllabus & Guide →
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
