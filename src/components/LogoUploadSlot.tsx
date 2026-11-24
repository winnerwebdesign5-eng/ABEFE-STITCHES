import { useId, useRef, type ChangeEvent } from 'react';
import { Upload, X } from 'lucide-react';
import { useBrandLogo } from '../context/LogoContext';

interface LogoUploadSlotProps {
  variant?: 'header' | 'footer';
}

export function LogoUploadSlot({ variant = 'header' }: LogoUploadSlotProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { logoDataUrl, uploadError, uploadLogoFile, clearLogo } = useBrandLogo();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadLogoFile(file);
    }
    // Reset input so re-uploading the same file triggers onChange
    event.target.value = '';
  };

  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  const isHeader = variant === 'header';

  return (
    <div className="relative inline-flex items-center shrink-0">
      <input
        ref={fileInputRef}
        id={inputId}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml,image/*"
        onChange={handleFileChange}
        className="sr-only"
        aria-label="Upload Abefe Stitches brand logo"
      />

      {logoDataUrl ? (
        <div className="group relative inline-flex items-center">
          <button
            type="button"
            onClick={triggerFilePicker}
            title="Click to replace brand logo"
            aria-label="Replace Abefe Stitches brand logo"
            className={`relative flex items-center justify-center rounded-sm transition-opacity duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isHeader
                ? 'h-10 sm:h-11 max-w-[128px] focus-visible:outline-[#301A16]'
                : 'h-12 sm:h-14 max-w-[156px] focus-visible:outline-[#D6BFA5]'
            }`}
          >
            <img
              src={logoDataUrl}
              alt="Abefe Stitches brand logo"
              referrerPolicy="no-referrer"
              className="h-full w-auto max-w-full object-contain block"
            />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              clearLogo();
            }}
            title="Remove uploaded logo"
            aria-label="Remove uploaded logo"
            className={`absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-150 shadow-sm ${
              isHeader
                ? 'bg-[#301A16] text-[#F5EBDD] hover:bg-[#704638]'
                : 'bg-[#D6BFA5] text-[#301A16] hover:bg-[#C6A66B]'
            }`}
          >
            <X className="h-3 w-3" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={triggerFilePicker}
          title="Upload your existing Abefe Stitches logo"
          aria-label="Upload your existing Abefe Stitches logo"
          className={`inline-flex items-center justify-center gap-1.5 rounded-sm border border-dashed transition-colors duration-200 cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 ${
            isHeader
              ? 'h-10 sm:h-11 px-2.5 sm:px-3 border-[#704638]/45 bg-[#D6BFA5]/15 text-[#704638] hover:border-[#301A16]/70 hover:bg-[#D6BFA5]/30 hover:text-[#301A16] focus-visible:outline-[#301A16]'
              : 'h-12 sm:h-14 px-3.5 border-[#D6BFA5]/40 bg-[#F5EBDD]/5 text-[#D6BFA5]/85 hover:border-[#C6A66B] hover:bg-[#F5EBDD]/10 hover:text-[#F5EBDD] focus-visible:outline-[#D6BFA5]'
          }`}
        >
          <Upload className="h-3.5 w-3.5 shrink-0" strokeWidth={1.6} aria-hidden="true" />
          <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.12em] uppercase whitespace-nowrap">
            Logo
          </span>
        </button>
      )}

      {uploadError && (
        <p
          role="alert"
          className={`absolute left-0 top-full mt-1.5 z-50 w-56 rounded-sm px-2.5 py-1.5 text-[11px] leading-snug shadow-md ${
            isHeader
              ? 'bg-[#301A16] text-[#F5EBDD] border border-[#D6BFA5]/30'
              : 'bg-[#F5EBDD] text-[#301A16] border border-[#D6BFA5]'
          }`}
        >
          {uploadError}
        </p>
      )}
    </div>
  );
}
