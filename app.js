var express         = require("express"),
    bodyParser      = require("body-parser"),
    mysql           = require("mysql"),
    methodOverride  = require("method-override");

var app             = express();

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bookmyseat"
});

db.connect(function(error){
    if(error){
        console.log(error);
    } else{
        console.log("Connected to the database");
    }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.redirect("/buses");
});


//landing page for routes
app.get("/buses", function(req, res){
    res.render("index");
});


//adding a new route
app.get("/buses/register", function(req, res){
    res.render("buses/register");
});

app.get("/buses/edit", function(req, res){
    res.render("buses/edit");
});

app.post("/buses/", function(req, res){
    var licence = req.body.licence;
    var companyName = req.body.companyName;
    var contactInfo = req.body.contactInfo;
    var seats = req.body.seats;
    var busType = req.body.busType;
    var email = req.body.email;

    // var email = req.body.email.split(" ");

    // if(routeStops.length===1){
    //     if(routeStops[0]===""){
    //         routeStops.pop();
    //     }
    // }
    //
    // routeStops.push(routeEnd);

    var sql = "INSERT INTO buses(Licence, company_name, contact_info,email,seats,bus_type) " +
        "VALUES(\"" + licence + "\", \"" + companyName + "\", \"" + contactInfo + "\",\""+email+"\",\""+seats+"\",\""+busType+"\");";

    db.query(sql, function(error, result){
        if(error){
            console.log(error);
        } else{
            console.log("Added bus to the database");
        }
        res.redirect("/");
    });
});

    // var sql2 = "SELECT route_id FROM route WHERE route_num=\"" + routeNum + "\" AND starT=\"" + routeStart + "\" AND end=\"" + routeEnd + "\";";

//     db.query(sql2, function(error, foundID){
//         if(error){
//             console.log(error);
//         } else{
//             var routeID = foundID[0].route_id;
//             for(var i=0; i<routeStops.length; i++){
//                 var sql3 = "INSERT INTO route_stop " +
//                     "VALUES(\"" + routeID + "\", \"" + routeStops[i] + "\", " + (i+1) + ");";
//                 db.query(sql3, function(error, stop){
//                     if(error){
//                         console.log(error);
//                     } else{
//                         console.log("Added stop to database");
//                     }
//                 });
//             }
//             res.redirect("/");
//         }
//     });
// });   this was moved upward/not needed


//Editing info on a route
app.get("/buses/:id/edit", function(req, res){
    var Licence = req.params.id;

    var sql1 = "SELECT * FROM buses WHERE Licence=\"" + Licence + "\";";
    // var sql2 = "SELECT * FROM route_stop WHERE Licence=\"" + Licence + "\";";

    db.query(sql1, function(error, buses){
        if(error){
            console.log(error);
        } else{
                    res.render("buses/edit", {bus: buses[0]});
                }
            });
    });


app.put("/buses/:id", function(req, res) {

    var LicenceNew = req.body.Licence;
    var companyNameNew = req.body.companyName;
    var ContactNew = req.body.Contact;
    var EmailNew = req.body.Email;
    var SeatsNew = req.body.Seats;
    var TypeNew = req.body.Type;

    // if (routeStopsNew.length === 1) {
    //     if (routeStopsNew[0] === "") {
    //         routeStopsNew.pop();
    //     }
    // }
    //
    // routeStopsNew.push(routeEndNew);

    var sql = "UPDATE buses SET company_name=\"" + companyNameNew + "\", contact_info=\"" + ContactNew + "\", email=\"" + EmailNew + "\" ,seats=\""+ SeatsNew+"\",bus_type=\"" + TypeNew+"\"WHERE Licence=\"" + LicenceNew + "\";";

    // var sqlDelete = "DELETE FROM route_stop " +
    //     "WHERE route_id=" + routeID + ";";

    db.query(sql, function (error, newBus){
        if (error) {
            console.log(error);
        } else{
                                    console.log("Updated the database");
                                }
                        res.redirect("/");
                });
});


//Deleting a route
app.delete("/buses/:id", function(req, res){
    var Licence = req.params.id;

    var sql1 = "DELETE FROM buses " +
        "WHERE Licence=" + Licence + ";";

    // var sql2 = "DELETE FROM route_stop " +
    //     "WHERE route_id=" + routeID + ";";

    db.query(sql1, function(error, deletedRoute){
        if(error){
            console.log(error);
        } else{
                    res.redirect("/");
                }
            });
});


//Search for a route
// app.get("/routes/search", function(req, res){
//     res.render("routes/search");

app.get("/routes/search/results", function(req, res){
    res.render("routes/results");
});

app.post("/index", function(req, res){
    // var routeNum = req.body.routeNumber;
    // var routeStart = req.body.routeStart;
    // var routeEnd = req.body.routeEnd;
    // var routeStop = req.body.routeStop;

    var sql = "SELECT * FROM buses ;";

    db.query(sql, function(error, results){
        if(error){
            console.log(error);
        } else{
            res.render("buses/results", {results: results});
        }
    });
});


app.listen("3000", function(){
    console.log("Server started...")
});
