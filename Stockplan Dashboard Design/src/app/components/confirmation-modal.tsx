import { ReactNode, useState } from 'react';
import { X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  children?: ReactNode;
  requiresConfirmation?: boolean; // New prop for type-to-confirm
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  children,
  requiresConfirmation = false,
}: ConfirmationModalProps) {
  const [inputValue, setInputValue] = useState('');
  
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
    setInputValue('');
  };

  const isDisabled = requiresConfirmation && inputValue.toUpperCase() !== 'CONFIRM';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md p-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-white border border-border rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h3 className="text-[18px] font-semibold text-foreground">{title}</h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            <p className="text-[14px] text-muted-foreground leading-relaxed">
              {description}
            </p>
            
            {requiresConfirmation && (
              <div>
                <label className="block text-[13px] font-medium text-foreground mb-2">
                  Type <span className="font-bold text-destructive">CONFIRM</span> to proceed:
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type CONFIRM"
                  className="w-full px-3 py-2.5 rounded-[10px] border border-border bg-input-background text-[14px] focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              </div>
            )}
            
            {children}
          </div>

          {/* Actions */}
          <div className="flex gap-3 p-5 bg-muted/20 border-t border-border">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-[10px] text-[14px] font-medium bg-muted/30 text-foreground hover:bg-muted/50 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              disabled={isDisabled}
              className={`flex-1 px-4 py-2.5 rounded-[10px] text-[14px] font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                variant === 'destructive'
                  ? 'bg-destructive text-white hover:bg-destructive/90'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}