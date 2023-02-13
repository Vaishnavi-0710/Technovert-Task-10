import { IContacts } from "./model";
import { AddressBookService } from "./services";
let mode: string;

export let counter = 0;
let contactList: string;
let obj = new AddressBookService();

function contactNotNull() {
    if (obj.contacts != null) {
        displayDetails(counter);
    }
}

obj.AddressBookService();
display();
contactNotNull();
document.getElementById("add")?.addEventListener("click", (e) => {
    e.preventDefault();
    mode = "new";
    render();
});

document.getElementById("addButton")?.addEventListener("click", (e) => {
    e.preventDefault();
    let name=validateName();
    let email=validateEmail();
    let mobile=validateMobile();
    let landline=validateLandline();
    $(".error-msg").show();
    if((name && email && mobile && landline) ){
        if(confirm("Are you sure you want to add the contact?")==true){
            obj.addContact({
                name: (<HTMLInputElement>document.querySelector('#name')).value,
                email: (<HTMLInputElement>document.querySelector('#email')).value,
                mobile: (<HTMLInputElement>document.querySelector('#mobile')).value,
                landline: (<HTMLInputElement>document.querySelector('#landline')).value,
                website: (<HTMLInputElement>document.querySelector('#website')).value,
                address: (<HTMLInputElement>document.querySelector('#address')).value
            });

        };
        localStorage.setItem('contacts', JSON. stringify(obj.contacts));
        display();
        $(".form-wrapper").hide();
        $("#formDetails").trigger("reset");
        alert("Contact added successfully");
        contactNotNull();
    };
});

document.getElementById("editButton")?.addEventListener("click", (e) => {
    e.preventDefault();
    let name=validateName();
    let email=validateEmail();
    let mobile=validateMobile();
    let landline=validateLandline();
    $(".error-msg").show();
    if((name && email && mobile && landline) ){
        if(confirm("Are you sure you want to update the data?")==true){
            obj.updateContact({
                name: (<HTMLInputElement>document.querySelector('#name')).value,
                email: (<HTMLInputElement>document.querySelector('#email')).value,
                mobile: (<HTMLInputElement>document.querySelector('#mobile')).value,
                landline: (<HTMLInputElement>document.querySelector('#landline')).value,
                website: (<HTMLInputElement>document.querySelector('#website')).value,
                address: (<HTMLInputElement>document.querySelector('#address')).value,
            });
            $(".form-wrapper").hide();
            localStorage.setItem('contacts', JSON.stringify(obj.contacts));
            display();
            alert(obj.contacts[counter].name+"'s data is updated");
            contactNotNull();
        }
    }
});

document.getElementById("cancelButton")?.addEventListener("click", (e) => {
    e.preventDefault();
    $("#formDetails").trigger("reset");
    $(".error-msg").hide();
    $(".form-wrapper").hide();
    contactNotNull();
});

document.getElementById("edit")?.addEventListener("click", (e) => {
    e.preventDefault();
    mode= "edit";
    render();
});

document.getElementById("delete")?.addEventListener("click", (e) => {
    e.preventDefault();
    if(confirm("Are you sure you want to delete the contact?")==true){
        obj.contacts.splice(counter,1);
        $('.detailed-contact').css("display","none");
        localStorage.setItem('contacts', JSON.stringify(obj.contacts));
        obj.AddressBookService();
        display();
        if(obj.contacts!=null){
            displayDetails(counter-counter);
        }
    }
});

function display(){
    let list=document.querySelector("#list");
    let contactList="";
    let i=0;
    obj.contacts.forEach((contact)=>{
        contactList += `<div class=list-item onclick="displayDetails(${i})" id="user${i}">
        <div class="item-name">${contact.name}</div>
        ${contact.email!=null && contact.email!="" ? "<div class='item-email'>"+ "Email: " + contact.email+"</div>" : ""}
        <div class="item-phnno">${"Mobile: " + contact.mobile}</div>
        </div>`
        i++;
    });
    if(contactList!="" && contactList!=null){
        contactList="<div class=`list-container`>"+ contactList + "</div>";
        if(list!=null)list.innerHTML= contactList;
    }
    else{
        if(list!=null)list.innerHTML= "There are no contacts to display";
    }
}


function render(){
    if(mode==="new"){
        $("#formDetails").trigger("reset");
        $(".detailed-contact").hide();
        $("#editButton").css("display", "none");
        $("#addButton").css("display", "block");
        $(".form-wrapper").show();
        display();
    }
    else if(mode==="edit"){
        $(".detailed-contact").hide();
        $("#editButton").css("display", "block");
        $("#addButton").css("display", "none");
        $(".form-wrapper").show();
        $('#name').val(obj.contacts[counter].name);
        $('#email').val(obj.contacts[counter].email);
        $('#mobile').val(obj.contacts[counter].mobile);
        $('#landline').val(obj.contacts[counter].landline);
        $('#website').val(obj.contacts[counter].website);
        $('#address').val(obj.contacts[counter].address);
        
    }
    else{
        display();
    }
}

const displayDetails=(i:number)=>{
    counter=i;
    $(`#user${i}`).addClass("selected-item");
    for(let j=0;j<obj.contacts.length;j++)
    {
        if(i!==j)
        {
            $(`#user${j}`).removeClass("selected-item");
        }
    }
    if (obj.contacts==null || obj.contacts.length==0){
        $('.detailed-contact').hide();
    }
    else{
        $(".form-wrapper").hide();
        $('.detailed-contact').css("display","block");
        $('.detailed-name').text(obj.contacts[i].name!=null && obj.contacts[i].name!="" ? obj.contacts[i].name : "N/A");
        $('.email').text(obj.contacts[i].email!=null && obj.contacts[i].email!="" ? obj.contacts[i].email : "N/A");
        $('.mobile').text(obj.contacts[i].mobile);
        $('.landline').text(obj.contacts[i].landline!=null && obj.contacts[i].landline!="" ? obj.contacts[i].landline : "N/A");
        $('.website').text(obj.contacts[i].website!=null && obj.contacts[i].website!="" ? obj.contacts[i].website : "N/A");
        $('.contact-address').text(obj.contacts[i].address!=null && obj.contacts[i].address!="" ? obj.contacts[i].address : "N/A");
    }
}

function validateName(){
    let name=$("#name").val();
    if(name!=""){
        $('#nameError').text("");
        return true;
    }
    else{
        $('#nameError').text("Name is required");
        return false;
    }
};
  
function validateEmail(){
    let email=<string>$("#email").val();
    const validMail=/^[a-zA-Z0-9.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9.]{2,}$/;
    if(validMail.test(email) || email==""){
        $('#emailError').text("");
        return true;
    }
    else{
        $("#emailError").text("Enter Valid Email");
        return false;
    }
};

function validateMobile(){
    let mobile=<string>$("#mobile").val();
    const validMobile =/^((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}$/;
    if((validMobile.test(mobile)) || mobile==""){
        if(mobile==""){
            $('#mobileError').text("Mobile is required");
            return false;
        }
        else{
            $('#mobileError').text("");
            return true;
        }
    }
    else{
        $('#mobileError').text("Enter Valid Mobile");
        return false;
    }
};

function validateLandline(){
    let landline=<string>$("#landline").val();
    const validLandline =/^[0-9]\d{2,4}-\d{6,8}$/;
    if(validLandline.test(landline) || landline==""){
        $('#landlineError').text("");
        return true;
    }
    else{
        $('#landlineError').text("Enter Valid Landline");
        return false;
    }
};