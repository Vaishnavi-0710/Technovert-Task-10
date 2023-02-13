"use strict";
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.counter = void 0;
const services_1 = require("./services");
let mode;
exports.counter = 0;
let contactList;
let obj = new services_1.AddressBookService();
function contactNotNull() {
    if (obj.contacts != null) {
        displayDetails(exports.counter);
    }
}
obj.AddressBookService();
display();
contactNotNull();
(_a = document.getElementById("add")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
    e.preventDefault();
    mode = "new";
    render();
});
(_b = document.getElementById("addButton")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (e) => {
    e.preventDefault();
    let name = validateName();
    let email = validateEmail();
    let mobile = validateMobile();
    let landline = validateLandline();
    $(".error-msg").show();
    if ((name && email && mobile && landline)) {
        if (confirm("Are you sure you want to add the contact?") == true) {
            obj.addContact({
                name: document.querySelector('#name').value,
                email: document.querySelector('#email').value,
                mobile: document.querySelector('#mobile').value,
                landline: document.querySelector('#landline').value,
                website: document.querySelector('#website').value,
                address: document.querySelector('#address').value
            });
        }
        ;
        localStorage.setItem('contacts', JSON.stringify(obj.contacts));
        display();
        $(".form-wrapper").hide();
        $("#formDetails").trigger("reset");
        alert("Contact added successfully");
        contactNotNull();
    }
    ;
});
(_c = document.getElementById("editButton")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", (e) => {
    e.preventDefault();
    let name = validateName();
    let email = validateEmail();
    let mobile = validateMobile();
    let landline = validateLandline();
    $(".error-msg").show();
    if ((name && email && mobile && landline)) {
        if (confirm("Are you sure you want to update the data?") == true) {
            obj.updateContact({
                name: document.querySelector('#name').value,
                email: document.querySelector('#email').value,
                mobile: document.querySelector('#mobile').value,
                landline: document.querySelector('#landline').value,
                website: document.querySelector('#website').value,
                address: document.querySelector('#address').value,
            });
            $(".form-wrapper").hide();
            localStorage.setItem('contacts', JSON.stringify(obj.contacts));
            display();
            alert(obj.contacts[exports.counter].name + "'s data is updated");
            contactNotNull();
        }
    }
});
(_d = document.getElementById("cancelButton")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", (e) => {
    e.preventDefault();
    $("#formDetails").trigger("reset");
    $(".error-msg").hide();
    $(".form-wrapper").hide();
    contactNotNull();
});
(_e = document.getElementById("edit")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", (e) => {
    e.preventDefault();
    mode = "edit";
    render();
});
(_f = document.getElementById("delete")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete the contact?") == true) {
        obj.contacts.splice(exports.counter, 1);
        $('.detailed-contact').css("display", "none");
        localStorage.setItem('contacts', JSON.stringify(obj.contacts));
        obj.AddressBookService();
        display();
        if (obj.contacts != null) {
            displayDetails(exports.counter - exports.counter);
        }
    }
});
function display() {
    let list = document.querySelector("#list");
    let contactList = "";
    let i = 0;
    obj.contacts.forEach((contact) => {
        contactList += `<div class=list-item onclick="displayDetails(${i})" id="user${i}">
        <div class="item-name">${contact.name}</div>
        ${contact.email != null && contact.email != "" ? "<div class='item-email'>" + "Email: " + contact.email + "</div>" : ""}
        <div class="item-phnno">${"Mobile: " + contact.mobile}</div>
        </div>`;
        i++;
    });
    if (contactList != "" && contactList != null) {
        contactList = "<div class=`list-container`>" + contactList + "</div>";
        if (list != null)
            list.innerHTML = contactList;
    }
    else {
        if (list != null)
            list.innerHTML = "There are no contacts to display";
    }
}
function render() {
    if (mode === "new") {
        $("#formDetails").trigger("reset");
        $(".detailed-contact").hide();
        $("#editButton").css("display", "none");
        $("#addButton").css("display", "block");
        $(".form-wrapper").show();
        display();
    }
    else if (mode === "edit") {
        $(".detailed-contact").hide();
        $("#editButton").css("display", "block");
        $("#addButton").css("display", "none");
        $(".form-wrapper").show();
        $('#name').val(obj.contacts[exports.counter].name);
        $('#email').val(obj.contacts[exports.counter].email);
        $('#mobile').val(obj.contacts[exports.counter].mobile);
        $('#landline').val(obj.contacts[exports.counter].landline);
        $('#website').val(obj.contacts[exports.counter].website);
        $('#address').val(obj.contacts[exports.counter].address);
    }
    else {
        display();
    }
}
const displayDetails = (i) => {
    exports.counter = i;
    $(`#user${i}`).addClass("selected-item");
    for (let j = 0; j < obj.contacts.length; j++) {
        if (i !== j) {
            $(`#user${j}`).removeClass("selected-item");
        }
    }
    if (obj.contacts == null || obj.contacts.length == 0) {
        $('.detailed-contact').hide();
    }
    else {
        $(".form-wrapper").hide();
        $('.detailed-contact').css("display", "block");
        $('.detailed-name').text(obj.contacts[i].name != null && obj.contacts[i].name != "" ? obj.contacts[i].name : "N/A");
        $('.email').text(obj.contacts[i].email != null && obj.contacts[i].email != "" ? obj.contacts[i].email : "N/A");
        $('.mobile').text(obj.contacts[i].mobile);
        $('.landline').text(obj.contacts[i].landline != null && obj.contacts[i].landline != "" ? obj.contacts[i].landline : "N/A");
        $('.website').text(obj.contacts[i].website != null && obj.contacts[i].website != "" ? obj.contacts[i].website : "N/A");
        $('.contact-address').text(obj.contacts[i].address != null && obj.contacts[i].address != "" ? obj.contacts[i].address : "N/A");
    }
};
function validateName() {
    let name = $("#name").val();
    if (name != "") {
        $('#nameError').text("");
        return true;
    }
    else {
        $('#nameError').text("Name is required");
        return false;
    }
}
;
function validateEmail() {
    let email = $("#email").val();
    const validMail = /^[a-zA-Z0-9.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9.]{2,}$/;
    if (validMail.test(email) || email == "") {
        $('#emailError').text("");
        return true;
    }
    else {
        $("#emailError").text("Enter Valid Email");
        return false;
    }
}
;
function validateMobile() {
    let mobile = $("#mobile").val();
    const validMobile = /^((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}$/;
    if ((validMobile.test(mobile)) || mobile == "") {
        if (mobile == "") {
            $('#mobileError').text("Mobile is required");
            return false;
        }
        else {
            $('#mobileError').text("");
            return true;
        }
    }
    else {
        $('#mobileError').text("Enter Valid Mobile");
        return false;
    }
}
;
function validateLandline() {
    let landline = $("#landline").val();
    const validLandline = /^[0-9]\d{2,4}-\d{6,8}$/;
    if (validLandline.test(landline) || landline == "") {
        $('#landlineError').text("");
        return true;
    }
    else {
        $('#landlineError').text("Enter Valid Landline");
        return false;
    }
}
;
