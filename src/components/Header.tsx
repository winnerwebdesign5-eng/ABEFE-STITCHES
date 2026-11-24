import { useEffect, useState, type MouseEvent } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BRAND_INFO, HEADER_NAV_ITEMS, scrollToAnchor } from '../constants/brand';
import { LogoUploadSlot } from './LogoUploadSlot';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function Header({ activeSection, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    onNavigate(sectionId);
    scrollToAnchor(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-[background-color,box-shadow,border-color] duration-200 ${
        isScrolled
          ? 'bg-[#F5EBDD]/95 backdrop-blur-md border-b border-[#D6BFA5]/75 shadow-[0_6px_24px_-12px_rgba(48,26,22,0.16)]'
          : 'bg-[#F5EBDD] border-b border-[#D6BFA5]/45'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between md:gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
        {/* Left Section — Brand Identity */}
        <div className="flex items-center gap-3 shrink-0 lg:justify-self-start">
          <LogoUploadSlot variant="header" />
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="font-serif text-xl sm:text-2xl font-semibold tracking-[0.03em] text-[#301A16] hover:text-[#704638] transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#301A16] rounded-sm"
          >
            {BRAND_INFO.name}
          </a>
        </div>

        {/* Centre Section — Desktop Navigation Menu */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center md:gap-5 lg:gap-8 lg:justify-self-center"
        >
          {HEADER_NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative py-2 text-[13px] lg:text-sm font-medium tracking-[0.05em] whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#301A16] rounded-sm ${
                  isActive
                    ? 'text-[#301A16]'
                    : 'text-[#704638] hover:text-[#301A16]'
                }`}
              >
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0.5 h-[1.5px] bg-[#C6A66B] origin-center transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Right Section — Primary CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0 lg:justify-self-end">
          <a
            href="#booking"
            onClick={(e) => handleLinkClick(e, 'booking')}
            className="hidden md:inline-flex items-center justify-center rounded-sm bg-[#D6BFA5] px-4 lg:px-5 py-2.5 text-xs font-semibold tracking-[0.12em] uppercase text-[#301A16] hover:bg-[#C6A66B] active:translate-y-px transition-[background-color,transform] duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#301A16]"
          >
            BOOK A SERVICE
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded-sm text-[#301A16] hover:bg-[#D6BFA5]/35 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#301A16]"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-[#D6BFA5]/60 bg-[#F5EBDD] shadow-[0_14px_30px_-14px_rgba(48,26,22,0.18)]"
          >
            <nav
              aria-label="Mobile navigation"
              className="mx-auto max-w-7xl px-4 py-5 flex flex-col gap-1"
            >
              {HEADER_NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center justify-between min-h-[44px] px-3 rounded-sm text-sm font-medium tracking-[0.04em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#301A16] ${
                      isActive
                        ? 'text-[#301A16] bg-[#D6BFA5]/30'
                        : 'text-[#704638] hover:text-[#301A16] hover:bg-[#D6BFA5]/20'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="h-[1.5px] w-4 bg-[#C6A66B]"
                      />
                    )}
                  </a>
                );
              })}

              <div className="pt-4 mt-2 border-t border-[#D6BFA5]/50">
                <a
                  href="#booking"
                  onClick={(e) => handleLinkClick(e, 'booking')}
                  className="flex w-full min-h-[44px] items-center justify-center rounded-sm bg-[#D6BFA5] px-5 py-3 text-xs font-semibold tracking-[0.14em] uppercase text-[#301A16] hover:bg-[#C6A66B] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#301A16]"
                >
                  BOOK A SERVICE
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
