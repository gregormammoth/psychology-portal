import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';

export interface ContactFormData {
  name: string;
  contact: string;
  preferredContactType: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: string;
  problems: string[];
  message?: string;
}

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: Model<ContactDocument>,
  ) {}

  async createContact(contactData: ContactFormData) {
    const contact = new this.contactModel({
      ...contactData,
      submittedAt: new Date(),
    });

    const savedContact = await contact.save();
    return {
      id: savedContact.id,
      message: 'Contact form submitted successfully',
      submittedAt: savedContact.submittedAt,
    };
  }

  async getContacts() {
    return this.contactModel.find().sort({ submittedAt: -1 }).exec();
  }

  async getContact(id: string) {
    return this.contactModel.findById(id).exec();
  }

  async updateContactStatus(id: string, status: string) {
    return this.contactModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).exec();
  }

  async deleteContact(id: string) {
    const contact = await this.contactModel.findByIdAndDelete(id).exec();
    if (!contact) {
      throw new Error('Contact not found');
    }
    return { message: 'Contact deleted successfully' };
  }
} 