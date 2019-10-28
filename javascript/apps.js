$(document).ready(function () {
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAyn5d3zmWaotm4nrIdRM5H9DcJmqZPU9g",
        authDomain: "train-schedule-af93c.firebaseapp.com",
        databaseURL: "https://train-schedule-af93c.firebaseio.com",
        projectId: "train-schedule-af93c",
        storageBucket: "train-schedule-af93c.appspot.com",
        messagingSenderId: "744170584113",
        appId: "1:744170584113:web:5c3ec4f66d7589a0c87d10"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    db.ref().on('value', snap => {
        console.log(snap.val());

    })

    db.ref('data2').set({
        data: [1, 2, 3, 4]
    });
    db.ref('data1').set({
        data: ["a", "b", "c", "d"]
    });

    // // //take user event from the on click-submit button and dumps it in the database
    // $('#text-submit').on('click', event => {
    //     event.preventDefault();
    //     console.log("I've been clicked");
    //     db.ref().set({
    //         text: $("#user-text").val()
    //     });
    // });
    // //takes the values from the db and dumps it back in our website
    // db.ref().on('value', snap => {
    //     console.log(snap.val());
    //     $('#db-text').html(snap.val().text);
    // })
});