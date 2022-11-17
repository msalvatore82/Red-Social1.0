const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
require("dotenv").config();
const { dbConnection } = require("./config/config")
const { typeError } = require('./Middleware/errors');
app.use(express.static("./public"))

app.use(express.json())

app.use('/users', require('./routes/Users'));
/* app.use('/post', require('./routes/Posts')); */
app.use("/comment", require('./routes/comments') )


app.use(typeError)

dbConnection()
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));