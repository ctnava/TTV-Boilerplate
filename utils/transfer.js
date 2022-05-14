const fs = require("fs");


(()=>{
    const projectConfig = JSON.parse(fs.readFileSync("./Project.json"));
    const pathToFolder = `./${projectConfig.frontendFolderName}`;

    if (fs.existsSync(pathToFolder)) fs.rmSync(pathToFolder, {recursive:true})
    fs.mkdirSync(pathToFolder);
    const files = fs.readdirSync("./build");
    files.forEach(file => {
        fs.writeFileSync(`${pathToFolder}/${file}`, fs.readFileSync(`./build/${file}`));
    });
})();