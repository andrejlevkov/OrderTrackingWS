const { response } = require('express');
const util = require('./util');

const sqlite3 = require('sqlite3').verbose();
let sql;

const db = new sqlite3.Database('../data.db', sqlite3.OPEN_READWRITE, (err) => {
    if(err) console.error(err.message)
});

function GetOrdersByDate(date, response) {
    sql = `SELECT * FROM orders WHERE departure like ?;`
    db.all(sql, [`%${date}%`], (err, rows)=>{
        if(err) {
            response.status(400).json({"error":err.message});
            return;
        }
        response.json(rows)
    });
}
function GetOrdersByStatus(status, response) {
    sql = `SELECT * FROM orders WHERE status = ?`;
    db.all(sql, [status], (err, rows)=>{
        if(err) {
            response.status(400).json({"error":err.message});
            return;
        }
        response.json(rows);
    });
}
function GetOrdersEnRoute(response){
    sql = `SELECT * FROM orders WHERE status = ? OR status = ?`;
    var now = new Date();
    var results = [];
    db.all(sql, ["vo_tranzit", "primena"], (err, rows)=>{
        if(err) {
            response.status(400).json({"error":err.message});
            return;
        }
        rows.forEach(row => {
            var departure_t = new Date(row.departure);
            if(row.status == "primena"){
                var collected_t = new Date(row.collected);
                console.log(row.orderID + ": " + row.status + ", " + "time elapsed: "+ util.getDateDifference(departure_t, collected_t));
                results.push({"orderId":row.orderID, "status":row.status, "location":row.location, "departure":row.departure, "collected":row.collected, "time elapsed": util.getDateDifference(departure_t, collected_t)});
            }
            if(row.status == "vo_tranzit"){
                console.log(row.orderID + ": " + row.status + ", " + "time elapsed: "+ util.getDateDifference(departure_t, now));
                results.push({"orderId":row.orderID, "status":row.status, "location":row.location, "departure":row.departure, "time elapsed": util.getDateDifference(departure_t, now)});
            }
            
        });
        response.json(results);
    });
    
}
function GetOrdersById(id, response) {
    sql = `SELECT * FROM orders WHERE orderID = ?`;
    db.get(sql, [id], (err, rows)=>{
        if(err) {
            response.status(400).json({"error":err.message});
            return;
        }
        response.send(rows);
    });
}
function ChangeStatus(status, id, response){
    const now = new Date();
    var curr_time = util.formatDate(now);
    switch(status){
        case "vo_tranzit":
            sql = `UPDATE orders SET status = ?, departure = ? WHERE orderID = ?`
            break;
        case "primena":
            sql = `UPDATE orders SET status = ?, collected = ? WHERE orderID = ?`
            break;
    }
    //sql = `UPDATE orders SET status = ? where id = ?`
    db.run(sql, [status, curr_time, id], (err)=>{
        if(err){
            response.status(400).json({"error":err.message});
            return;
        }
        response.status(200).json({"success":true});
    });
}
module.exports = {
    db, GetOrdersByDate, GetOrdersById, GetOrdersByStatus, GetOrdersEnRoute, ChangeStatus
};