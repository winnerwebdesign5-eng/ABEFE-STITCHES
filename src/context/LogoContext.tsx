import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

interface LogoContextValue {
  logoDataUrl: string | null;
  uploadError: string | null;
  uploadLogoFile: (file: File) => void;
  clearLogo: () => void;
}

const STORAGE_KEY = 'abefe_stitches_brand_logo';
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const LogoContext = createContext<LogoContextValue | undefined>(undefined);

export function LogoProvider({ children }: { children: ReactNode }) {
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  });
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (!uploadError) return;
    const timer = window.setTimeout(() => setUploadError(null), 4500);
    return () => window.clearTimeout(timer);
  }, [uploadError]);

  const uploadLogoFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, SVG, JPG, or WEBP).');
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setUploadError('Logo file must be under 5 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : null;
      if (!result) {
        setUploadError('Unable to read the selected logo file.');
        return;
      }
      setLogoDataUrl(result);
      setUploadError(null);
      try {
        window.localStorage.setItem(STORAGE_KEY, result);
      } catch {
        // Ignore storage quota errors while keeping logo active in memory
      }
    };
    reader.onerror = () => {
      setUploadError('Unable to read the selected logo file.');
    };
    reader.readAsDataURL(file);
  }, []);

  const clearLogo = useCallback(() => {
    setLogoDataUrl(null);
    setUploadError(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  }, []);

  return (
    <LogoContext.Provider value={{ logoDataUrl, uploadError, uploadLogoFile, clearLogo }}>
      {children}
    </LogoContext.Provider>
  );
}

export function useBrandLogo(): LogoContextValue {
  const context = useContext(LogoContext);
  if (!context) {
    throw new Error('useBrandLogo must be used within a LogoProvider');
  }
  return context;
}
