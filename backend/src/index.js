const express = require("express");
const cors = require("cors");

const MainRouter = require('./routes/index');

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", MainRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
