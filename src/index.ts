import express from 'express';
// import cors from 'cors';
require(`dotenv`).config();

const app = express();

app.get('/', (req, res) => {

    res.send(`working`);

});

let port = process.env.PORT


app.listen(port, () => {
    console.log(`listening on port` + `${port}`);
});