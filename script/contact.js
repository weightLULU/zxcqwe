function openContactsModal() {
    var contactsModal = document.getElementById("contactsModal");
    contactsModal.style.display = "block";
}

function closeContactsModal() {
    var contactsModal = document.getElementById("contactsModal");
    contactsModal.style.display = "none";
}

window.onresize = function () {
    var contactsModal = document.getElementById("contactsModal");
    if (contactsModal.style.display === "block") {
        contactsModal.style.left = "50%";
        contactsModal.style.top = "50%";
        contactsModal.style.transform = "translate(-50%, -50%)";
    }
}

