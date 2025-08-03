import EmailIcon from '@mui/icons-material/Email';
import TelegramIcon from '@mui/icons-material/Telegram';
import PhoneIcon from '@mui/icons-material/Phone';
import GroupIcon from '@mui/icons-material/Group';
import { useTranslation } from 'next-i18next';

export default function Footer() {
  const { t } = useTranslation('common');
  return (
    <footer className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Phone and Email</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <EmailIcon />
                <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`} className="hover:text-primary-200 transition-colors">
                  {process.env.NEXT_PUBLIC_EMAIL}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon />
                <a href={`tel:${process.env.NEXT_PUBLIC_PHONE}`} className="hover:text-primary-200 transition-colors">
                  {process.env.NEXT_PUBLIC_PHONE}
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Telegram</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <TelegramIcon />
                <a href={process.env.NEXT_PUBLIC_TELEGRAM_URL} className="hover:text-primary-200 transition-colors">
                  {t('home.banner.telegram')}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <GroupIcon />
                <a href={`tel:${process.env.NEXT_PUBLIC_TELEGRAM_GROUP_URL}`} className="hover:text-primary-200 transition-colors">
                  {t('home.banner.telegramGroup')}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-500 text-center">
          <p>&copy; {new Date().getFullYear()} Psychology Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}