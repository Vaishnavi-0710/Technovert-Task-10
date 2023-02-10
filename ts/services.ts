import { IContacts } from "./model";
import { counter } from "./home";
export let contacts:IContacts[]=[];
export class AddressBookService{
    
    AddressBookService(){
        let contactsString=localStorage.getItem("contacts");
        if(contactsString!=null)
        {
            contacts=JSON.parse(contactsString);
        }
        if(contacts==null){
            contacts=[];
            localStorage.setItem("contacts",JSON.stringify(contacts));
        }
    }
    addContact(contact:IContacts){
        contacts.push(contact);
    }
    updateContact(contact:IContacts){
        contacts[counter]=contact;
    }
}