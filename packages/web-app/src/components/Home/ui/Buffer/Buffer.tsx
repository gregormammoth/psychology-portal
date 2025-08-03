import { Parallax } from 'react-parallax';
import { useTranslation } from 'next-i18next';

export default function Buffer() {
  const { t } = useTranslation('common');

  return (
    <Parallax
      bgImage="/images/relationships.jpg"
      bgImageAlt="Psychology background"
      strength={200}
      // blur={{ min: -5, max: 5 }}
      bgImageStyle={{
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    >
      <div className="h-96 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">{t('home.buffer.title')}</h2>
          <p className="text-xl">{t('home.buffer.description')}</p>
        </div>
      </div>
    </Parallax>
  );
}