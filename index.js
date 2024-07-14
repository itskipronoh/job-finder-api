const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

import cors from "cors";

app.get('/', (req, res) => {
    res.send('Welcome to the Job Finder API!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});