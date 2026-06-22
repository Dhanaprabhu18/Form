const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

process.env.CSCRIPT = "C:\\Windows\\System32\\cscript.exe";

const ADODB = require("node-adodb");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Access DB connection
const connection = ADODB.open(
    "Provider=Microsoft.Jet.OLEDB.4.0;" +
    "Data Source=D:\\SOFT\\VB\\thaaiacc.mdb;" +
    "Jet OLEDB:Database Password=thaai;"
);

let attempts = {};

// Test DB connection
connection.query("SELECT * FROM Users")
.then(data => {
    console.log("Database Connected");
})
.catch(err => {
    console.log("Database Error:", err.process);
});

// Login API
app.post("/login", async (req, res) => {
    const { userid, password } = req.body;

    if (!userid || !password) {
        return res.json({
            success: false,
            message: "Userid and Password required"
        });
    }

    if (!attempts[userid]) {
        attempts[userid] = 0;
    }

    // Block after 4 wrong attempts
    if (attempts[userid] >= 4) {
        return res.json({
            success: false,
            blocked: true,
            message: "Exit - Access Blocked"
        });
    }

    try {
        const sql =
            "SELECT * FROM Users WHERE Trim(userid)='" +
            String(userid).trim() +
            "' AND Trim(userpass)='" +
            String(password).trim() + "'";

        console.log(sql);

        const data = await connection.query(sql);

        if (data.length > 0) {
            attempts[userid] = 0;

            res.json({
                success: true,
                message: "Login Successful"
            });
        } else {
            attempts[userid]++;

            if (attempts[userid] >= 4) {
                res.json({
                    success: false,
                    blocked: true,
                    message: "Exit - 4 Wrong Attempts"
                });
            } else {
                res.json({
                    success: false,
                    message:
                        "Wrong Password - Attempt " +
                        attempts[userid] +
                        " / 3"
                });
            }
        }

    } catch (error) {
        console.log("DB Error:", error.process);

        res.json({
            success: false,
            message: error.process.message
        });
    }
});

app.listen(3000, "0.0.0.0", () => {
    console.log("API running on port 3000");
});