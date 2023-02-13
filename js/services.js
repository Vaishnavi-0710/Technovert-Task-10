"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressBookService = void 0;
const index_1 = require("./index");
class AddressBookService {
    constructor() {
        this.contacts = [];
        this.init();
    }
    init() {
        let contactsString = localStorage.getItem("contacts");
        if (contactsString != null) {
            this.contacts = JSON.parse(contactsString);
        }
        if (this.contacts == null) {
            this.contacts = [];
            localStorage.setItem("contacts", JSON.stringify(this.contacts));
        }
    }
    addContact(contact) {
        this.contacts.push(contact);
    }
    updateContact(contact) {
        this.contacts[index_1.counter] = contact;
    }
    deleteContact() {
        (0, index_1.displayDetails)(index_1.counter - index_1.counter);
    }
    getContactById(id) {
        let filteredContacts = this.contacts.filter((contact) => {
            contact.id == id;
        });
        if (filteredContacts.length > 0) {
            return filteredContacts[0];
        }
        else {
            return null;
        }
    }
}
exports.AddressBookService = AddressBookService;
