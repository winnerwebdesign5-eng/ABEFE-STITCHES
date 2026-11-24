export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const HEADER_NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About Us', href: '#about' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'gallery', label: 'Gallery', href: '#gallery' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const FOOTER_QUICK_LINKS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About Us', href: '#about' },
  { id: 'services', label: 'Our Services', href: '#services' },
  { id: 'gallery', label: 'Gallery', href: '#gallery' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const BRAND_INFO = {
  name: 'abefe stitches',
  displayName: 'Abefe Stitches',
  tagline:
    'Thoughtfully crafted fashion, beautifully tailored to express your unique style. Discover the art of dressing with Abefe Stitches.',
  copyright: '© 2026 Abefe Stitches. All Rights Reserved.',
} as const;

export const CONTACT_DETAILS = {
  phoneDisplay: '08060614511',
  phoneHref: 'tel:+2348060614511',
  whatsappDisplay: '08060614511',
  whatsappHref: 'https://wa.me/2348060614511',
  emailDisplay: 'Mudasirumujeeb6@gmail.com',
  emailHref: 'mailto:Mudasirumujeeb6@gmail.com',
  tiktokDisplay: '@abefe807',
  tiktokHref: 'https://www.tiktok.com/@abefe807',
} as const;

export function scrollToAnchor(targetId: string): void {
  const cleanId = targetId.replace(/^#/, '');
  const element = document.getElementById(cleanId);
  if (element) {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    element.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
    if (window.location.hash !== `#${cleanId}`) {
      window.history.replaceState(null, '', `#${cleanId}`);
    }
  }
}
