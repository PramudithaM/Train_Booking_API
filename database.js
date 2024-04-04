var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let stationsdb = new sqlite3.Database(DBSOURCE, (err) => {
  if (err){
      // cannot open database
      console.error(err.message);
      throw err;
  }else{
      console.log("Connected to the SQlite Station Database.");
      stationsdb.run(
        `CREATE TABLE stations(
              stationsId INTEGER PRIMARY KEY AUTOINCREMENT,
              stationsName text, 
              stationsCode text
              )`,
        (err) => {
          if (err) {
            // Table already created
          } else {
            // Table just created, creating some rows
            var insert =
              "INSERT INTO stations (stationsName,stationsCode) VALUES (?,?)";
            stationsdb.run(insert, [
              "Polonnaruwa",
              "PL001"
            ]);
          }
        }
    );
  }
});

let traindb = new sqlite3.Database(DBSOURCE, (err) => {
if (err){
    // cannot open database
    console.error(err.message);
    throw err;
}else{
    console.log("Connected to the SQlite Train Database.");
    traindb.run(
        `CREATE TABLE trains(
              trainId INTEGER PRIMARY KEY AUTOINCREMENT,
              trainName text,
              trainCode text,
              trainStart text,
              trainStop text,
              trainTime text,
              trainDescription text
              )`,
        (err) => {
          if (err) {
            // Table already created
          } else {
            // Table just created, creating some rows
            var insert =
              "INSERT INTO trains (trainName,trainCode,trainStart,trainStop,trainTime,trainDescription) VALUES (?,?,?,?,?,?)";
            traindb.run(insert, [
              "PL-TR-001",
              "TR-001",
              "Polonnaruwa",
              "Colombo",
              "07.00 AM",
              "Train Stop Stations Polonnaruwa,Mahawa,Kurunagala,Polgahawela,Colombo"
            ]);
          }
        }
    );
}
});

module.exports = stationsdb,traindb;