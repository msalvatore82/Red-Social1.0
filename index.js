const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
require("dotenv").config();
const { dbConnection } = require("./config/config")
const { typeError } = require('./Middleware/errors');
app.use(express.static("./public"))
const swaggerUI = require('swagger-ui-express')
const docs = require('./docs/index')
const cors = require("cors")

app.use(express.json(), cors())

app.use('/users', require('./routes/Users'));
app.use('/posts', require('./routes/Posts'));
app.use("/comment", require('./routes/comments'));

app.use('/api-docs', swaggerUI.serve,swaggerUI.setup(docs))
app.use(typeError)

dbConnection()
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));