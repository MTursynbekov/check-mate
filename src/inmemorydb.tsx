// InMemoryDB.ts
import Token from './pages/Token';

export class InMemoryDB {
  private users: User[] = [];
  private contacts: Contact[] = [];
  private nextContactId = 1;
  private chats: Chat[] = [];
  
  addUser(username: string, password: string, phoneNumber: string): number {
    const newUser: User = { username, password, phoneNumber, userId: this.users.length + 1 };
    this.users.push(newUser);
    return newUser.userId;
  }

  validateUser(username: string, password: string): number {
    const user = this.users.find(
      (user) => user.username === username && user.password === password
    );
    console.log(user)
    if (user) {
      return user.userId;
    }
    return
  }

  async addContact( contactData: Omit<Contact, 'id'>): Promise<Contact> {
    const newContact: Contact = { ...contactData, id: 0 };
    const currentToken = Token.accessToken; 

    try {
      const response = await fetch('http://localhost:8080/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + currentToken,
        },
        body: JSON.stringify(newContact),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse
      } else {
        console.error('Failed to add chat');
      }
    } catch (error) {
      console.error('Error sending JSON POST /chat request:', error);
   }
  }

  async getContactsForUser(userId: number): Promise<Contact[]> {
    const currentToken = Token.accessToken; 

    try {
      const response = await fetch(`http://localhost:8080/api/contacts/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  currentToken,
        },
      });

      if (response.ok) {
        const contacts = await response.json();
        return contacts
      } else {
        console.error('Failed to add chat');
      }
    } catch (error) {
      console.error('Error sending JSON GET /contacts request:', error);
    }
  }

  updateContact(userId: number, contactId: number, updatedContact: Contact): Promise<Contact[]> {
    const contactIndex = this.contacts.findIndex((c) => c.id === contactId);
    if (contactIndex !== -1) {
      this.contacts[contactIndex] = updatedContact;
      return this.getContactsForUser(userId);
    }
  }

  deleteContact(userId: number, contactId: number): Promise<Contact[]> {
    const contactIndex = this.contacts.findIndex((c) => c.id === contactId);
    if (contactIndex !== -1) {
      this.contacts.splice(contactIndex, 1);
      const user = this.users.find((u) => u.userId === userId);
      if (user && user.contacts) {
        const contactIdIndex = user.contacts.findIndex((id) => id === contactId);
        if (contactIdIndex !== -1) {
          user.contacts.splice(contactIdIndex, 1);
        }
      }
      return this.getContactsForUser(userId);
    }
  }

  addChat(userId: number, contactId: number, date: string, messageText: string, rating: number) {
    const chatId = this.generateId();
    const newChat: Chat = {
      chatId,
      userId,
      contactId,
      date,
      messageText,
      rating,
    };
    this.chats.push(newChat);
    return newChat;
  }

  private generateId() {
    return Math.random().toString(32);
  }


  getChats(userId: number, contactId: number) {
    console.log(this.chats)
    return this.chats.filter((chat) => chat.userId === userId && chat.contactId === contactId);
  }

  updateChat(chatId: string, updatedChat: Chat): Chat | undefined {
    const chatIndex = this.chats.findIndex(chat => chat.chatId === chatId);
    if (chatIndex !== -1) {
      this.chats[chatIndex] = updatedChat;
      return updatedChat;
    }
    return undefined;
  }

  deleteChat(chatId: string): Chat[] {
    const chatIndex = this.chats.findIndex((chat) => chat.chatId === chatId);
    if (chatIndex !== -1) {
      this.chats.splice(chatIndex, 1);
    }
    return this.chats;
  }
}

interface User {
  userId: number;
  username: string;
  password: string;
  phoneNumber: string;
  contacts?: number[];
}

export interface Contact {
  id: number;
  userId: number;
  name: string;
  surname: string;
  phoneNumber: string;
  relationship: string;
  daysBeforeReminder: number;
  birthday: string;
}

interface Chat {
  chatId: string;
  userId: number;
  contactId: number;
  date: string;
  messageText: string;
  rating: number;
}
