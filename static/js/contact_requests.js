requestsUrl = "http://127.0.0.1:8080/crud-server/api/v1/contact-form"
internshipUrl = "http://127.0.0.1:8080/crud-server/api/v1/internship/"

// Function to fetch data from the backend and populate the table
async function fetchData() {
    try {
        const response = await fetch(requestsUrl); // Replace with your API endpoint
        const data = await response.json();
        let enrichedData = []

        for (let elem of data) {
            elem.internship_name = await fetch(internshipUrl + elem.post_id).then(resp => resp.json()).then(json => json.name)
            enrichedData.push(elem)
        }

        // Call a function to populate the table with the fetched data
        populateTable(enrichedData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to populate the table with data
function populateTable(data) {
    const tableBody = document.querySelector('#data-table tbody');
    console.log(data)

    data.forEach(item => {
        const row = tableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4)

        console.log(item)
        cell1.textContent = item.internship_name
        cell2.textContent = item.telegram;
        cell3.textContent = item.type;
        cell5.textContent = item.name;

        const resolveButton = document.createElement('button');
        resolveButton.textContent = 'Resolve';
        resolveButton.onclick = function () {
            resolveIssue(item.id);
        };

        cell4.appendChild(resolveButton);
    });
}

// Function to handle the "Resolve" button click
async function resolveIssue(id) {
    await fetch(requestsUrl + "/" + id, {
        method: 'DELETE'
    })
    location.reload()
}

// Fetch data when the page loads
fetchData();