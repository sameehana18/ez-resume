import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js";

dotenv.config({
    path: "./.env"
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8004, () => {
        console.log(`\nServer running on port ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("MongoDB connection failed\n", error);
})