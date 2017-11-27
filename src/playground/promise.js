const promise = new Promise((resolve, reject) => {
    // setTimeout(() => {
    //     resolve('This is my resolved data');
    // }, 5000);

    setTimeout(() => {
        reject('Something Went Wrong');
    }, 5000);
    
    
});

console.log('before');

// promise.then((data) => {
//     console.log('1', data);
// }, (error) => {
//     console.log('error: ', error);
// });

promise.then((data) =>{
    console.log('1', data);
}).then(() => {
    console.log('Does this work?');
}).catch((error) => {
    console.log('error: ', error);
});

console.log('after');