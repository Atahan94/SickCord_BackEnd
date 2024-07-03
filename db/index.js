import mongoose from "mongoose";
import env from "dotenv";
env.config();

const connectToDb = () => mongoose.connect(`mongodb+srv://${process.env.atlasUser}:${process.env.atlasPassword}@cluster0.gbgdpli.mongodb.net/SickCord`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

export default connectToDb;