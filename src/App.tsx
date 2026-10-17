import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';

// Pages — lazy-loaded for fast startup
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const CCCHub = lazy(() => import('./pages/CCCHub').then(m => ({ default: m.CCCHub })));
const MockTest = lazy(() => import('./pages/MockTest').then(m => ({ default: m.MockTest })));
const McqLanding = lazy(() => import('./pages/McqLanding').then(m => ({ default: m.McqLanding })));
const ChapterWiseMcqHub = lazy(() => import('./pages/ChapterWiseMcqHub').then(m => ({ default: m.ChapterWiseMcqHub })));
const PaperChaptersList = lazy(() => import('./pages/PaperChaptersList').then(m => ({ default: m.PaperChaptersList })));
const ChapterMcqPractice = lazy(() => import('./pages/ChapterMcqPractice').then(m => ({ default: m.ChapterMcqPractice })));
const ChapterWiseNotesHub = lazy(() => import('./pages/ChapterWiseNotesHub').then(m => ({ default: m.ChapterWiseNotesHub })));
const PaperNotesChaptersList = lazy(() => import('./pages/PaperNotesChaptersList').then(m => ({ default: m.PaperNotesChaptersList })));
const SyllabusPage = lazy(() => import('./pages/SyllabusPage').then(m => ({ default: m.SyllabusPage })));
const NotesReader = lazy(() => import('./pages/NotesReader').then(m => ({ default: m.NotesReader })));
const OLevelResultCalculator = lazy(() => import('./pages/OLevelResultCalculator').then(m => ({ default: m.OLevelResultCalculator })));
const Courses = lazy(() => import('./pages/Courses').then(m => ({ default: m.Courses })));
const CourseDetail = lazy(() => import('./pages/CourseDetail').then(m => ({ default: m.CourseDetail })));
const MyCourses = lazy(() => import('./pages/MyCourses').then(m => ({ default: m.MyCourses })));
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const FAQ = lazy(() => import('./pages/FAQ').then(m => ({ default: m.FAQ })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const PrivacyPolicy = lazy(() => import('./pages/Legal').then(m => ({ default: m.PrivacyPolicy })));
const Terms = lazy(() => import('./pages/Legal').then(m => ({ default: m.Terms })));
const Disclaimer = lazy(() => import('./pages/Legal').then(m => ({ default: m.Disclaimer })));
const RefundPolicy = lazy(() => import('./pages/Legal').then(m => ({ default: m.RefundPolicy })));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then(m => ({ default: m.AdminLogin })));

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={
          <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <Routes>
            {/* Standalone Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Main App Layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              
              {/* 1. Chapter-Wise Notes */}
              <Route path="chapter-wise-notes" element={<ChapterWiseNotesHub />} />
              <Route path="chapter-wise-notes/:moduleId" element={<PaperNotesChaptersList />} />
              <Route path="o-level" element={<ChapterWiseNotesHub />} />
              <Route path="o-level/:moduleId" element={<PaperNotesChaptersList />} />
              <Route path="notes" element={<NotesReader />} />
              <Route path="notes/:courseId" element={<NotesReader />} />
              <Route path="notes/:courseId/:chapterId" element={<NotesReader />} />
              <Route path="notes/:courseId/:chapterId/:topicId" element={<NotesReader />} />

              {/* 2. Chapter-Wise MCQs */}
              <Route path="chapter-wise-mcq" element={<ChapterWiseMcqHub />} />
              <Route path="chapter-wise-mcq/:moduleId" element={<PaperChaptersList />} />
              <Route path="chapter-wise-mcq/:moduleId/:chapterNumber" element={<ChapterMcqPractice />} />
              <Route path="mcqs" element={<McqLanding />} />
              <Route path="mock-test" element={<MockTest />} />

              {/* 3. MCQ & Video Paid Courses */}
              <Route path="courses" element={<Courses />} />
              <Route path="courses/:courseId" element={<CourseDetail />} />
              <Route path="paid-courses" element={<Courses />} />
              <Route path="paid-courses/:courseId" element={<CourseDetail />} />
              <Route path="my-courses" element={<MyCourses />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Login />} />
              <Route path="student-login" element={<Login />} />

              {/* 4. Syllabus */}
              <Route path="syllabus" element={<SyllabusPage />} />
              <Route path="o-level-syllabus" element={<SyllabusPage />} />

              {/* 5. Result Calculator */}
              <Route path="o-level-result-calculator" element={<OLevelResultCalculator />} />
              <Route path="result-calculator" element={<OLevelResultCalculator />} />

              {/* CCC Module */}
              <Route path="ccc" element={<CCCHub />} />

              {/* Redirects for removed routes */}
              <Route path="app" element={<Navigate to="/" replace />} />
              <Route path="app/install" element={<Navigate to="/" replace />} />
              <Route path="app-download" element={<Navigate to="/" replace />} />
              <Route path="practical-practice" element={<Navigate to="/chapter-wise-mcq" replace />} />
              <Route path="practical-practice/:testId" element={<Navigate to="/chapter-wise-mcq" replace />} />
              <Route path="resources" element={<Navigate to="/chapter-wise-notes" replace />} />
              <Route path="resources/:categoryId" element={<Navigate to="/chapter-wise-notes" replace />} />

              {/* Info & Legal */}
              <Route path="faq" element={<FAQ />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-and-conditions" element={<Terms />} />
              <Route path="disclaimer" element={<Disclaimer />} />
              <Route path="refund-policy" element={<RefundPolicy />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
