import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Layout } from '../../components/layout/Layout';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: string;
  message: string;
}

const consultationTypes = [
  { value: 'individual', label: 'Individual Consultation' },
  { value: 'couple', label: 'Couple Therapy' },
  { value: 'family', label: 'Family Therapy' },
  { value: 'group', label: 'Group Therapy' },
];

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
].map(time => ({ value: time, label: time }));

export default function ContactsPage() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    consultationType: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Layout
      title="Contact Us - Psychology Portal"
      description="Book a consultation with our psychologists"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary-600 mb-4">Book a Consultation</h1>
            <p className="text-lg text-primary-500">
              Schedule a session with our experienced psychologists
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 border border-primary-100">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-primary-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="consultationType" className="block text-sm font-medium text-primary-700 mb-2">
                    Consultation Type
                  </label>
                  <Select
                    id="consultationType"
                    name="consultationType"
                    required
                    value={formData.consultationType}
                    onChange={handleChange}
                    options={consultationTypes}
                    className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-medium text-primary-700 mb-2">
                    Preferred Date
                  </label>
                  <Input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium text-primary-700 mb-2">
                    Preferred Time
                  </label>
                  <Select
                    id="preferredTime"
                    name="preferredTime"
                    required
                    value={formData.preferredTime}
                    onChange={handleChange}
                    options={timeSlots}
                    className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary-700 mb-2">
                  Additional Information
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please provide any additional information that might be helpful for your consultation..."
                  rows={4}
                  className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" variant="primary" size="lg" className="bg-primary-600 hover:bg-primary-700">
                  Book Consultation
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-primary-100">
            <h2 className="text-2xl font-semibold text-primary-600 mb-6">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-primary-500">Address</h3>
                  <p className="mt-1 text-base text-primary-700">
                    123 Psychology Street, Suite 456<br />
                    City, State 12345
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-primary-500">Phone</h3>
                  <p className="mt-1 text-base text-primary-700">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-primary-500">Email</h3>
                  <p className="mt-1 text-base text-primary-700">contact@psychologyportal.com</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-primary-500">Working Hours</h3>
                  <p className="mt-1 text-base text-primary-700">
                    Monday - Friday<br />
                    9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}