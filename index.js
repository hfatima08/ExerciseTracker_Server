const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors')
const authRoute = require('./routes/authRoutes');
const activityRoute = require('./routes/activityRoutes');
const {mongoose} = require('mongoose')
const { authenticateUser } = require('./middleware/authMiddleware')

//db connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> console.log('Database Connected!'))
.catch((err) => console.log("Database Not Connected:", err))

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}))


app.use('/',authRoute)
app.use('/',authenticateUser,activityRoute)

const port = 8080;

app.listen(port, () => console.log("server is running"))