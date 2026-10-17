import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, CheckCircle2, GraduationCap, FileText } from 'lucide-react';

export function BottomMobileBar() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', icon: Home, exact: true },
    { label: 'Notes', path: '/chapter-wise-notes', altPaths: ['/notes', '/o-level'], icon: BookOpen },
    { label: 'MCQs', path: '/chapter-wise-mcq', altPaths: ['/mcqs', '/mock-test'], icon: CheckCircle2 },
    { label: 'Syllabus', path: '/syllabus', icon: FileText },
    { label: 'Paid Courses', path: '/courses', altPaths: ['/paid-courses', '/my-courses'], icon: GraduationCap },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation Bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-1 py-1 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] select-none safe-area-inset-bottom"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = item.exact
            ? location.pathname === '/'
            : location.pathname.startsWith(item.path) ||
              (item.altPaths && item.altPaths.some(p => location.pathname.startsWith(p)));
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative ${
                isActive
                  ? 'text-blue-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {isActive && (
                <span className="absolute -top-1 w-6 h-0.5 bg-blue-600 rounded-full" />
              )}
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px] scale-105 text-blue-600' : 'stroke-[1.8px]'}`} />
              <span className={`text-[10px] mt-0.5 tracking-tight whitespace-nowrap ${isActive ? 'font-bold text-blue-600' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
