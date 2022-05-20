const fs = require("fs");


function xferPublic() {
    const projectConfig = JSON.parse(fs.readFileSync("./Project.json"));
    const pathToFolder = `./${projectConfig.frontendFolderName}`;
    const files = fs.readdirSync("./public");
    files.forEach(file => {
        fs.writeFileSync(`${pathToFolder}/${file}`, fs.readFileSync(`./public/${file}`));
    });
}


module.exports = xferPublic;