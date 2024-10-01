const express = require("express");
const app = express();
const db = require("./models")
const cors = require("cors")
const dotenv = (require("dotenv").config()).parsed

const PORT = dotenv.PORT;

app.use(express.json());
app.use(cors())

const AuthsRouter = require("./routes/Auth");
app.use("/auth", AuthsRouter);

const EventsRouter = require("./routes/events");
app.use("/events", EventsRouter);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`server running on http://localhost:${PORT}`)
    })
})