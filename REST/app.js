const express = require("express");
const app = express();
app.use(express.json());
const db = require('./database')

const PORT = 3000;

app.get("/order/:id", (request, response) => {
    var id = request.params.id;
    db.GetOrdersById(id, response);
});
app.get("/status/:stat", (request, response)=>{
    var status = request.params.stat;
    db.GetOrdersByStatus(status, response);
});
app.get("/date/:date", (request, response)=>{
    var date = request.params.date;
    db.GetOrdersByDate(date, response);
});
app.get("/enroute", (request, response) => {
    db.GetOrdersEnRoute(response);
});
app.patch("/update/:id&:stat", (request, response)=>{
    var id = request.params.id;
    var status = request.params.stat;
    db.ChangeStatus(id, status, response);

});

app.listen(PORT, () => {
    console.log("Server Listening on Port: ", PORT);
});
