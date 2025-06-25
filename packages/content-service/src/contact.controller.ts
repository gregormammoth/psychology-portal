import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ContactService, ContactFormData } from './contact.service';

@Controller('contacts')
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

  // Microservice message patterns
  @MessagePattern({ cmd: 'create_contact' })
  async handleCreateContact(@Payload() data: ContactFormData) {
    return this.contactService.createContact(data);
  }

  @MessagePattern({ cmd: 'get_contacts' })
  async handleGetContacts() {
    return this.contactService.getContacts();
  }

  @MessagePattern({ cmd: 'get_contact' })
  async handleGetContact(@Payload() data: { id: string }) {
    return this.contactService.getContact(data.id);
  }

  @MessagePattern({ cmd: 'update_contact_status' })
  async handleUpdateContactStatus(@Payload() data: { id: string; status: string }) {
    return this.contactService.updateContactStatus(data.id, data.status);
  }

  @MessagePattern({ cmd: 'delete_contact' })
  async handleDeleteContact(@Payload() data: { id: string }) {
    return this.contactService.deleteContact(data.id);
  }
} 