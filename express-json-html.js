const fs = require("fs");
module.exports = (app)=>{
    const fs = require('fs') // this engine requires the fs module
    app.engine('json', (filePath, options, callback) => { // define the template engine
        fs.readFile(filePath, (err, content) => {
            if (err) return callback(err)


            const json = JSON.parse(content.toString())
            let rendered = toHtml(json,options);


            return callback(null, rendered)
        })
    })
}

function toHtml(obj,options){
    let rend = "";
    for(let key in obj){
        if(key==="attr")
            continue;

        rend = rend +"<"+ key;

        if(obj[key].attr)
            for (let k in obj[key].attr)
                rend += " " + k + "=\"" + obj[key].attr[k] + "\"";

        rend = rend + ">";

        if(typeof obj[key] === "string"){
            rend = rend + obj[key];
        }
        else {
            rend = rend + toHtml(obj[key]);
        }

        rend = rend + "</" + key + ">";
    }

    for(let key in options){
        if(typeof options[key] === "string")
            rend = rend.replace("{" + key + "}",options[key]);
    }

    return rend;
}