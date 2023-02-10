var mode;
var contacts = [];
var counter = 0;
var contactList;
function storage() {
    var contact = localStorage.getItem("contacts");
    if (contact != null) {
        contacts = JSON.parse(contact);
    }
    if (contacts == null) {
        contacts = [];
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }
}
function contactNotNull() {
    if (contacts != null) {
        displayDetails(counter);
    }
}
$(document).ready(function () {
    storage();
    display();
    contactNotNull();
    $("#add").click(function (e) {
        e.preventDefault();
        mode = "new";
        render();
    });
    $("#addButton").click(function (e) {
        e.preventDefault();
        var name = validateName();
        var email = validateEmail();
        var mobile = validateMobile();
        var landline = validateLandline();
        $(".error-msg").show();
        if ((name && email && mobile && landline)) {
            if (confirm("Are you sure you want to add the contact?") == true) {
                contacts.push({
                    name: $('#name').val(),
                    email: $('#email').val(),
                    mobile: $('#mobile').val(),
                    landline: $('#landline').val(),
                    website: $('#website').val(),
                    address: $('#address').val()
                });
            }
            ;
            localStorage.setItem('contacts', JSON.stringify(contacts));
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
        var name = validateName();
        var email = validateEmail();
        var mobile = validateMobile();
        var landline = validateLandline();
        $(".error-msg").show();
        if ((name && email && mobile && landline)) {
            if (confirm("Are you sure you want to update the data?") == true) {
                contacts[counter] = {
                    name: $('#name').val(),
                    email: $('#email').val(),
                    mobile: $("#mobile").val(),
                    landline: $('#landline').val(),
                    website: $('#website').val(),
                    address: $('#address').val()
                };
                $(".form-wrapper").hide();
                localStorage.setItem('contacts', JSON.stringify(contacts));
                display();
                alert(contacts[counter].name + "'s data is updated");
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
            contacts.splice(counter, 1);
            $('.detailed-contact').css("display", "none");
            localStorage.setItem('contacts', JSON.stringify(contacts));
            storage();
            display();
            if (contacts != null) {
                displayDetails(counter - counter);
            }
        }
    });
});
function display() {
    var list = document.querySelector("#list");
    var contactList = "";
    var i = 0;
    contacts.forEach(function (contact) {
        contactList += "<div class=list-item onclick=\"displayDetails(".concat(i, ")\" id=\"user").concat(i, "\">\n        <div class=\"item-name\">").concat(contact.name, "</div>\n        ").concat(contact.email != null && contact.email != "" ? "<div class='item-email'>" + "Email: " + contact.email + "</div>" : "", "\n        <div class=\"item-phnno\">").concat("Mobile: " + contact.mobile, "</div>\n        </div>");
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
        $('#name').val(contacts[counter].name);
        $('#email').val(contacts[counter].email);
        $('#mobile').val(contacts[counter].mobile);
        $('#landline').val(contacts[counter].landline);
        $('#website').val(contacts[counter].website);
        $('#address').val(contacts[counter].address);
    }
    else {
        display();
    }
}
var displayDetails = function (i) {
    counter = i;
    $("#user".concat(i)).addClass("selected-item");
    for (var j = 0; j < contacts.length; j++) {
        if (i !== j) {
            $("#user".concat(j)).removeClass("selected-item");
        }
    }
    if (contacts == null || contacts.length == 0) {
        $('.detailed-contact').hide();
    }
    else {
        $(".form-wrapper").hide();
        $('.detailed-contact').css("display", "block");
        $('.detailed-name').text(contacts[i].name != null && contacts[i].name != "" ? contacts[i].name : "N/A");
        $('.email').text(contacts[i].email != null && contacts[i].email != "" ? contacts[i].email : "N/A");
        $('.mobile').text(contacts[i].mobile);
        $('.landline').text(contacts[i].landline != null && contacts[i].landline != "" ? contacts[i].landline : "N/A");
        $('.website').text(contacts[i].website != null && contacts[i].website != "" ? contacts[i].website : "N/A");
        $('.contact-address').text(contacts[i].address != null && contacts[i].address != "" ? contacts[i].address : "N/A");
    }
};
function validateName() {
    var name = $("#name").val();
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
    var email = $("#email").val();
    var validMail = /^[a-zA-Z0-9.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9.]{2,}$/;
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
    var mobile = $("#mobile").val();
    var validMobile = /^((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}$/;
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
    var landline = $("#landline").val();
    var validLandline = /^[0-9]\d{2,4}-\d{6,8}$/;
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
