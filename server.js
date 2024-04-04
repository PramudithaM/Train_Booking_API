const express = require('express')

//import database
var db = require("./database");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(express.json());

//Enabling CORS
// const cors = require("cors");
// app.use(
//     cors({
//         exposedHeaders : ["Content-Length", "X-Foo", "Y-Bar"],
//         credentials : true,
//         origin : "*",
//     })
// )

// Start server
var HTTP_PORT = 3000;

app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

app.get('/allstations',(req, res, next) => {
  
  try{

    var sql = "SELECT * FROM stations";
    var params = [];

    //Running the sql Query
    db.all(sql,params,(err, rows) => {
      // Error respones
      if (err){
        res.status(400).json({error : err.message});
        console.log("Error")
      }else{
        //success respones
        console.log("GET Method Running Successfully.....");
        res.status(200).json({
          message : 'Success',
          data : rows,
        });
      }
    });

  }catch(E){
    res.status(400).send(E);
  }
});

app.post('/addstations',(req,res,next) => {
  try {
      const{stationsName,stationsCode}= req.body;

      //sql query to select all data
      var sql = "INSERT INTO stations(stationsName,stationsCode)VALUES (?,?)";
      var params = [stationsName,stationsCode];

      //Running the sql query
      db.all(sql,params,(err,rows) => {
          //Error Respones
          if (err){
              res.status(400).json({error : err.message});
          }else{
              //Success Respones
              db.get("SELECT last_insert_rowid() as lastId", (err, row) => {
                  if (err) {
                      return res.status(400).json({ error: err.message });
                  }

                  // Log the last inserted row ID
                  console.log("Post Method Running..... \n Last Station Id:", row.lastId);

                  // Success response with customer 
                  console.log("POST Method Runnig Successfully......")
                  res.status(201).json({
                      message: "Station " + stationsName + " has registered",
                      data:res.rows,
                      stationsId: row.lastId,
                      //'id':this.lastId,
                  });
              });
          }
      });
  } catch (E) {
      res.status(400).send(E);        
  }
  console.log('Post method running');
});

app.put('/updatestations/:id', (req,res,next) =>{
  try {

      const id = req.params.id;
      console.log(id);
  
      //Updat database querys
      const{stationsName,stationsCode} = req.body
      var sql = "UPDATE stations set stationsName = ?, stationsCode = ? WHERE id = ?";
      var params = [stationsName,stationsCode,id];
      //database update 
      db.run(sql,params,(err,rows) =>{
          if(err){
              return res.status(400).json({error: err.message});
          }else{
              console.log("PUT Method Running Successfully");
              res.status(200).json({
                  message:"success",
                  //data : row,
              });
          }
      });
  } catch (E) {
      res.status(400).send(E);
  }
  console.log("put method running");
});

app.delete('/deletestations/:id', (req,res,next) => {
  try {
      //const { id } = req.params;
      var params = req.params.id;
      // Delete from the database using a DELETE SQL query
      var sql = "DELETE FROM stations WHERE id=?";
      //var params = [id];
      db.run(sql, params, (err) => {
          if (err) {
              return res.status(400).json({ error: err.message });
          }else{
              console.log("DELETE Method Running Successfully......")
              res.send("Data deleted successfully");
          }
      });
  } catch (E) {
      res.status(400).send(E);
  }
  console.log("delete method runnig");
});

app.get('/alltrain',(req,res,next) => {
  try {
       //sql query to select all data 
      var sql = "select * from trains";
      var params = [];
       //Running the sql query
      db.all(sql,params,(err,rows) => {
          //Error respones
          if (err){
              res.status(400).json({error : err.message});
              console.log("Error");
          }
          //Success respones
          else{
              console.log("GET Method Running Successfully....");
              res.status(200).json({
                  message : 'Success',
                  data : rows,
              });
          }
      })
  } catch (E) {
      res.status(400).send(E);           
  }
  console.log('TRAIN GET METHOD Running');
});

app.post('/addtrain',(req,res,next) => {
  try {
      const{trainName,trainCode,trainStart,trainStop,trainTime,trainDescription}= req.body;

      //sql query to select all data
      var sql = "INSERT INTO trains(trainName,trainCode,trainStart,trainStop,trainTime,trainDescription)VALUES (?,?,?,?,?,?)";
      var params = [trainName,trainCode,trainStart,trainStop,trainTime,trainDescription];

      //Running the sql query
      db.all(sql,params,(err,rows) => {
          //Error Respones
          if (err){
              res.status(400).json({error : err.message});
          }else{
              //Success Respones
              db.get("SELECT last_insert_rowid() as lastId", (err, row) => {
                  if (err) {
                      return res.status(400).json({ error: err.message });
                  }

                  // Log the last inserted row ID
                  console.log("Post Method Running..... \n Last Train Id:", row.lastId);

                  // Success response with customer 
                  console.log("POST Method Runnig Successfully......")
                  res.status(201).json({
                      message: "Train " + trainName + " has registered",
                      data:res.rows,
                      trainId: row.lastId,
                      //'id':this.lastId,
                  });
              });
          }
      });
  } catch (E) {
      res.status(400).send(E);        
  }
  console.log('TRAIN POST METHOD RUNNING');
});

app.put('/updatetrain/:id', (req,res,next) =>{
  try {

      const id = req.params.id;
      console.log(id);
  
      //Updat database querys
      const{trainName,trainCode,trainStart,trainStop,trainTime,trainDescription} = req.body
      var sql = "UPDATE trains set trainName = ?,trainCode = ?,trainStart = ?,trainStop = ?,trainTime = ?,trainDescription = ? WHERE id = ?";
      var params = [trainName,trainCode,trainStart,trainStop,trainTime,trainDescription,id];
      //database update 
      db.run(sql,params,(err,rows) =>{
          if(err){
              return res.status(400).json({error: err.message});
          }else{
              console.log("PUT Method Running Successfully");
              res.status(200).json({
                  message:"success",
                  //data : row,
              });
          }
      });
  } catch (E) {
      res.status(400).send(E);
  }
  console.log("TRAIN PUT METHOD RUNNING");
});

app.delete('/deletetrain/:id', (req,res,next) => {
  try {
      //const { id } = req.params;
      var params = req.params.id;
      // Delete from the database using a DELETE SQL query
      var sql = "DELETE FROM trains WHERE id=?";
      //var params = [id];
      db.run(sql, params, (err) => {
          if (err) {
              return res.status(400).json({ error: err.message });
          }else{
              console.log("DELETE Method Running Successfully......")
              res.send("Data deleted successfully");
          }
      });
  } catch (E) {
      res.status(400).send(E);
  }
  console.log("TRAIN DELETE METHOD RUNNING");
});
