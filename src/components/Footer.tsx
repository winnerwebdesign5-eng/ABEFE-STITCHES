import type { MouseEvent } from 'react';
import { Mail, Phone } from 'lucide-react';
import {
  BRAND_INFO,
  CONTACT_DETAILS,
  FOOTER_QUICK_LINKS,
  scrollToAnchor,
} from '../constants/brand';
import { LogoUploadSlot } from './LogoUploadSlot';
import { TikTokIcon, WhatsAppIcon } from './SocialIcons';

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleQuickLinkClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    onNavigate?.(sectionId);
    scrollToAnchor(sectionId);
  };

  return (
    <footer className="bg-[#301A16] text-[#F5EBDD]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-14 pb-10 lg:pt-16 lg:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column One — Brand Identity */}
          <div className="sm:col-span-2 lg:col-span-4 flex flex-col items-start gap-5">
            <div className="flex items-center gap-3.5">
              <LogoUploadSlot variant="footer" />
              <a
                href="#home"
                onClick={(e) => handleQuickLinkClick(e, 'home')}
                className="font-serif text-2xl sm:text-[26px] font-semibold tracking-[0.03em] text-[#D6BFA5] hover:text-[#F5EBDD] transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6BFA5] rounded-sm"
              >
                {BRAND_INFO.name}
              </a>
            </div>

            <p className="text-sm leading-relaxed text-[#F5EBDD]/85 max-w-sm">
              {BRAND_INFO.tagline}
            </p>
          </div>

          {/* Column Two — Quick Links */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-lg font-medium tracking-[0.04em] text-[#D6BFA5] mb-4">
              Quick Links
            </h2>
            <nav aria-label="Footer quick links">
              <ul className="flex flex-col gap-1.5">
                {FOOTER_QUICK_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      onClick={(e) => handleQuickLinkClick(e, link.id)}
                      className="inline-flex items-center min-h-[36px] text-sm text-[#F5EBDD]/85 hover:text-[#C6A66B] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6BFA5] rounded-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column Three — Contact Information */}
          <div className="lg:col-span-3">
            <h2 className="font-serif text-lg font-medium tracking-[0.04em] text-[#D6BFA5] mb-4">
              Contact Information
            </h2>
            <ul className="flex flex-col gap-3 text-sm text-[#F5EBDD]/85">
              <li>
                <span className="text-[#D6BFA5]/75">Brand: </span>
                <span className="text-[#F5EBDD] font-medium">{BRAND_INFO.displayName}</span>
              </li>

              <li>
                <a
                  href={CONTACT_DETAILS.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 min-h-[32px] hover:text-[#C6A66B] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6BFA5] rounded-sm"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#C6A66B] shrink-0" />
                  <span>
                    <span className="text-[#D6BFA5]/75">WhatsApp: </span>
                    <span className="tabular-nums">{CONTACT_DETAILS.whatsappDisplay}</span>
                  </span>
                </a>
              </li>

              <li>
                <a
                  href={CONTACT_DETAILS.phoneHref}
                  className="inline-flex items-center gap-2 min-h-[32px] hover:text-[#C6A66B] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6BFA5] rounded-sm"
                >
                  <Phone className="h-3.5 w-3.5 text-[#C6A66B] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  <span>
                    <span className="text-[#D6BFA5]/75">Phone: </span>
                    <span className="tabular-nums">{CONTACT_DETAILS.phoneDisplay}</span>
                  </span>
                </a>
              </li>

              <li>
                <a
                  href={CONTACT_DETAILS.emailHref}
                  className="inline-flex items-center gap-2 min-h-[32px] break-all hover:text-[#C6A66B] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6BFA5] rounded-sm"
                >
                  <Mail className="h-3.5 w-3.5 text-[#C6A66B] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  <span>
                    <span className="text-[#D6BFA5]/75">Email: </span>
                    <span>{CONTACT_DETAILS.emailDisplay}</span>
                  </span>
                </a>
              </li>

              <li>
                <a
                  href={CONTACT_DETAILS.tiktokHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 min-h-[32px] hover:text-[#C6A66B] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6BFA5] rounded-sm"
                >
                  <TikTokIcon className="h-4 w-4 text-[#C6A66B] shrink-0" />
                  <span>
                    <span className="text-[#D6BFA5]/75">TikTok: </span>
                    <span>{CONTACT_DETAILS.tiktokDisplay}</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column Four — Connect With Us */}
          <div className="lg:col-span-3">
            <h2 className="font-serif text-lg font-medium tracking-[0.04em] text-[#D6BFA5] mb-4">
              Connect With Us
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={CONTACT_DETAILS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Abefe Stitches on WhatsApp"
                className="group inline-flex items-center gap-2.5 min-h-[44px] px-4 py-2.5 rounded-sm border border-[#D6BFA5]/30 bg-[#F5EBDD]/[0.03] text-sm text-[#F5EBDD] hover:border-[#C6A66B] hover:bg-[#C6A66B]/15 hover:text-[#D6BFA5] hover:-translate-y-0.5 transition-[border-color,background-color,color,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6BFA5]"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#C6A66B] transition-transform duration-200 group-hover:scale-105" />
                <span className="font-medium tracking-[0.03em]">WhatsApp</span>
              </a>

              <a
                href={CONTACT_DETAILS.tiktokHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Abefe Stitches on TikTok"
                className="group inline-flex items-center gap-2.5 min-h-[44px] px-4 py-2.5 rounded-sm border border-[#D6BFA5]/30 bg-[#F5EBDD]/[0.03] text-sm text-[#F5EBDD] hover:border-[#C6A66B] hover:bg-[#C6A66B]/15 hover:text-[#D6BFA5] hover:-translate-y-0.5 transition-[border-color,background-color,color,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6BFA5]"
              >
                <TikTokIcon className="h-4 w-4 text-[#C6A66B] transition-transform duration-200 group-hover:scale-105" />
                <span className="font-medium tracking-[0.03em]">TikTok</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#D6BFA5]/25 flex items-center justify-center sm:justify-between">
          <p className="text-xs tracking-[0.06em] text-[#D6BFA5]/80">
            {BRAND_INFO.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
