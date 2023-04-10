// step 1:check if it is connected properly
// console.log('connected')

// step 2:load api
//note: when using asynce we have to use await for response and data
const loadphones = async (searchText, datalimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();

    //step 2.1:check if the data is showing in console
    // console.log(data.data);

    //step 2.2: if data is showing in console.log send it to display function
    diplayphones(data.data, datalimit);
    //step 4.5:
}
//step 3: we have to call the function to get the activity from the function

// loadphones();
//commented to not load before search

//step 4: to display phones from api after loading them

const diplayphones = (phones, datalimit) => {
    //step 4.1: check if the data is getting properly in console
    // console.log(phones)

    //step 5:get the div container to display the content
    const phoneContainer = document.getElementById('phones-container')

    //step 5.1: clear the field after search result
    phoneContainer.textContent = '';

    //get showall btn by id
    const showAll = document.getElementById('show-all');

    //show all button condition
    if (datalimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }

    //display 10 phones only
    // phones = phones.slice(0, 10);

    //display no phone found msg
    //bring msg element by id
    const nophonemsg = document.getElementById('no-found-msg');

    //condition apply
    if (phones.length === 0) {
        nophonemsg.classList.remove('d-none')
    }
    else {
        nophonemsg.classList.add('d-none')
    }
    //step 6:get every phone from phones data using for each as it is an array
    phones.forEach(phone => {
        // console.log(phone)

        // step 7 : create new element div to create div of new phone from array
        const phonediv = document.createElement('div')
        phonediv.classList.add('col')
        phonediv.innerHTML = ` 
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show details</button>
             
        
            </div>
        </div>
        `
        phoneContainer.appendChild(phonediv);

    });
    //stop loader
    toggleSpinner(false)
}

//search function
document.getElementById('btn-search').addEventListener('click', function () {
    // console.log('clicked')

    processSearch(10)
})
//enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key == 'Enter') {
        processSearch(10)
    }
})

//loading function

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

//showall function
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})

//process search common function

const processSearch = (datalimit) => {
    //start loader
    toggleSpinner(true);

    const searchfield = document.getElementById('search-field')
    const searchText = searchfield.value;
    loadphones(searchText, datalimit);
}

//load phone details
const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phonedetailsdiv = document.getElementById('phone-details');
    phonedetailsdiv.innerHTML = `<p>Release date: ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
    <p>features:${phone.mainFeatures ? phone.mainFeatures.storage : 'no features mentioned'}</p>`
}
