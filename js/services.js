"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressBookService = exports.contacts = void 0;
const home_1 = require("./home");
exports.contacts = [];
class AddressBookService {
    AddressBookService() {
        let contactsString = localStorage.getItem("contacts");
        if (contactsString != null) {
            exports.contacts = JSON.parse(contactsString);
        }
        if (exports.contacts == null) {
            exports.contacts = [];
            localStorage.setItem("contacts", JSON.stringify(exports.contacts));
        }
    }
    addContact(contact) {
        exports.contacts.push(contact);
    }
    updateContact(contact) {
        exports.contacts[home_1.counter] = contact;
    }
}
exports.AddressBookService = AddressBookService;
