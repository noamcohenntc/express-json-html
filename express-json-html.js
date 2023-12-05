const fs = require("fs");

module.exports = (app)=>{
    const fs = require('fs') // this engine requires the fs module
    app.engine('json', (filePath, options, callback) => { // define the template engine
        fs.readFile(filePath, (err, content) => {
            if (err) return callback(err)

            let json = JSON.parse(content.toString());

            interpellate(json,options);

            let rendered = toHtml(json);

            return callback(null, rendered)
        })
    })
}

function interpellate(json, options) {
    for(let key in json){
        if(typeof json[key] === "string"){
            for(let k in options){
                if(json[key].indexOf("{" + k +"}")!==-1)
                    json[key] = json[key].replace("{" + k +"}",options[k]);
            }
        }
        else
            interpellate(json[key],options);
    }
}

function toHtml(obj){
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
            if(obj[key][0]){
                obj[key].forEach((o)=>{
                    rend = rend + toHtml(o);
                })
            }
            else
                rend = rend + toHtml(obj[key]);
        }

        rend = rend + "</" + key + ">";
    }

    return rend;
}