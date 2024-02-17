internshipsUrl = "http://global-opportunities.duckdns.org:30434/crud-server/api/v1/internship"
contactUrl = "http://global-opportunities.duckdns.org:30434/crud-server/api/v1/contact-form"

function createInternshipList() {
    let parent = document.getElementsByClassName('cards')[0];

    return fetch(internshipsUrl, {redirect: "follow"})
        .then(response => response.json())
        .then(internshipList => internshipList
            .forEach(internship => parent.appendChild(createInternshipElement(internship))))
}

function createInternshipElement(internshipData) {
    let cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    // Create the thumbnail div and add content
    let thumbnailDiv = document.createElement('div');
    thumbnailDiv.className = 'thumbnail';
    let h4 = document.createElement('h4');
    h4.textContent = internshipData.name;
    let internshipId = internshipData.id
    thumbnailDiv.appendChild(h4);

    // Create the card-text div and add content
    let cardTextDiv = document.createElement('div');
    cardTextDiv.className = 'card-text';
    cardTextDiv.textContent = internshipData.description;

    // Create the card-buttons div and its children
    let cardButtonsDiv = document.createElement('div');
    cardButtonsDiv.className = 'card-buttons';

    let cardButton1 = document.createElement('div');
    cardButton1.className = 'card-button-1 hover-effect add-cursor';
    cardButton1.textContent = 'Consult';
    // cardButton1.id = "form-container"
    cardButton1.onclick = function() {

        //enableOverlay()

        let overlay = document.createElement("div")
        overlay.id = "dark-overlay"
        const formContainer = document.createElement("div");
        formContainer.id = "form-container";


        // Create form element
        const form = document.createElement("form");
        let header = document.createElement("h1");
        header.innerText = "Request for paid service"
        form.appendChild(header)
        form.id = "myForm";
        price = document.createElement("p")
        price.textContent = "One consultation is 1000 rubbles"
        form.appendChild(price)
        form.appendChild(document.createElement("p"))

        form.appendChild(document.createElement("br"))
        form.appendChild(document.createElement("br"))

        // Create Name input
        const nameLabel = document.createElement("label");
        nameLabel.textContent = "Your name:";
        form.appendChild(nameLabel);

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.id = "name";
        nameInput.name = "name";
        nameInput.required = true;
        nameInput.style.width = "100%"
        form.appendChild(nameInput);
        form.appendChild(document.createElement("br"));

        // Create Email input
        const telegramLabel = document.createElement("label");
        telegramLabel.textContent = "Your telegram:";
        form.appendChild(telegramLabel);

        const telegramInput = document.createElement("input");
        telegramInput.type = "text";
        telegramInput.id = "telegram";
        telegramInput.name = "telegram";
        telegramInput.style.width = "100%"
        telegramInput.required = true;
        form.appendChild(telegramInput);
        form.appendChild(document.createElement("br"));

        // Create Submit button
        const submitButton = document.createElement("button");
        submitButton.type = "button";

        form.appendChild(document.createElement("br"))
        submitButton.textContent = "Submit";
        submitButton.onclick = function() {
            submitForm(internshipId)
        }
        form.appendChild(submitButton);

        form.appendChild(document.createElement("br"));
        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.textContent = "Close"
        closeButton.onclick = closeForm;
        form.appendChild(closeButton);

        // Clear previous content and append the form
        // formContainer.innerHTML = '';
        formContainer.appendChild(form);
        overlay.appendChild(formContainer)
        document.body.appendChild(overlay)
        document.body.style.overflow = "hidden";

        // Show the shadowed form
        // shadowContainer.style.display = "flex";
    }

    function submitForm(internshipId) {
        const form = document.getElementById("myForm");
        const formData = new FormData(form);
        const jsonData = {};

        formData.forEach((value, key) => {
            jsonData[key] = value;
        });
        console.log(JSON.stringify(jsonData))
        jsonData['id'] = internshipId;
        jsonData['type'] = 'internship';

        fetch(contactUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })

        // Closing the form after submission
        closeForm();
    }

    function closeForm() {
        const shadowContainer = document.getElementById("dark-overlay");
        shadowContainer.remove()
        document.body.style.overflow = "";
    }

    let cardBottomText = document.createElement('p');
    cardBottomText.className = 'card-bottom-text';
    cardBottomText.textContent = 'Indefinite';

    // Append child elements to their respective parent elements
    cardButtonsDiv.appendChild(cardButton1);

    cardDiv.appendChild(thumbnailDiv);
    cardDiv.appendChild(cardTextDiv);
    cardDiv.appendChild(cardButtonsDiv);
    cardButtonsDiv.appendChild(cardBottomText);

    return cardDiv
}


createInternshipList();