//variables
let url = 'https://randomuser.me/api/?results=12';
//fetch data from api
fetch(url) 
    .then(res => res.json())
    .then(res => console.log(res))


//create cards
//create modal 
//display modal on click