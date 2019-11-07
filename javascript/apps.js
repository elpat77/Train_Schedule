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
    setInterval(timer, 60000);



    // Button for grabbing and submitting route information
    $("#submit").on("click", event => {
        event.preventDefault();
        console.log("clicked");

        // Grabs user input
        let departureStation = $('#departureStationInput').val();
        $('#departureStationInput').val('');

        var routeNumber = $("#routeNumberInput").val().trim();
        $('#routeNumberInput').val('');

        var departureTime = $("#departureTimeInput").val().trim();
        $('#departureTimeInput').val('');

        // var departureTime = moment($("#departureTimeInput").val().trim(), "hh:mm").format("h:mm a");
        // $('#departureTimeInput').val('');

        var frequency = $("#frequencyInput").val().trim();
        $('#frequencyInput').val('');

        //create an alert if the fields are not filled
        if ((departureStation === '') || (routeNumber === '') ||
            (departureTime === '') || (frequency === '')) {
            alert('Please fill out all the fields');
            return false;
        }


        // Creates local "temporary" object for holding route data
        var newRoute = {
            departureStation: departureStation,
            routeNumber: routeNumber,
            departureTime: departureTime,
            frequency: frequency
        };


        //updates the database with the new routes
        db.ref('Departure Times').push(newRoute);
    });

    // Create Firebase event for adding routes to the database and a row in the html with the information

    //display a snapshot of the current database
    function showInformation() {
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


            // First Time (pushed back 1 year to make sure it comes before current time)
            var firstTimeConverted = moment(departureTime, "HH:mm").subtract(1, "years");
            console.log(firstTimeConverted);

            //current time
            const timeNow = moment();
            $(".time-header").html("The current time is " + (moment(timeNow).format("hh:mm a")));
            console.log("time now", timeNow.format('hh:mm:ss'));

            //time later= current time + frequency
            const timeLater = moment().add(frequency, 'minutes');
            console.log("time plus frequency", timeLater.format('hh:mm:ss'));

            //difference between times
            const difference = moment().diff(moment(firstTimeConverted), "minutes");
            console.log("dif", difference);

            //remainder of times apart
            const remaining = difference % frequency;
            console.log("rem", remaining)

            // minutes until next bus
            var minutesArrival = frequency - remaining;
            console.log("minutes for arrival: " + minutesArrival);
            if (minutesArrival === 1) {
                minutesArrival = "Your bus is arriving soon!";
            }

            // next arrival
            var nextArrival = moment().add(minutesArrival, "minutes");
            console.log("arrival time: " + moment(nextArrival).format("hh:mm a"));

            //adds variable values into a new row within our table
            var newRow = $("<tr>").append(
                $("<td>").text(departureStation),
                $("<td>").text(routeNumber),
                $("<td>").text(frequency + " minutes"),
                $("<td>").text(moment(nextArrival).format("h:mm a")),
                $("<td>").text(minutesArrival),
            );
            // Append the new row to the table
            $("#route-table > tbody").append(newRow);

        })

    }
    function timer() {
        $('#displayInfo').empty();
        showInformation();
        console.log('arrival time has been updated');
    }
    showInformation();


});
