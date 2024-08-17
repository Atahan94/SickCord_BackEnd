import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import connectToDb from "./db"
import cors from "cors";
import auth from "./routes/auth"
import api from "./routes/api"
import session from './session';
import http from 'http';
import setupSocketIO from './socket/textSocket';




const app = express();
const server = http.createServer(app);

const __dirname = dirname(fileURLToPath(import.meta.url));
const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions))

/* app.use('/assets', express.static(join(__dirname, 'public')));
app.use(express.static(join(__dirname, 'public', 'client'))); */
app.use(express.urlencoded({ extended: false }));
app.use(morgan(":method - :url - :date - :response-time ms"));
app.use(express.json());
app.use("/", session(app));

/* app.use('/404', (req, res) => {
    res.render('pageİsNotFound');
})
 */

app.use("/", auth);
app.use("/", api);



Promise.all([connectToDb()])
  .then(() =>
    server.listen(process.env.PORT || 3000, () => {console.log("SickCord Online")
    setupSocketIO(server);
    /* await redisClient.connect(); */
   }
)
  )
  .catch((error) => {
    console.error(`MongoDB Atlas Error: ${error}`);
    process.exit();
  });