function openSupportModal() {
    const supportModal = document.getElementById('supportModal');
    supportModal.style.display = 'block';
    document.addEventListener('click', closeSupportModalOutside);
}

function closeSupportModal() {
    const supportModal = document.getElementById('supportModal');
    supportModal.style.display = 'none';
    document.removeEventListener('click', closeSupportModalOutside);
}

function submitSupportForm(event) {
    event.preventDefault();
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;
    const issueType = document.getElementById('issueType').value;
    const issueDescription = document.getElementById('issueDescription').value;
    const supportData = {
        name: userName,
        email: userEmail,
        type: issueType,
        description: issueDescription,
    };
    saveSupportRequest(supportData);
    closeSupportModal();
    document.getElementById('supportForm').reset();
}

function saveSupportRequest(data) {
    const supportRequests = JSON.parse(localStorage.getItem('supportRequests')) || [];
    supportRequests.push(data);
    localStorage.setItem('supportRequests', JSON.stringify(supportRequests));
}

function closeSupportModalOutside(event) {
    const supportModal = document.getElementById('supportModal');
    if (event.target === supportModal) {
        closeSupportModal();
    }
}



function redirectToShoesPage() {

    window.location.href = "./shoes.html";
}

