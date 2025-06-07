import express from 'express';
import {connect} from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import upload from 'express-fileupload';
import {notFound ,errorHandler} from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json({extended:true}))
app.use(cors({credentials:true, origin:["http://localhost:5000"]}))
app.use(upload())

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

connect(process.env.MONGO_URL )
.then(app.listen(process.env.PORT , ()=>console.log(`Server started on port ${PORT}`)))
.catch((err)=>console.log(err))

