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


    // Button for grabbing and submitting route information
    $("#submit").on("click", event => {
        event.preventDefault();
        console.log("clicked");

        // Grabs user input
        let departureStation = $('#departureStationInput').val();
        $('#departureStationInput').val('');

        var routeNumber = $("#routeNumberInput").val().trim();
        $('#routeNumberInput').val('');

        var departureTime = moment($("#departureTimeInput").val().trim(), "hh:mm").format("h:mm a");
        $('#departureTimeInput').val('');

        var frequency = $("#frequencyInput").val().trim();
        $('#frequencyInput').val('');


        // Creates local "temporary" object for holding route data
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


        //updates the database with the new routes
        db.ref('Departure Times').push(newRoute);
    });

    // Create Firebase event for adding routes to the database and a row in the html with the information

    //display a snapshot of the current database
    db.ref('Departure Times').on("child_added", function (dbSnapshot) {
        console.log(dbSnapshot.val());

        // Store user input into individual variables.
        var departureStation = dbSnapshot.val().departureStation;
        // console.log(departureStation);
        var routeNumber = dbSnapshot.val().routeNumber;
        // console.log(routeNumber);
        var departureTime = dbSnapshot.val().departureTime;
        // console.log(departureTime);
        var frequency = dbSnapshot.val().frequency;
        console.log("frequency", frequency);

        // To calculate the minutes away
        const timeNow = moment();
        const timeLater = moment().add(frequency, 'minutes');
        console.log("time now", timeNow.format('hh:mm:ss'));
        console.log("time plus frequency", timeLater.format('hh:mm:ss'));

        const difference = timeNow.diff(timeLater, 'minutes');
        console.log("dif", difference);

        const detailedDate = moment().format('MMMM YYYY dddd, hh:mm:ss');
        console.log(detailedDate);


        //adds variable values into a new row within our table
        var newRow = $("<tr>").append(
            $("<td>").text(departureStation),
            $("<td>").text(routeNumber),
            $("<td>").text(departureTime),
            $("<td>").text(frequency),
            $("<td>").text(difference),
        );
        // Append the new row to the table
        $("#route-table > tbody").append(newRow);

    })






});