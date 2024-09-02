const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db/db");
const port = 3000;

const LoginRoutes = require('./routes/loginRoutes');
const SignupRoutes = require('./routes/signupRoutes');
const MovieRoutes = require('./routes/movieRoutes');

app.use(express.json());
app.use(cors());

app.use("/auth",MovieRoutes);
app.use("/auth", LoginRoutes);
app.use("/auth",SignupRoutes);

module.exports = app;


if (db) {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}
