const express = require('express');
const app = express();
require("./express-json-html")(app);

app.set('views', './views');
app.set('view engine', 'json');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/",(req,res)=>{
    res.render("index",{title:"Man!"});
})

app.listen(3000);

