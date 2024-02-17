

scholarshipsUrl = `http://global-opportunities.duckdns.org:30434/crud-server/api/v1/scholarship`
imagesUrl = `http://global-opportunities.duckdns.org:30434/crud-server/api/v1/picture/download/`

function createScholarshipList() {
    let parent = document.getElementById('scholarships');
    let scholarshipsDiv = document.createElement('div');
    scholarshipsDiv.classList.add('row');


    fetch(scholarshipsUrl, {redirect: "follow"})
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(scholarshipsList => scholarshipsList
            .forEach(scholarship => scholarshipsDiv.appendChild(createScholarshipElement(scholarship))))
    parent.appendChild(scholarshipsDiv)
}

function createScholarshipElement(scholarshipData) {
    const divFeature = document.createElement('div');
    divFeature.classList.add('feature', 'd-flex');

    const iFeatureIcon = document.createElement('i');
    iFeatureIcon.classList.add('feature__icon');
    const img = document.createElement('img');
    img.src = imagesUrl + scholarshipData.id;
    img.height = 185
    img.width = 185
    iFeatureIcon.appendChild(img);

    const divFeatureBlock = document.createElement('div');
    divFeatureBlock.classList.add('feature__block');

    const h3FeatureTitle = document.createElement('h3');
    h3FeatureTitle.classList.add('feature__title');
    h3FeatureTitle.textContent = scholarshipData.name;

    const pFeatureText = document.createElement('p');
    pFeatureText.classList.add('feature__text');
    pFeatureText.innerHTML = scholarshipData.description;
    iFeatureIcon.appendChild(img);
    divFeatureBlock.appendChild(h3FeatureTitle);
    divFeatureBlock.appendChild(pFeatureText);

    divFeature.appendChild(iFeatureIcon);
    divFeature.appendChild(divFeatureBlock);

    return divFeature
}


createScholarshipList();