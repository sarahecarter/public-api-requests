//variables
const url = 'https://randomuser.me/api/?results=12&nat=us&inc=name,location,email,dob,phone,picture&noinfo';
let gallery = document.getElementById('gallery');


//initialize array to store employee data
let employees = [];


//fetch data from api
fetch(url) 
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err));


//create cards using displayEmployees function
function displayEmployees(employeeData) {
    //add employee data to employees array
    employees = employeeData;

    //initialize HTML
    let directoryHTML = '';

    //loop through employee data and create a card for each
    employees.forEach((employee, index) => {
        
        //create card for each employee
        directoryHTML += `
        <div class="card" data-index="${index}">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        </div>
        `
    });

    //add directoryHTML into the gallery
    gallery.insertAdjacentHTML('beforeend', directoryHTML);


}

//create modal 
//takes index number of employee in array and displays that info
function displayModal(employeeIndexNumber) {
    //get that employee
    let employee = employees[employeeIndexNumber];

    //create date
    let date = new Date(employee.dob.date);

    //for formatting phone number
    let phoneNumber = formatPhone(employee.phone);

    //initialize modal HTML 
    let modalHTML = `
    
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.city}</p>
                <hr>
                <p class="modal-text">${phoneNumber}</p>
                <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                <p class="modal-text">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
            </div>
        </div>

        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
    `;

    //append HTML to the page
    gallery.insertAdjacentHTML('beforeend', modalHTML);

    //event listener to close modal
    let modalClose = document.getElementById('modal-close-btn');
    let modal = document.querySelector('.modal-container');
    modalClose.addEventListener('click', () => {
        modal.remove();
    })
}

//format phone number
function formatPhone(phoneNumber) {
   //take phone number an replace () and - 
   let unformatted = phoneNumber.replace(/\D/g, '');
   //reformat phone number
   let formatted = '(' + unformatted.substring(0,3) + ') ' + unformatted.substring(3,6) + '-' + unformatted.substring(6,10);
   return formatted;
}

//listen for clicks on cards and display modal
gallery.addEventListener('click', (e) => {
    if (e.target.closest(".card")) {
        let card = e.target.closest(".card");
        let cardIndex = card.getAttribute('data-index');
        //displayModal function
        displayModal(cardIndex);
    }
})





