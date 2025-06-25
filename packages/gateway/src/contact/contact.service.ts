import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ContactFormData } from './contact.controller';

@Injectable()
export class ContactService {
  constructor(
    @Inject('CONTENT_SERVICE') private readonly contentClient: ClientProxy,
  ) {}

  async createContact(contactData: ContactFormData) {
    return this.contentClient.send({ cmd: 'create_contact' }, contactData).toPromise();
  }

  async getContacts() {
    return this.contentClient.send({ cmd: 'get_contacts' }, {}).toPromise();
  }

  async getContact(id: string) {
    return this.contentClient.send({ cmd: 'get_contact' }, { id }).toPromise();
  }

  async updateContactStatus(id: string, status: string) {
    return this.contentClient.send({ cmd: 'update_contact_status' }, { id, status }).toPromise();
  }

  async deleteContact(id: string) {
    return this.contentClient.send({ cmd: 'delete_contact' }, { id }).toPromise();
  }
} 