const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

// Connect to mongoDB
connectDB();

app.use(express.json({ extended: false }));

// Routes
app.use("/api/users", require("./routes/user"));
app.use("/api/shopping", require("./routes/shopping"));

app.listen(port, () => console.log(`Server started in ${port}`));
