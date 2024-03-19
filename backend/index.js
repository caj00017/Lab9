import express from "express"
import mysql2 from "mysql2"

const app = express()

const db = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"Laakeg26730!",
    database:"test"
})

// If there is a auth problem
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Laakeg26730!';

app.use(express.json())

app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover
    ];

    db.query(q,[values], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Book has been created successfully.")
    })
})

app.listen(8800, ()=>{
    console.log("Connected to backend.")
})