
document.getElementById('guestbookForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    fetch('https://mqjwe5d97j.execute-api.us-east-1.amazonaws.com/GuestBook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, message })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('responseMessage').innerText = 'Your entry has been submitted!';
        document.getElementById('guestbookForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('responseMessage').innerText = 'There was an error submitting your entry. Please try again.';
    });
});

function loadEntries() {
    fetch('https://mqjwe5d97j.execute-api.us-east-1.amazonaws.com/Entries')
        .then(response => response.json())
        .then(data => {
            data.forEach(entry => {
                const entryElement = document.createElement('div');
                entryElement.textContent = `${entry.name}: ${entry.message} (at ${entry.timestamp})`;
                document.body.appendChild(entryElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

loadEntries(); // Load entries when the page is loaded
