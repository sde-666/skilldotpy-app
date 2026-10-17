import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Check,
  Play, 
  Lock, 
  Unlock, 
  FileText, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Download, 
  ExternalLink,
  Users,
  Award,
  Video,
  Layers,
  GraduationCap,
  AlertCircle,
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Share2,
  BookOpen,
  MessageCircle,
  HelpCircle,
  FileCheck,
  Calendar,
  Eye,
  CheckCircle,
  Maximize2,
  Minimize2,
  RotateCw,
  FolderOpen,
  Globe
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Button } from '../components/Button';
import { paidCourseService, extractYouTubeVideoId } from '../services/paidCourseService';
import { CourseItem, CourseChapter, CourseLesson } from '../types/paidCourse';
import { useAuth } from '../context/AuthContext';
import { StudentAuthModal } from '../components/auth/StudentAuthModal';
import { ComingSoon } from '../components/ComingSoon';

export function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const [course, setCourse] = useState<CourseItem | null>(null);
  const [chapters, setChapters] = useState<CourseChapter[]>([]);
  const [lessons, setLessons] = useState<CourseLesson[]>([]);
  const [isGlobalComingSoon, setIsGlobalComingSoon] = useState<boolean>(false);
  
  // Active selection
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'chapters' | 'study-material'>('chapters');
  const [selectedLesson, setSelectedLesson] = useState<CourseLesson | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'lectures' | 'notes' | 'dpp'>('all');
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  
  // Full-Screen Video Player State (Mobile landscape aware)
  const [isFullScreenVideoOpen, setIsFullScreenVideoOpen] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Chapter Notes Modal State (Triggered when user clicks "Notes & more")
  
  // Auth & Enrollment State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRedirectNotice, setAuthRedirectNotice] = useState('Please sign in or create an account to access courses.');
  const [isPurchaseWebsiteModalOpen, setIsPurchaseWebsiteModalOpen] = useState(false);
  const [isSyncingEnrollment, setIsSyncingEnrollment] = useState(false);
  const [enrollmentSuccessToast, setEnrollmentSuccessToast] = useState(false);
  const [enrollments, setEnrollments] = useState<any[]>([]);

  const { currentUser, userProfile } = useAuth();

  // Load completed lessons from localStorage
  useEffect(() => {
    if (courseId) {
      const saved = localStorage.getItem(`completed_lessons_${courseId}`);
      if (saved) {
        try {
          setCompletedLessonIds(JSON.parse(saved));
        } catch (e) {
          console.warn('Failed to parse completed lessons', e);
        }
      }
    }
  }, [courseId]);

  // Subscribe to real-time course data
  useEffect(() => {
    if (!courseId) return;

    const unsubCourses = paidCourseService.subscribeCourses((cList) => {
      const found = cList.find(c => c.id === courseId);
      if (found) setCourse(found);
    });

    const unsubChapters = paidCourseService.subscribeChapters((chList) => {
      const filtered = chList.filter(ch => ch.courseId === courseId);
      const sorted = filtered.sort((a, b) => a.chapterNumber - b.chapterNumber);
      setChapters(sorted);
    });

    const unsubLessons = paidCourseService.subscribeLessons((lList) => {
      const filtered = lList.filter(l => l.courseId === courseId);
      const sorted = filtered.sort((a, b) => {
        if (a.chapterNumber !== b.chapterNumber) return a.chapterNumber - b.chapterNumber;
        return a.lessonNumber - b.lessonNumber;
      });
      setLessons(sorted);
    });

    const unsubComingSoon = paidCourseService.subscribeComingSoon(setIsGlobalComingSoon);
    const unsubEnrollments = paidCourseService.subscribeEnrollments(setEnrollments);

    return () => {
      unsubCourses();
      unsubChapters();
      unsubLessons();
      unsubComingSoon();
      unsubEnrollments();
    };
  }, [courseId, selectedChapterId]);

  // Check if current user is enrolled
  const isEnrolled = paidCourseService.isUserEnrolled(
    currentUser?.uid,
    courseId || '',
    currentUser?.email
  );

  // Close full screen on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullScreenVideoOpen) {
        closeFullScreenVideo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreenVideoOpen]);

  if (isGlobalComingSoon || (course && course.isComingSoon)) {
    return (
      <ComingSoon
        courseTitle={course?.title}
        courseCategory={course?.category}
        badge={course?.badge || 'Coming Soon'}
        teacherName={course?.teacherName || 'Er. Aditya Pathak'}
      />
    );
  }

  if (!course) {
    return (
      <div className="bg-slate-50 min-h-screen py-24">
        <div className="container mx-auto px-4 max-w-md text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mx-auto">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">Course Not Found</h1>
          <p className="text-xs text-slate-600">The requested course batch might have been moved or is temporarily unavailable.</p>
          <Link to="/courses" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            <span>Browse All Courses</span>
          </Link>
        </div>
      </div>
    );
  }

  // Freemium Logic: First 2 lessons of the course or lessons marked as isFreePreview are accessible to EVERYONE.
  const isLessonUnlocked = (lesson: CourseLesson, index: number): boolean => {
    if (isEnrolled) return true;
    if (lesson.isFreePreview) return true;
    if (index < 2) return true; // First 2 lessons free rule
    return false;
  };

  const toggleLessonCompleted = (lessonId: string) => {
    setCompletedLessonIds(prev => {
      let updated: string[];
      if (prev.includes(lessonId)) {
        updated = prev.filter(id => id !== lessonId);
      } else {
        updated = [...prev, lessonId];
      }
      if (courseId) {
        localStorage.setItem(`completed_lessons_${courseId}`, JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Trigger Full Screen Video Playback with Mobile Landscape Orientation
  const handleWatchLessonFullScreen = (lesson: CourseLesson, index: number) => {
    const unlocked = isLessonUnlocked(lesson, index);
    setSelectedLesson(lesson);
    setIsFullScreenVideoOpen(true);
    setIsSidebarOpenMobile(false);

    if (!unlocked && !currentUser) {
      setAuthRedirectNotice('This is a premium lecture. Please Sign In or Create an Account to unlock.');
      setIsAuthModalOpen(true);
      return;
    }

    // Try request browser fullscreen and lock orientation to landscape on mobile if supported
    setTimeout(() => {
      try {
        const el = videoContainerRef.current;
        if (el) {
          if (el.requestFullscreen) {
            el.requestFullscreen().catch(() => {});
          } else if ((el as any).webkitRequestFullscreen) {
            (el as any).webkitRequestFullscreen();
          }
        }
        // Lock screen orientation to landscape on mobile devices
        if (screen.orientation && (screen.orientation as any).lock) {
          (screen.orientation as any).lock('landscape').catch(() => {});
        }
      } catch (err) {
        console.log('Fullscreen/Orientation request bypassed');
      }
    }, 100);
  };

  const closeFullScreenVideo = () => {
    setIsFullScreenVideoOpen(false);
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      if (screen.orientation && (screen.orientation as any).unlock) {
        (screen.orientation as any).unlock();
      }
    } catch (e) {
      // ignore
    }
  };


  const handleEnrollClick = () => {
    if (!currentUser) {
      setAuthRedirectNotice(`Please Sign In to access your courses or verify your purchase.`);
      setIsAuthModalOpen(true);
      return;
    }

    setIsPurchaseWebsiteModalOpen(true);
  };

  const handleSyncEnrollment = () => {
    setIsSyncingEnrollment(true);
    setTimeout(() => {
      const enrolledNow = paidCourseService.isUserEnrolled(currentUser?.uid, courseId || '', currentUser?.email);
      if (enrolledNow) {
        setIsPurchaseWebsiteModalOpen(false);
        setEnrollmentSuccessToast(true);
        setTimeout(() => setEnrollmentSuccessToast(false), 5000);
      } else {
        alert('No enrollment found yet for ' + (currentUser?.email || 'this account') + '. Please complete your purchase on skilldotpy.com first, then click refresh.');
      }
      setIsSyncingEnrollment(false);
    }, 500);
  };

  // Selected chapter object
  const activeChapter = chapters.find(c => c.id === selectedChapterId) || chapters[0];
  const activeChapterLessons = lessons.filter(l => l.chapterId === activeChapter?.id || l.chapterNumber === activeChapter?.chapterNumber);

  // Active Lesson calculation
  const activeVideoId = selectedLesson?.videoId || extractYouTubeVideoId(selectedLesson?.youtubeUrl || '');
  const activeLessonIndex = selectedLesson ? lessons.findIndex(l => l.id === selectedLesson.id) : 0;
  const isSelectedLessonUnlocked = selectedLesson ? isLessonUnlocked(selectedLesson, activeLessonIndex) : true;

  // Filter lessons in active chapter based on PW tabs (All, Lectures, Notes, DPPs)
  const displayedLessons = activeChapterLessons.filter(l => {
    if (filterType === 'lectures') return true;
    if (filterType === 'notes') return Boolean(l.pdfUrl);
    if (filterType === 'dpp') return true;
    return true; // 'all'
  });

  // Notes uploaded in this chapter by admin
  const activeChapterNotes = activeChapterLessons.filter(l => Boolean(l.pdfUrl));

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 antialiased">
      <SEO
        title={`${course.title} - Video Lectures, DPPs & Handwritten Notes | Skilldotpy`}
        description={course.overview}
        keywords={[
          course.title,
          `${course.category.toUpperCase()} video batch`,
          'NIELIT O Level online course hindi',
          'Skilldotpy paid courses'
        ]}
      />

      {/* Success Notification Toast */}
      {enrollmentSuccessToast && (
        <div className="fixed top-20 right-6 z-50 animate-bounce">
          <div className="p-4 bg-emerald-600 border border-emerald-500 rounded-2xl shadow-xl flex items-center gap-3 text-white text-xs font-bold">
            <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
            <div>
              <p className="font-extrabold text-white">Enrollment Successful!</p>
              <p className="text-[11px] text-emerald-100">All video lectures and PDF study materials are now unlocked.</p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MINIMAL APP-STYLE HEADER
         ========================================================================= */}
      <section className="bg-slate-900 text-white py-2 sm:py-2.5 px-3 sm:px-6 border-b border-slate-800">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-sm sm:text-base font-bold tracking-tight text-white line-clamp-1">
              {course.title}
            </h1>
            {course.hindiTitle && (
              <p className="text-[11px] text-slate-400 font-medium line-clamp-1">
                {course.hindiTitle}
              </p>
            )}
          </div>

          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 shrink-0 font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/courses" className="hover:text-white transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-slate-300 font-bold">{course.category.toUpperCase()}</span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container mx-auto max-w-6xl px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-6 lg:p-8">
          
          {/* Back & Switcher Bar matching PaperChaptersList */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 flex-wrap gap-3">
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Courses
            </Link>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <span>Course:</span>
              <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-0.5 rounded border border-blue-100">
                {course.category.toUpperCase()}
              </span>
              <span>• {chapters.length} Chapters</span>
              <span>• {lessons.length} Lectures</span>

              {isEnrolled ? (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded font-bold text-xs ml-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Enrolled</span>
                </span>
              ) : (
                <button
                  onClick={handleEnrollClick}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer ml-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-300" />
                  <span>Purchase on Website</span>
                </button>
              )}
            </div>
          </div>

          {!selectedChapterId ? (
            /* 3-Column Chapter Grid matching PaperChaptersList */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {chapters.map((chapter) => {
                const chLessonsOk = lessons.filter(l => l.chapterId === chapter.id || l.chapterNumber === chapter.chapterNumber);
                const chNotesOknest = chLessonsOk.filter(l => Boolean(l.pdfUrl));

                return (
                  <div
                    key={chapter.id}
                    className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Chapter Title */}
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug line-clamp-2 min-h-[3.2rem]">
                        {chapter.title}
                      </h3>

                      {/* Green Dot Indicator & Lecture Count */}
                      <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-slate-700">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-2xs shrink-0"></span>
                        <span>{chLessonsOk.length} Video Lectures {chNotesOknest.length > 0 ? `• ${chNotesOknest.length} Notes PDF` : ''}</span>
                      </div>
                    </div>

                    {/* Bottom Row: Chapter Number & "View Lectures" Teal Button */}
                    <div className="flex items-center justify-between pt-5 mt-4 border-t border-slate-100">
                      <span className="text-xs font-medium text-slate-500">
                        Chapter {chapter.chapterNumber}
                      </span>

                      <button
                        onClick={() => setSelectedChapterId(chapter.id)}
                        className="px-4 py-2 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] active:bg-[#075985] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                      >
                        View Lectures
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Chapter Lectures View */
            <div className="space-y-6">
              {/* Back button and Chapter Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-3">
                <button 
                  onClick={() => setSelectedChapterId(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Chapters</span>
                </button>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-0.5 rounded border border-blue-100 uppercase">
                    Chapter {activeChapter?.chapterNumber}
                  </span>
                  <span>• {activeChapterLessons.length} Lectures</span>
                </div>
              </div>

              {/* 3-Column Lecture Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {activeChapterLessons.length === 0 ? (
                  <div className="col-span-full bg-slate-50 rounded-2xl p-12 text-center border border-slate-200 space-y-3">
                    <Video className="w-10 h-10 text-slate-400 mx-auto" />
                    <h3 className="text-sm font-bold text-slate-800">No lectures found for this chapter</h3>
                    <p className="text-xs text-slate-500">Lectures will be uploaded soon by the instructor.</p>
                  </div>
                ) : (
                  activeChapterLessons.map((lesson, idx) => {
                    const globalIdx = lessons.findIndex(l => l.id === lesson.id);
                    const unlocked = isLessonUnlocked(lesson, globalIdx);
                    const isCompletedEffective = completedLessonIds.includes(lesson.id);
                    const isFree = lesson.isFreePreview || globalIdx < 2;

                    return (
                      <div
                        key={lesson.id}
                        className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
                      >
                        <div>
                          {/* Header: Lecture Number & Clear Status Tag */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="text-xs font-medium text-slate-500">
                              Lecture {lesson.lessonNumber || idx + 1}
                            </span>

                            {isFree ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                                <Play className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                                <span>Free Demo</span>
                              </span>
                            ) : isEnrolled ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                                <CheckCircle className="w-3 h-3 text-emerald-600" />
                                <span>Unlocked</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                                <Lock className="w-3 h-3 text-amber-600" />
                                <span>Paid / Locked</span>
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 
                            onClick={() => handleWatchLessonFullScreen(lesson, globalIdx)}
                            className="text-base font-bold text-slate-900 leading-snug line-clamp-2 min-h-[3rem] group-hover:text-blue-600 transition-colors cursor-pointer"
                          >
                            {lesson.title}
                          </h3>

                          {lesson.hindiTitle && (
                            <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-1">
                              {lesson.hindiTitle}
                            </p>
                          )}

                          {/* Green Dot Indicator & Duration / Notes */}
                          <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-slate-700">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-2xs shrink-0"></span>
                            <span>{lesson.duration || 'Full Video Class'} {lesson.pdfUrl ? '• PDF Notes Included' : ''}</span>
                          </div>
                        </div>

                        {/* Bottom Actions Row */}
                        <div className="flex items-center justify-between pt-5 mt-4 border-t border-slate-100 gap-2">
                          <div className="flex items-center gap-2">
                            {unlocked ? (
                              <button
                                onClick={() => handleWatchLessonFullScreen(lesson, globalIdx)}
                                className="px-4 py-2 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] active:bg-[#075985] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                              >
                                <Play className="w-3.5 h-3.5 fill-current" />
                                <span>{isCompletedEffective ? 'Resume' : 'Watch'}</span>
                              </button>
                            ) : (
                              <button
                                onClick={handleEnrollClick}
                                className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                              >
                                <Lock className="w-3.5 h-3.5" />
                                <span>Unlock on Website</span>
                              </button>
                            )}

                            {lesson.pdfUrl && (
                              unlocked ? (
                                <a
                                  href={lesson.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                                  title="Download Attached Notes"
                                >
                                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                                  <span>Notes</span>
                                </a>
                              ) : (
                                <button
                                  onClick={handleEnrollClick}
                                  className="px-2.5 py-2 rounded-lg bg-slate-100 text-slate-400 font-bold text-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                                  title="Enroll to unlock Notes"
                                >
                                  <Lock className="w-3.5 h-3.5 text-amber-500" />
                                  <span>Notes</span>
                                </button>
                              )
                            )}
                          </div>

                          <button 
                            onClick={() => toggleLessonCompleted(lesson.id)}
                            className={`p-2 rounded-lg transition-colors shrink-0 cursor-pointer ${isCompletedEffective ? 'text-emerald-600 bg-emerald-50 border border-emerald-200' : 'text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200'}`}
                            title={isCompletedEffective ? 'Completed' : 'Mark as Completed'}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Bottom Guide Strip matching ChapterWiseMCQ / Notes */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              💡 <strong>Learning Tip:</strong> Watch lectures sequentially. Free demo lectures are available for everyone; full access requires course enrollment.
            </p>
            <Link
              to="/courses"
              className="font-bold text-blue-600 hover:underline shrink-0"
            >
              Explore All Batches →
            </Link>
          </div>

        </div>
      </div>

      {/* =========================================================================
          MODAL 1: FULL SCREEN VIDEO PLAYER (WITH AUTO-LANDSCAPE SUPPORT ON MOBILE)
         ========================================================================= */}
      {isFullScreenVideoOpen && selectedLesson && (
        <div 
          ref={videoContainerRef}
          className="fixed inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden animate-in fade-in duration-200"
          style={{ width: '100vw', height: '100vh' }}
        >
          {/* Top Bar with Video Info & Close Controls */}
          <div className="bg-gradient-to-b from-black/90 via-black/50 to-transparent p-4 sm:p-5 flex items-center justify-between z-20 text-white">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={closeFullScreenVideo}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
                title="Back / Close Fullscreen"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white uppercase">
                    Chapter {activeChapter?.chapterNumber || 1}
                  </span>
                  <h3 className="text-xs sm:text-sm font-extrabold truncate text-white">
                    {selectedLesson.title}
                  </h3>
                </div>
                {selectedLesson.hindiTitle && (
                  <p className="text-[11px] text-slate-300 truncate hidden sm:block">
                    {selectedLesson.hindiTitle}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => toggleLessonCompleted(selectedLesson.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  completedLessonIds.includes(selectedLesson.id)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {completedLessonIds.includes(selectedLesson.id) ? 'Completed' : 'Mark Done'}
                </span>
              </button>

              <button
                onClick={closeFullScreenVideo}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close Full Screen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Video Center Stage (Takes maximum screen area) */}
          <div className="flex-1 w-full h-full relative flex items-center justify-center bg-black">
            {isSelectedLessonUnlocked && activeVideoId ? (
              <iframe
                className="w-full h-full border-0 absolute inset-0"
                src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1&playsinline=1`}
                title={selectedLesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
              />
            ) : (
              /* Premium Freemium Lock Overlay */
              <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-slate-950 to-blue-950 flex flex-col items-center justify-center p-6 text-center space-y-4 text-white">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-2xl">
                  <Lock className="w-8 h-8" />
                </div>
                <div className="max-w-md space-y-2">
                  <h4 className="text-lg sm:text-xl font-bold">This Lecture is Locked</h4>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Enroll in <strong>{course.title}</strong> to unlock all recorded video lectures, handwritten notes, and WhatsApp mentorship.
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeFullScreenVideo();
                    handleEnrollClick();
                  }}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-black shadow-xl shadow-blue-500/30 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Globe className="w-4 h-4 text-amber-300" />
                  <span>Purchase on skilldotpy.com</span>
                </button>
              </div>
            )}
          </div>

          {/* Bottom Bar: Attached Chapter Notes Download Link */}
          {selectedLesson.pdfUrl && (
            <div className="bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 sm:p-4 flex items-center justify-between z-20 text-white">
              <div className="flex items-center gap-2 text-xs">
                <FileText className="w-4 h-4 text-amber-400" />
                <span className="text-slate-200 font-medium truncate">
                  {selectedLesson.pdfTitle || `${selectedLesson.title} Notes`}
                </span>
              </div>
              <a
                href={selectedLesson.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Notes</span>
              </a>
            </div>
          )}
        </div>
      )}

      {/* Purchase on Official Website Modal */}
      {isPurchaseWebsiteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative text-center space-y-4">
            <button
              onClick={() => setIsPurchaseWebsiteModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto shadow-xs">
              <Globe className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Website Exclusive Enrollment
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">
                Purchase on skilldotpy.com
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                To study this full course, please purchase it on our official website. Once enrolled, you can access and study all lectures, notes & materials right here in this app!
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-2 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                <span>Visit <strong>skilldotpy.com</strong> on your mobile browser or PC.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                <span>Enroll in <strong>{course.title}</strong> using your account: <br /><strong className="text-blue-700 font-mono text-[11px]">{currentUser?.email || 'your registered email'}</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                <span>Return to this app — all lectures, handwritten notes, and tests will unlock automatically!</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={`https://skilldotpy.com/courses/${course.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open skilldotpy.com to Purchase</span>
              </a>

              <button
                type="button"
                onClick={handleSyncEnrollment}
                disabled={isSyncingEnrollment}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
              >
                {isSyncingEnrollment ? (
                  <span>Checking Enrollment Status...</span>
                ) : (
                  <span>Already Purchased on Website? Refresh Access</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Auth Modal */}
      <StudentAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        redirectNotice={authRedirectNotice}
      />

    </div>
  );
}
