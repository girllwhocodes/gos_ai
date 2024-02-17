pictureUploadUrl = "http://global-opportunities.duckdns.org:30434/crud-server/api/v1/picture/upload/"
createScholarshipUrl = "http://192.168.0.106:8000/crud-server/api/v1/scholarship/"


document.getElementById('create_scholarship').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch(createScholarshipUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.get('scholarshipName'),
            description: formData.get('scholarshipDescription')
        }),
    })
        .then(response => response.json())
        .then(response => {
            formData.append('scholarship_id', response.id);
            formData.delete('scholarshipName');
            formData.delete('scholarshipDescription');
            return fetch(pictureUploadUrl, {
                method: 'POST',
                body: formData
            })
        })
        .then(response => {
            // Handle response from the second request
            console.log('Second request response:', response);
            // If needed, perform further actions with the second response
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
        });
});
