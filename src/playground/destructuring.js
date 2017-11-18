// const person = {
//     name: 'Arthur',
//     age: 41,
//     location:{
//         city: 'Round Rock',
//         temp: 73
//     }
// };

// const {name, age, location:{ city, temp} } = person;

// console.log(`${name} is ${age}, ${city}, ${temp}`);

// const { city, temp} = person.location;
// if(city && temp){
//     console.log(`The current temp in ${city} is ${temp}`)
// } 

// const book = {
//     title: "Ego is the enemy",
//     author: "Ryan Holiday",
//     publisher: {
//         // name: "Peguin"
//     }
// };

// const {name: publishername = "Self-Published"} = book.publisher;

// console.log(`${publishername}`);


//
//Object Destructuring
//

// const address = [ '8834 Mays Street', 'Round Rock', 'Texas', '78664'];

// const [ street, city, state, zipcode] = address

// console.log(`You are in ${city}, ${state}`);

const item = [ 'Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const[ drink, ,medium,] = item;
console.log(`A medium ${drink} costs ${medium}.`);