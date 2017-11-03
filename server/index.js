const express = require('express');

const app = express();


app.use(express.static(__dirname + '/../client/dist/'));

const port = 3000;
app.listen(port, () => console.log(`listening to port ${port}`));