"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.counter = void 0;
const services_1 = require("./services");
const services_2 = require("./services");
let mode;
exports.counter = 0;
let contactList;
let obj = new services_1.AddressBookService();
function contactNotNull() {
    if (services_2.contacts != null) {
        displayDetails(exports.counter);
    }
}
$(document).ready(function () {
    obj.AddressBookService();
    display();
    contactNotNull();
    $("#add").click(function (e) {
        e.preventDefault();
        mode = "new";
        render();
    });
    $("#addButton").click(function (e) {
        e.preventDefault();
        let name = validateName();
        let email = validateEmail();
        let mobile = validateMobile();
        let landline = validateLandline();
        $(".error-msg").show();
        if ((name && email && mobile && landline)) {
            if (confirm("Are you sure you want to add the contact?") == true) {
                obj.addContact({
                    name: $('#name').val(),
                    email: $('#email').val(),
                    mobile: $('#mobile').val(),
                    landline: $('#landline').val(),
                    website: $('#website').val(),
                    address: $('#address').val()
                });
            }
            ;
            localStorage.setItem('contacts', JSON.stringify(services_2.contacts));
            display();
            $(".form-wrapper").hide();
            $("#formDetails").trigger("reset");
            alert("Contact added successfully");
            contactNotNull();
        }
        ;
    });
    $('#editButton').click(function (e) {
        e.preventDefault();
        let name = validateName();
        let email = validateEmail();
        let mobile = validateMobile();
        let landline = validateLandline();
        $(".error-msg").show();
        if ((name && email && mobile && landline)) {
            if (confirm("Are you sure you want to update the data?") == true) {
                obj.updateContact({
                    name: $('#name').val(),
                    email: $('#email').val(),
                    mobile: $("#mobile").val(),
                    landline: $('#landline').val(),
                    website: $('#website').val(),
                    address: $('#address').val()
                });
                $(".form-wrapper").hide();
                localStorage.setItem('contacts', JSON.stringify(services_2.contacts));
                display();
                alert(services_2.contacts[exports.counter].name + "'s data is updated");
                contactNotNull();
            }
        }
    });
    $("#cancelButton").click(function (e) {
        e.preventDefault();
        $("#formDetails").trigger("reset");
        $(".error-msg").hide();
        $(".form-wrapper").hide();
        contactNotNull();
    });
    $("#edit").click(function (e) {
        e.preventDefault();
        mode = "edit";
        render();
    });
    $('#delete').click(function (e) {
        e.preventDefault();
        if (confirm("Are you sure you want to delete the contact?") == true) {
            services_2.contacts.splice(exports.counter, 1);
            $('.detailed-contact').css("display", "none");
            localStorage.setItem('contacts', JSON.stringify(services_2.contacts));
            obj.AddressBookService();
            display();
            if (services_2.contacts != null) {
                displayDetails(exports.counter - exports.counter);
            }
        }
    });
});
function display() {
    let list = document.querySelector("#list");
    let contactList = "";
    let i = 0;
    services_2.contacts.forEach((contact) => {
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
        $('#name').val(services_2.contacts[exports.counter].name);
        $('#email').val(services_2.contacts[exports.counter].email);
        $('#mobile').val(services_2.contacts[exports.counter].mobile);
        $('#landline').val(services_2.contacts[exports.counter].landline);
        $('#website').val(services_2.contacts[exports.counter].website);
        $('#address').val(services_2.contacts[exports.counter].address);
    }
    else {
        display();
    }
}
const displayDetails = (i) => {
    exports.counter = i;
    $(`#user${i}`).addClass("selected-item");
    for (let j = 0; j < services_2.contacts.length; j++) {
        if (i !== j) {
            $(`#user${j}`).removeClass("selected-item");
        }
    }
    if (services_2.contacts == null || services_2.contacts.length == 0) {
        $('.detailed-contact').hide();
    }
    else {
        $(".form-wrapper").hide();
        $('.detailed-contact').css("display", "block");
        $('.detailed-name').text(services_2.contacts[i].name != null && services_2.contacts[i].name != "" ? services_2.contacts[i].name : "N/A");
        $('.email').text(services_2.contacts[i].email != null && services_2.contacts[i].email != "" ? services_2.contacts[i].email : "N/A");
        $('.mobile').text(services_2.contacts[i].mobile);
        $('.landline').text(services_2.contacts[i].landline != null && services_2.contacts[i].landline != "" ? services_2.contacts[i].landline : "N/A");
        $('.website').text(services_2.contacts[i].website != null && services_2.contacts[i].website != "" ? services_2.contacts[i].website : "N/A");
        $('.contact-address').text(services_2.contacts[i].address != null && services_2.contacts[i].address != "" ? services_2.contacts[i].address : "N/A");
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
