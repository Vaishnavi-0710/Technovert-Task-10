"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressBookService = void 0;
const home_1 = require("./home");
class AddressBookService {
    constructor() {
        this.contacts = [];
    }
    AddressBookService() {
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
        this.contacts[home_1.counter] = contact;
    }
}
exports.AddressBookService = AddressBookService;
