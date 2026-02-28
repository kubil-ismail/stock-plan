import { ReactNode, useEffect } from 'react';
import { X, Check } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-[101] animate-in slide-in-from-bottom duration-300">
        <div className="bg-white border-t border-border rounded-t-[24px] shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border flex-shrink-0">
            <h3 className="text-[18px] font-semibold text-foreground">{title}</h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors active:scale-95"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="overflow-y-auto flex-1 pb-safe">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

// Bottom Sheet Option Item Component
interface BottomSheetOptionProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export function BottomSheetOption({ label, isSelected, onClick }: BottomSheetOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-5 py-4 transition-all active:bg-muted/30 ${
        isSelected ? 'bg-primary/5' : 'hover:bg-muted/20'
      }`}
    >
      <span
        className={`text-[15px] font-medium ${
          isSelected ? 'text-primary font-semibold' : 'text-foreground'
        }`}
      >
        {label}
      </span>
      {isSelected && (
        <Check className="w-5 h-5 text-primary" strokeWidth={2.5} />
      )}
    </button>
  );
}