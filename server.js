const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let user = {
    driver: "Shailja",
    dataSentIndex: 0,
    status: "paused",
    intervalStatus: null
}

let locationData = [
    {
        lat: "32",
        long: "43"
    },{
        lat: "45",
        long: "56"
    }, {
        lat: "89",
        long: "90"
    }, {
        lat: "32",
        long: "43"
    },{
        lat: "45",
        long: "56"
    }, {
        lat: "89",
        long: "90"
    }, {
        lat: "32",
        long: "43"
    },{
        lat: "45",
        long: "56"
    }, {
        lat: "89",
        long: "90"
    }, {
        lat: "32",
        long: "43"
    },{
        lat: "45",
        long: "56"
    }, {
        lat: "89",
        long: "90"
    }, {
        lat: "32",
        long: "43"
    },{
        lat: "45",
        long: "56"
    }, {
        lat: "89",
        long: "90"
    }, {
        lat: "32",
        long: "43"
    },{
        lat: "45",
        long: "56"
    }, {
        lat: "89",
        long: "90"
    }, {
        lat: "32",
        long: "43"
    },{
        lat: "45",
        long: "56"
    }, {
        lat: "89",
        long: "90"
    }, {
        lat: "32",
        long: "43"
    },{
        lat: "45",
        long: "56"
    }, {
        lat: "89",
        long: "90"
    }, {
        lat: "32",
        long: "43"
    },{
        lat: "45",
        long: "56"
    }, {
        lat: "89",
        long: "90"
    }, {
        lat: "32",
        long: "43"
    },{
        lat: "45",
        long: "56"
    }, {
        lat: "89",
        long: "90"
    }, {
        lat: "32",
        long: "43"
    },{
        lat: "45",
        long: "56"
    }, {
        lat: "89",
        long: "90"
    }, {
        lat: "32",
        long: "43"
    },{
        lat: "45",
        long: "56"
    }
]

app.get("/", (req, res) => {
    console.log("Sending HTML File...");
    res.sendFile(__dirname + "/index.html");
});

io.on('connection', function(socket){
    console.log('A new user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on("start", () => {
        console.log("Sending new locations...");
        user.intervalStatus = setInterval(() => {
            if (user.dataSentIndex < locationData.length) {
                console.log("Location Sent : ", locationData[user.dataSentIndex]);
                io.emit("location", JSON.stringify(locationData[user.dataSentIndex++]));
            } else {
                console.log("All Locations Sent. No more data available...");
                clearInterval(user.intervalStatus);
                user.intervalStatus = null;
                io.emit("noMoreData", "No Data Available");
            }
        }, 1000);
    });
    
    socket.on("pause", () => {
        console.log("Pausing location broadcasting...");
        clearInterval(user.intervalStatus);
        user.intervalStatus = null;
        console.log("Location Broadcasting Paused");
    });

    socket.on("reset", () => {
        console.log("Reseting the stats of locations sent...");
        user.dataSentIndex = 0;
        console.log("Data resetting done...");
    })
});


server.listen(4989, () => {
    console.log("Server Started on port : 4989. \nVisit http://localhost:4989");
});