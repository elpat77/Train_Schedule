$(document).ready(function () {
    // Your web app's Firebase configuration
    // const firebaseConfig = {
    //     apiKey: "AIzaSyAyn5d3zmWaotm4nrIdRM5H9DcJmqZPU9g",
    //     authDomain: "train-schedule-af93c.firebaseapp.com",
    //     databaseURL: "https://train-schedule-af93c.firebaseio.com",
    //     projectId: "train-schedule-af93c",
    //     storageBucket: "train-schedule-af93c.appspot.com",
    //     messagingSenderId: "744170584113",
    //     appId: "1:744170584113:web:5c3ec4f66d7589a0c87d10"
    // };
    // Initialize Firebase
    // firebase.initializeApp(firebaseConfig);
    // const db = firebase.database();


    // 2. Button for adding train information
    $("#submit").on("click", event => {
        event.preventDefault();
        console.log("clicked");

        // Grabs user input
        let departureStation = $('#departureStationInput').val();
        $('#departureStationInput').val('');

        var routeNumber = $("#routeNumberInput").val().trim();
        $('#routeNumberInput').val('');

        var departureTime = moment($("#departureTimeInput").val().trim(), "MM/DD/YYYY").format("X");
        $('#departureTimeInput').val('');

        var frequency = $("#frequencyInput").val().trim();
        $('#frequencyInput').val('');


        // Creates local "temporary" object for holding employee data
        var newRoute = {
            departureStation: departureStation,
            routeNumber: routeNumber,
            departureTime: departureTime,
            frequency: frequency
        };
        console.log("hello" + newRoute.departureStation);
        console.log("hello" + newRoute.routeNumber);
        console.log("hello" + newRoute.departureTime);
        console.log("hello" + newRoute.frequency);

        // db.ref().push(newEmp);
    })

    //     db.ref().on('value', snap => {
    //         console.log(snap.val());

    //     })

    //     db.ref('data2').set({
    //         data: [1, 2, 3, 4]
    //     });
    //     db.ref('data1').set({
    //         data: ["a", "b", "c", "d"]
    //     });

    //     const timeNow = moment();
    //     const timeLater = moment().add(20, 'minutes');

    //     console.log(timeNow.format('hh:mm:ss'));
    //     console.log(timeLater.format('hh:mm:ss'));

    //     console.log(timeNow.diff(timeLater, 'minutes'));


    //     const detailedDate = moment().format('MMMM YYYY dddd, hh:mm:ss');
    //     console.log(detailedDate);

    //     // //take user event from the on click-submit button and dumps it in the database
    //     $('#text-submit').on('click', event => {
    //         event.preventDefault();
    //         console.log("I've been clicked");
    //         db.ref().set({
    //             text: $("#user-text").val()
    //         });
    //     });
    //     //takes the values from the db and dumps it back in our website
    //     db.ref().on('value', snap => {
    //         console.log(snap.val());
    //         $('#db-text').html(snap.val().text);
    //     })
});