import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Award, 
  Search, 
  BookOpen, 
  ArrowRight, 
  Video, 
  FileText, 
  Sparkles, 
  Unlock, 
  Play, 
  GraduationCap,
  CheckCircle2,
  X
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { siteConfig } from '../data/config';
import { paidCourseService } from '../services/paidCourseService';
import { CourseItem, CourseChapter, CourseLesson } from '../types/paidCourse';
import { useAuth } from '../context/AuthContext';
import { ComingSoon } from '../components/ComingSoon';

export function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const [searchTerm, setSearchTerm] = useState('');
  
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [chapters, setChapters] = useState<CourseChapter[]>([]);
  const [lessons, setLessons] = useState<CourseLesson[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [isGlobalComingSoon, setIsGlobalComingSoon] = useState<boolean>(false);

  const { currentUser } = useAuth();

  useEffect(() => {
    const unsubCourses = paidCourseService.subscribeCourses((items) => {
      setCourses(items.filter(c => c.isPublished));
    });
    const unsubChapters = paidCourseService.subscribeChapters(setChapters);
    const unsubLessons = paidCourseService.subscribeLessons(setLessons);
    const unsubComingSoon = paidCourseService.subscribeComingSoon(setIsGlobalComingSoon);
    const unsubEnrollments = paidCourseService.subscribeEnrollments(setEnrollments);

    return () => {
      unsubCourses();
      unsubChapters();
      unsubLessons();
      unsubComingSoon();
      unsubEnrollments();
    };
  }, []);

  const categories = [
    { id: 'all', label: 'All Courses' },
    { id: 'm3', label: 'M3-R5 (Python)' },
    { id: 'm1', label: 'M1-R5 (IT Tools)' },
    { id: 'm2', label: 'M2-R5 (Web Design)' },
    { id: 'm4', label: 'M4-R5 (IoT)' },
    { id: 'ccc', label: 'CCC Exam' },
    { id: 'combo', label: 'Combo Batches' },
  ];

  const filteredCourses = courses.filter((c) => {
    const matchesCategory = activeCategory === 'all' || c.category === activeCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.hindiTitle && c.hindiTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      c.overview.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const myEnrollments = enrollments.filter(e => 
    e.userId === currentUser?.uid || (currentUser?.email && e.userEmail === currentUser?.email)
  );

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: courses.map((course, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Course',
        name: course.title,
        description: course.overview,
        provider: {
          '@type': 'Organization',
          name: siteConfig.name,
          sameAs: siteConfig.url
        }
      }
    }))
  };

  if (isGlobalComingSoon) {
    return <ComingSoon isAllCourses />;
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-16 pt-2 sm:pt-4">
      <SEO
        title="O Level Paid Courses & Video Master Batches (M1, M2, M3, M4) | Skilldotpy"
        description="Join NIELIT O Level paid video courses & master batches. Complete theory, chapter-wise notes, test series, practical lab sessions & 2 free demo lectures per module."
        canonicalUrl="/courses"
        keywords={[
          'o level paid course',
          'o level paid batch in hindi',
          'nielit o level video course',
          'o level complete master batch m1 m2 m3 m4',
          'o level python paid course',
          'ccc masterclass video batch',
          'skilldotpy paid courses'
        ]}
        schema={courseSchema}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Paid Courses', url: '/courses' }
        ]}
      />

      <div className="container mx-auto px-3 sm:px-6 lg:px-8 space-y-3.5 sm:space-y-5">
        
        {/* Page Header - Mobile-First & Compact */}
        <div className="max-w-3xl mx-auto text-center space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-200">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              <span>NIELIT O Level & CCC Target Batches</span>
            </span>

            {myEnrollments.length > 0 && (
              <Link
                to="/my-courses"
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>My Courses ({myEnrollments.length})</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Paid Courses & Video Batches
          </h1>
          
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Sequential video lectures, bilingual handwritten PDF notes, solved practical lab codes, and instant test papers.
          </p>

          <div className="inline-flex items-center gap-1.5 py-1 px-3 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 text-[11px] font-bold">
            <Unlock className="w-3.5 h-3.5 text-emerald-600" />
            <span>First 2 Lectures & 2 PDFs Free for All Students</span>
          </div>
        </div>

        {/* Mobile-Optimized Search & Filter Bar */}
        <div className="max-w-4xl mx-auto space-y-2.5">
          {/* Search Input with Clear Button */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search courses (e.g. Python, M1-R5, Web Design, CCC)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 shadow-2xs font-medium"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Smooth Horizontal Category Tab Strip for Mobile */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0 sm:flex-wrap">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    if (cat.id === 'all') {
                      searchParams.delete('category');
                      setSearchParams(searchParams);
                    } else {
                      setSearchParams({ category: cat.id });
                    }
                  }}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-500">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-800">No courses found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search terms or selecting "All Courses".
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                searchParams.delete('category');
                setSearchParams(searchParams);
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Courses Grid - Mobile First Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {filteredCourses.map((course) => {
            const courseLessons = lessons.filter(l => l.courseId === course.id);
            const courseChapters = chapters.filter(c => c.courseId === course.id);
            const isEnrolled = paidCourseService.isUserEnrolled(currentUser?.uid, course.id, currentUser?.email);

            const discountPercent = course.originalPrice > course.price 
              ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100) 
              : 0;

            return (
              <div 
                key={course.id}
                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Thumbnail & Badges */}
                <div className="relative aspect-video sm:aspect-16/10 overflow-hidden bg-gradient-to-tr from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center">
                  {course.thumbnailUrl && !course.thumbnailUrl.includes('unsplash.com') ? (
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950">
                      <GraduationCap className="w-9 h-9 text-amber-400 mb-1 opacity-90" />
                      <span className="text-sm font-bold text-white tracking-tight line-clamp-1">{course.title}</span>
                      <span className="text-[10px] text-blue-200 mt-0.5">{course.category.toUpperCase()} • Comprehensive Batch</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category & Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-600 text-white shadow-xs">
                      {course.category.toUpperCase()}
                    </span>
                    {course.isComingSoon ? (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 shadow-xs">
                        Coming Soon
                      </span>
                    ) : course.badge ? (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 shadow-xs">
                        {course.badge}
                      </span>
                    ) : null}
                  </div>

                  {/* Free Demo Tag */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-white">
                    <span className="inline-flex items-center gap-1 bg-emerald-600/95 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-2xs">
                      <Unlock className="w-3 h-3" />
                      <span>2 Free Demo Lessons</span>
                    </span>
                    {course.duration && (
                      <span className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md font-mono">
                        {course.duration}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h2 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                      {course.title}
                    </h2>
                    
                    {course.hindiTitle && (
                      <p className="text-[11px] sm:text-xs font-semibold text-slate-500 line-clamp-1">
                        {course.hindiTitle}
                      </p>
                    )}

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-0.5">
                      {course.overview}
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 pt-2.5 border-t border-slate-100 text-[11px] sm:text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{courseChapters.length || course.chaptersCount || 6} Chapters & {courseLessons.length || course.lecturesCount || 18} Video Classes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Handwritten Theory & Formula PDF Notes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Solved Lab Practical Codes & CBT MCQs</span>
                    </div>
                  </div>

                  {/* Pricing & CTA - Optimized for Touch */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl sm:text-2xl font-black text-slate-900">
                          ₹{course.price}
                        </span>
                        {course.originalPrice > course.price && (
                          <span className="text-[11px] sm:text-xs font-bold text-slate-400 line-through">
                            ₹{course.originalPrice}
                          </span>
                        )}
                      </div>
                      {discountPercent > 0 && (
                        <span className="text-[10px] font-black text-emerald-600 uppercase block">
                          {discountPercent}% OFF Special Offer
                        </span>
                      )}
                    </div>

                    <Link
                      to={`/courses/${course.id}`}
                      className={`min-h-[40px] px-3.5 sm:px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer ${
                        isEnrolled
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                      }`}
                    >
                      {isEnrolled ? (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Watch Course</span>
                        </>
                      ) : (
                        <>
                          <span>Demo & Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

