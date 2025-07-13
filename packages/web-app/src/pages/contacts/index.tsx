import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Layout } from '../../components/Layout/Layout';
import SEO from '../../components/SEO';
import Notification from '../../components/ui/Notification';
import { useNotification } from '../../hooks/useNotification';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: string;
  message: string;
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default function ContactsPage() {
  const { t } = useTranslation('common');
  const { notification, showSuccess, showError, hideNotification } = useNotification();
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    consultationType: '',
    message: '',
  });

  const consultationTypes = [
    { value: 'individual', label: t('contacts.form.consultationType.options.individual') },
    { value: 'couple', label: t('contacts.form.consultationType.options.couple') },
    { value: 'family', label: t('contacts.form.consultationType.options.family') },
    { value: 'group', label: t('contacts.form.consultationType.options.group') },
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ].map(time => ({ value: time, label: time }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://13.60.225.240:3003/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Contact form submitted successfully:', result);
        showSuccess(t('contacts.notifications.success'));
        setFormData({
          name: '',
          email: '',
          phone: '',
          preferredDate: '',
          preferredTime: '',
          consultationType: '',
          message: '',
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      showError(t('contacts.notifications.error'));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value as string }));
  };

  return (
    <>
      <SEO
        title={t('seo.pages.contacts.title')}
        description={t('seo.pages.contacts.description')}
        keywords={t('seo.pages.contacts.keywords')}
        url="https://psychologyportal.com/ru/contacts"
        locale="ru"
      />
      <Layout
        title={t('contacts.title')}
        description={t('contacts.subtitle')}
      >
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-primary-600 mb-4">
                {t('contacts.title')}
              </h1>
              <p className="text-lg text-primary-500">
                {t('contacts.subtitle')}
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 border border-primary-100">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-2">
                      {t('contacts.form.name.label')}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contacts.form.name.placeholder')}
                      className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">
                      {t('contacts.form.email.label')}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contacts.form.email.placeholder')}
                      className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-primary-700 mb-2">
                      {t('contacts.form.phone.label')}
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('contacts.form.phone.placeholder')}
                      className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="consultationType" className="block text-sm font-medium text-primary-700 mb-2">
                      {t('contacts.form.consultationType.label')}
                    </label>
                    <Select
                      id="consultationType"
                      name="consultationType"
                      required
                      value={formData.consultationType}
                      onChange={handleSelectChange}
                      options={consultationTypes}
                      className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-medium text-primary-700 mb-2">
                      {t('contacts.form.preferredDate.label')}
                    </label>
                    <Input
                      id="preferredDate"
                      name="preferredDate"
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-medium text-primary-700 mb-2">
                      {t('contacts.form.preferredTime.label')}
                    </label>
                    <Select
                      id="preferredTime"
                      name="preferredTime"
                      required
                      value={formData.preferredTime}
                      onChange={handleSelectChange}
                      options={timeSlots}
                      className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary-700 mb-2">
                    {t('contacts.form.message.label')}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contacts.form.message.placeholder')}
                    rows={4}
                    className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" variant="primary" size="lg" className="bg-primary-600 hover:bg-primary-700">
                    {t('contacts.form.submit')}
                  </Button>
                </div>
              </form>
            </div>

            <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-primary-100">
              <h2 className="text-2xl font-semibold text-primary-600 mb-6">
                {t('contacts.contactInfo.title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-primary-500">
                      {t('contacts.contactInfo.address.label')}
                    </h3>
                    <p className="mt-1 text-base text-primary-700">
                      {t('contacts.contactInfo.address.value')}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-primary-500">
                      {t('contacts.contactInfo.phone.label')}
                    </h3>
                    <p className="mt-1 text-base text-primary-700">
                      {t('contacts.contactInfo.phone.value')}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-primary-500">
                      {t('contacts.contactInfo.email.label')}
                    </h3>
                    <p className="mt-1 text-base text-primary-700">
                      {t('contacts.contactInfo.email.value')}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-primary-500">
                      {t('contacts.contactInfo.workingHours.label')}
                    </h3>
                    <p className="mt-1 text-base text-primary-700">
                      {t('contacts.contactInfo.workingHours.value')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </>
  );
}