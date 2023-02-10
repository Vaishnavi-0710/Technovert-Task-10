import { IContacts } from "./model";
import { counter } from "./home";

export class AddressBookService{
    contacts:IContacts[]=[];
    AddressBookService(){
        let contactsString=localStorage.getItem("contacts");
        if(contactsString!=null)
        {
            this.contacts=JSON.parse(contactsString);
        }
        if(this.contacts==null){
            this.contacts=[];
            localStorage.setItem("contacts",JSON.stringify(this.contacts));
        }
    }
    addContact(contact:IContacts){
        this.contacts.push(contact);
    }
    updateContact(contact:IContacts){
        this.contacts[counter]=contact;
    }
}