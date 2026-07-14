import { useState } from 'react';
import { ImageIcon, X } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface BeforeAfterImageProps {
  beforeImage: string;
  afterImage: string;
  issueTitle: string;
}

export default function BeforeAfterImage({ beforeImage, afterImage, issueTitle }: BeforeAfterImageProps) {
  const { t } = useLanguage();
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState<'before' | 'after' | null>(null);

  const openLightbox = (type: 'before' | 'after') => {
    setSelectedImage(type);
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    setSelectedImage(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {/* Before Image */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{t('ngo.beforeImage')}</span>
          </div>
          <Card
            className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-orange-500 transition-all group"
            onClick={() => openLightbox('before')}
          >
            <div className="relative aspect-video bg-gray-100">
              <img
                src={beforeImage}
                alt="Before"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
          </Card>
        </div>

        {/* After Image */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{t('ngo.afterImage')}</span>
          </div>
          <Card
            className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-green-500 transition-all group"
            onClick={() => openLightbox('after')}
          >
            <div className="relative aspect-video bg-gray-100">
              <img
                src={afterImage}
                alt="After"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              <div className="absolute top-2 right-2">
                <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full font-medium">
                  Resolved
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Lightbox Modal */}
      {showLightbox && selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-6xl w-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:text-gray-300 hover:bg-white/10"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="bg-white rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-100 border-b">
                <h3 className="font-semibold text-gray-900">{issueTitle}</h3>
                <p className="text-sm text-gray-600">
                  {selectedImage === 'before' ? t('ngo.beforeImage') : t('ngo.afterImage')}
                </p>
              </div>
              <div className="relative max-h-[70vh] overflow-auto bg-gray-50">
                <img
                  src={selectedImage === 'before' ? beforeImage : afterImage}
                  alt={selectedImage === 'before' ? 'Before' : 'After'}
                  className="w-full h-full object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
