//Variables
const url = 'https://randomuser.me/api/?results=12&nat=us&inc=name,location,email,dob,phone,picture&noinfo';
let gallery = document.getElementById('gallery');

//Initialize array to store employee data
let employees = [];


//Fetch data from api
fetch(url) 
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err));


//Create cards using displayEmployees function
function displayEmployees(employeeData) {
    //add employee data to employees array
    employees = employeeData;

    //initialize HTML
    let directoryHTML = '';

    //loop through employee data and create a card for each
    employees.forEach((employee, index) => {
        
        //card HTML
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



//Create modal based on employee index using displayModal function
function displayModal(employeeIndexNumber) {
    //get the employee data and store in employee variable
    let employee = employees[employeeIndexNumber];

    //format birthday 
    let date = new Date(employee.dob.date);

    //for formatting phone number
    let phoneNumber = formatPhone(employee.phone);

    //create modal HTML 
    let modalHTML = `
    
    <div class="modal-container">
        <div class="modal" data-index="${employeeIndexNumber}">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.city}</p>
                <hr>
                <p class="modal-text">${phoneNumber}</p>
                <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                <p class="modal-text">Birthday: ${date.getMonth() +1}/${date.getDate()}/${date.getFullYear()}</p>
            </div>
        </div>

        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
    `;

    //append modal HTML to the page
    gallery.insertAdjacentHTML('beforeend', modalHTML);

    //event listener to close modal
    let modalClose = document.getElementById('modal-close-btn');
    let modal = document.querySelector('.modal-container');
    modalClose.addEventListener('click', () => {
        modal.remove();
    })

    //variables for switching between cards
    let nextButton = document.getElementById('modal-next');
    let prevButton = document.getElementById('modal-prev');
    

    //event listener to switch to next employee
    nextButton.addEventListener('click', () => {
        //need to remove current modal before adding new one
        modal.remove();
        nextCard(employeeIndexNumber);
    })

    //event listener to switch to previous employee
    prevButton.addEventListener('click', () => {
        modal.remove();
        previousCard(employeeIndexNumber);
    })

}

//Next card function
function nextCard(index) {
    //check to make sure it is not the last card
    if (index < 11) {
        //add to index number
        index++;
        //display new modal
        displayModal(index); 
    } 
    //if last card is being displayed don't switch card
    else if (index === 11) {
        displayModal(index);
    }

}

//Previous card function
function previousCard(index) {
    //if first card is being displayed don't switch card
    if (index === 0) {
        displayModal(index);
    }
    //check to make sure it is not the first card
    else if (index > 0) {
        //add to index number
        index--;
        //display new modal
        displayModal(index); 
    } 
    
}

//Listen for clicks on cards and display corresponding modal
gallery.addEventListener('click', (e) => {
    if (e.target.closest(".card")) {
        let card = e.target.closest(".card");
        let cardIndex = card.getAttribute('data-index');
        displayModal(cardIndex);
    }
})

//Format phone number helper function
function formatPhone(phoneNumber) {
   //take phone number an replace () and - 
   let unformatted = phoneNumber.replace(/\D/g, '');
   //reformat phone number
   let formatted = '(' + unformatted.substring(0,3) + ') ' + unformatted.substring(3,6) + '-' + unformatted.substring(6,10);
   return formatted;
}


//Search functionality
let searchContainer = document.querySelector('.search-container');
//create search input
let searchHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
    `;

//Append search input 
searchContainer.insertAdjacentHTML('beforeend', searchHTML);

let searchInput = document.getElementById('search-input');
let employeeNames = document.getElementsByClassName('card-name');

//Add event listener to search input
searchInput.addEventListener('keyup', searchFilter);

//Search function
function searchFilter () {
    //store value from search input and convert to lowercase
    let searchValue = searchInput.value.toLowerCase();
    //loop through employee names
    [...employeeNames].forEach(employeeName => {
        let name = employeeName.textContent.toLowerCase();
        let card = employeeName.parentElement.parentElement;
        //if name includes search input value display card
        if (name.includes(searchValue)) {
            card.style.display = 'flex';
        } 
        //if search input doesn't match name hide the card
        else {
            card.style.display = 'none';
        }
    });
}


