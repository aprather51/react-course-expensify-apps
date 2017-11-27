import * as firebase from 'firebase';

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyBKvluhKjqdY3YCUw2UkmQrdPBeyqQsekw",
    authDomain: "expensify-b2adf.firebaseapp.com",
    databaseURL: "https://expensify-b2adf.firebaseio.com",
    projectId: "expensify-b2adf",
    storageBucket: "expensify-b2adf.appspot.com",
    messagingSenderId: "788664186064"
  };
  firebase.initializeApp(config);
  const database = firebase.database();
//-------------------------------------------------------------------------------

//*** on_removed***/
database.ref('expenses').on('child_removed', (snapshot) => {
    console.log(snapshot.key, snapshot.val())
  });
  
  //*** on child_changed***/
  database.ref('expenses').on('child_changed', (snapshot) => {
    console.log(snapshot.key, snapshot.val())
  });
  
  //*** on child_added***/
  database.ref('expenses').on('child_added', (snapshot) => {
    console.log(snapshot.key, snapshot.val())
  });
  
  //*** Subscription on changes ***//
  // database.ref('expenses').on('value', (snapshot) => {
  //   const expense = []; //show expense array
  
  //   snapshot.forEach((childSnapshot) => {
  //     expense.push({
  //       id: childSnapshot.key,
  //       ...childSnapshot.val() //show we do not know what is in array.
  //     });
  //   });
  //   console.log(expense);
  // });
  
  // database.ref('expenses')
  //   .once('value')
  //   .then((snapshot) => {
  //     const expense = []; //show expense array
  
  //     snapshot.forEach((childSnapshot) => {
  //       expense.push({
  //         id: childSnapshot.key,
  //         ...childSnapshot.val() //show we do not know what is in array.
  //       });
  //     });
  //     console.log(expense);
  //   });
  
  
  
  // *** Push Database ***//
  // database.ref('expenses').push({
  //   description: 'Rent',
  //   note: '',
  //   amount: 150000,
  //   createAt: 1020305
  // })
  
  // database.ref('expenses').push({
  //   description: 'Food',
  //   note: '',
  //   amount: 16798,
  //   createAt: 325145268128
  // });
  
  // database.ref('expenses').push({
  //   description: 'Gum',
  //   note: '',
  //   amount: 125,
  //   createAt: 4415225788115618
  // });
  
  
  // *** Push/Create ***//
  // database.ref('notes').push({
  //   title: 'Learning Firebase',
  //   body: 'Whatever will make me happy in firebase.'
  // });
  
  // database.ref('notes').push({
  //   title: 'Course Objective',
  //   body: 'React Native, Vue, Ux'
  // });
  
  // *** Update ***//
  // database.ref('notes/-KzZYAytcJ692xT427wP').update({
  //   body: 'Firebase is absolutely awesome.'
  // });
  
  // *** Remove ***//
  // database.ref('notes/-KzZYAytcJ692xT427wP').remove();
  
  //**** Test - Making Comments (console.log)  *****/
    // database.ref().on('value', (snapshot) => {
    //   const val = snapshot.val();
    //   console.log(`${val.name} is a ${val.job.title} working at/as ${val.job.company}`)
    // });
  
  
  //**** CREATE ******/
  //  database.ref().set({
  //       name: 'Arthur Prather',
  //       age: 41,
  //       stressLevel: 5,
  //       job: {
  //         title: 'Web Developer',
  //         company: 'Freelancer'
  //       },
  //       location: {
  //         city: 'Round Rock',
  //         state: 'Texas',
  //         country: 'United States'
  //       }
  //   }).then(() => {
  //     console.log('Data is saved');
  //   }).catch((e) => {
  //     console.log('This failed', e);
  //   });
  
  //**** UPDATE ******/
  // database.ref().update({
  //   'stressLevel': 9,
  //   'job/company': 'Amazon',
  //   'location/city': 'Seattle',
  //   'location/state': 'Washington'
  // }).then(() => {
  //     console.log('Sucessfully updated!')
  //   }).catch((e) => {
  //     console.log('Failed, unable to update!', e)
  //   });
  
  //**** FETCH with in real time *****/
  // const onValueChange = database.ref().on('value',(snapshot) => {
  //   console.log(snapshot.val());
  // }, (e) => {
  //   console.log('Error with data fetching', e);
  // });
  
  
  
  // setTimeout(() => {
  //   database.ref('age').set(42)
  // }, 3500);
  
  // setTimeout(() => {
  //   database.ref().off(onValueChange);
  // }, 7000);
  
  // // setTimeout(() => {
  // //   database.ref('age').set(43)
  // // }, 7000);
  
  // setTimeout(() => {
  //   database.ref('age').set(43)
  // }, 10500);
  
  //**** FETCH *****/
  // database.ref('name')
  //   .once('value')
  //   .then((snapshot) => {
  //     const val = snapshot.val();
  //     console.log(val)
  //   }).catch((e) => {
  //     console.log('Error fetching data', e)
  //   });
  
  
  
  //**** REMOVE ******/
  // database.ref('location/city').remove().then(() => {
  //   console.log('Successfully removed from database!');
  // }).catch((e) => {
  //   console.log('Failed, unable to remove from database!', e);
  // });
  
  //**** REMOVE (NULL) *****/
  //database.ref('isSingle').set(null);
  
  
    // database.ref('age').set(42);
    // database.ref('location/city').set('Dallas');
  
    // database.ref('attributes').set({
    //   height: 72,
    //   weight: 350
    // }).then(() =>{
    //   console.log('Data Successfully Added!');
    // }).catch((e) => {
    //   console.log('Data Failed to Add!', e);
    // })