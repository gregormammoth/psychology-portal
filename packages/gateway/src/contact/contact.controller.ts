import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { ContactService } from './contact.service';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: string;
  message?: string;
}

@Controller('api/contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async createContact(@Body() contactData: ContactFormData) {
    return this.contactService.createContact(contactData);
  }

  @Get()
  async getContacts() {
    return this.contactService.getContacts();
  }

  @Get(':id')
  async getContact(@Param('id') id: string) {
    return this.contactService.getContact(id);
  }

  @Put(':id/status')
  async updateContactStatus(
    @Param('id') id: string,
    @Body('status') status: string
  ) {
    return this.contactService.updateContactStatus(id, status);
  }

  @Delete(':id')
  async deleteContact(@Param('id') id: string) {
    return this.contactService.deleteContact(id);
  }
} 