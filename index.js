import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

const ApiUrl = "https://secrets-api.appbrewery.com/";
const date = new Date();
const year = date.getFullYear();

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(ApiUrl+"random");
        res.render("index.ejs", {secret:result.data.secret, username:result.data.username, currentYear:year});
    } catch (error) {
        console.log(`Failed to make request:`, error.message);
        // res.render("Failed to make request:", error.message);
        res.status(500);
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`visit http://localhost:${port}`);
});