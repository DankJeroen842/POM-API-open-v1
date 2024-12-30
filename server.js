const config = require('./config/config.js');
const express = require("express")
var cors = require("cors")
const path = require('path');
const cron = require('node-cron');
const fs = require('fs');

var bodyParser = require('body-parser')
const globalErrorHandler = require("./middlewares/errorHandler.js");



const app = express()
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(express.json())


app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack
    res.status(500).send('Something broke!'); // Send a generic error response
});

app.get('/', (req, res) => {

    return res.send("Welcome From AI-Services Node Server!")

})

const PORT = process.env.PORT || 3000

app.listen(PORT, "0.0.0.0", function () {
    console.log('Server up and running', PORT);
 });


app.use("/api/v1", require("./routes/user.route.js"))
app.use("/api/v1", require("./routes/AI-Integration.route.js"))
app.use(globalErrorHandler);

// Schedule a cron job to run every day at midnight
cron.schedule('0 0 * * *', () => {
    console.log("RUNNING THE CRON JOB=============")
    const audioDir = path.join(__dirname, 'public/audio');
    const now = Date.now();
    const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000;

    fs.readdir(audioDir, (err, files) => {
        if (err) {
            console.error('Error reading audio directory:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(audioDir, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }

                // Check if the file is older than 2 days
                if (now - stats.mtimeMs > twoDaysInMillis) {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Error deleting file:', err);
                        } else {
                            console.log(`Deleted old audio file: ${file}`);
                        }
                    });
                }
            });
        });
    });
});

