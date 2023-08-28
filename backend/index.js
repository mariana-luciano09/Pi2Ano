const express = require('express')
const app = express();
app.listen(9000, () => console.log("OK"));

app.get('/', (req,res) => {
    res.send("Mariana");
})
