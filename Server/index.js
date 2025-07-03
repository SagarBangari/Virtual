import express from 'express';
import {connect} from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import upload from 'express-fileupload';
import {notFound ,errorHandler} from './middlewares/errorMiddleware.js';
import routes from './routes/routes.js';
import {server,app} from "./socket/socket.js"

app.use(express.urlencoded({extended:true}))
app.use(express.json({extended:true}))
app.use(cors({credentials:true, origin:["http://localhost:5173"]}))
app.use(upload())

app.use('/api', routes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

connect(process.env.MONGO_URL )
.then(server.listen(process.env.PORT , ()=>console.log(`Server started on port ${PORT}`)))
.catch((err)=>console.log(err))

