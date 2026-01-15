import express from "express";
import axios from "axios";

const app = express();
const port = 3000; // you can modify this based on the available port you want on your computer.

const ApiUrl = "https://secrets-api.appbrewery.com/";
const date = new Date();
const year = date.getFullYear();

app.use(express.static("public"));

// we retrieve some random secret from the API and renders it with the ejs file.
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

// we run the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`visit http://localhost:${port}`);
});