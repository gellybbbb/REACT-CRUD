
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require('./models/Employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); 
const app = express();
app.use(express.json());
app.use(cookieParser()); 

mongoose.connect("mongodb://127.0.0.1:27017/employee");

app.use(cors({
    origin: "http://localhost:5173/home", 
    credentials: true, 
}));


app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email }).then((user) => {
        if (user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if (response) {
                    const token = jwt.sign({ email: user.email, userId: user._id }, "jwt-secret-key", {
                        expiresIn: "1d", // 
                    });
                    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
                    res.json({ success: true, token: token });
                } else {
                    res.json({ success: false, message: "The password is incorrect" });
                }
            });
        } else {
            res.json({ success: false, message: "No record existed" });
        }
    });
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            EmployeeModel.create({ name, email, password: hash })
                .then(employees => res.json(employees))
                .catch(err => res.json(err));
        })
        .catch(err => console.log(err.message));
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});


