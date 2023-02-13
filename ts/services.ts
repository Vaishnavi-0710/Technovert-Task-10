import { IContacts } from "./model";
import { counter,display,displayDetails } from "./index";

export class AddressBookService{
    contacts:IContacts[]=[];
    constructor(){
        this.init();
    }
    init() {
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
    deleteContact(){
        displayDetails(counter-counter);
    }
    getContactById(id:string){
        let filteredContacts=this.contacts.filter((contact)=>{
            contact.id==id;
        });
        if(filteredContacts.length>0){
            return filteredContacts[0];
        }
        else{return null}
    }
}