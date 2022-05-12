const fs = require("fs");


(()=>{
    if (fs.existsSync("./public")) fs.rmSync("./public", {recursive:true})
    fs.mkdirSync("./public");
    const files = fs.readdirSync("./dist");
    files.forEach(file => {
        fs.writeFileSync(`./public/${file}`, fs.readFileSync(`./dist/${file}`));
    });
})();