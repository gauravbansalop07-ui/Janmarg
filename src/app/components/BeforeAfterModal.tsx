import { X, ArrowLeftRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/app/components/ui/button';

interface BeforeAfterModalProps {
  beforeImage: string;
  afterImage: string;
  issueTitle: string;
  onClose: () => void;
}

export default function BeforeAfterModal({ beforeImage, afterImage, issueTitle, onClose }: BeforeAfterModalProps) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Before & After Comparison</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{issueTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Image Comparison */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Before Image */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="font-semibold text-red-900 dark:text-red-300">Before Resolution</span>
              </div>
              <div className="relative rounded-xl overflow-hidden border-4 border-red-200 dark:border-red-800 shadow-lg">
                <img 
                  src={beforeImage} 
                  alt="Before Resolution" 
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Before
                </div>
              </div>
            </div>

            {/* After Image */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-semibold text-green-900 dark:text-green-300">After Resolution</span>
              </div>
              <div className="relative rounded-xl overflow-hidden border-4 border-green-200 dark:border-green-800 shadow-lg">
                <img 
                  src={afterImage} 
                  alt="After Resolution" 
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  After
                </div>
              </div>
            </div>
          </div>

          {/* Toggle View for Mobile */}
          <div className="md:hidden mt-6">
            <Button
              onClick={() => setShowAfter(!showAfter)}
              className="w-full"
              variant="outline"
            >
              <ArrowLeftRight className="w-4 h-4 mr-2" />
              {showAfter ? 'Show Before' : 'Show After'}
            </Button>
          </div>

          {/* Success Message */}
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-900 dark:text-green-300 mb-1">Issue Successfully Resolved</h4>
                <p className="text-sm text-green-700 dark:text-green-400">
                  This civic issue has been completed and verified. The comparison above shows the transformation achieved through collaborative action.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
