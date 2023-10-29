// InMemoryDB.ts
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

    validateUser(username: string, password: string): number{
        const user = this.users.find(
          (user) => user.username === username && user.password === password
        );
        console.log(user)
        if (user) {
          return user.userId;
        }
        return
    }
  
    addContact(userId: number, contactData: Omit<Contact, 'contactId'>): Contact[] {
      const newContact: Contact = { ...contactData, contactId: this.nextContactId++ };
      this.contacts.push(newContact);
      const user = this.users.find(user => user.userId === userId);
      if (user) {
        user.contacts = user.contacts || [];
        user.contacts.push(newContact.contactId);
      }
      return this.getContactsForUser(userId);
    }
  
    getContactsForUser(userId: number): Contact[] {
      const user = this.users.find(user => user.userId === userId);
      if (user && user.contacts) {
        return user.contacts.map(contactId => this.contacts.find(contact => contact.contactId === contactId)!);
      }
      return [];
    }

    updateContact(userId: number, contactId: number, updatedContact: Contact): Contact[] {
        const contactIndex = this.contacts.findIndex((c) => c.contactId === contactId);
        if (contactIndex !== -1) {
          this.contacts[contactIndex] = updatedContact;
          return this.getContactsForUser(userId);
        }
        return [];
      }
    
      deleteContact(userId: number, contactId: number): Contact[] {
        const contactIndex = this.contacts.findIndex((c) => c.contactId === contactId);
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
        return [];
      }

    addChat(userId: number, contactId: number, date: string, messageText: string, rating: number) {
        const chatId = this.generateId();
        const newChat:Chat = {
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
  
  interface Contact {
    contactId: number;
    firstName: string;
    lastName: string;
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
  