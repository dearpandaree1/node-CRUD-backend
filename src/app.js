require("dotenv").config();
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error')
// const rateLimitMiddleware = require('./middleware/rate-limit')
const addressRoute = require('./routes/address-route')

// application object for create server
const app = express();

app.use(cors());
app.use(morgan("dev"))
// app.use(rateLimitMiddleware)
app.use(express.json())

app.use("/address",addressRoute)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const PORT = process.env.PORT || 5000 ;
app.listen(PORT , () => console.log(`server running on port: ${PORT}`));

// const http = require('http');
// // const uc = require('upper-case');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
// //   res.write(uc.upperCase("Hello World!"));
//   res.end();
// }).listen(8080);