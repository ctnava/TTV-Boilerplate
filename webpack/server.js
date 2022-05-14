const fs = require('fs');

const devServer = (dir, https) => {
  const projectConfig = JSON.parse(fs.readFileSync("./Project.json"));
  const staticFolder = projectConfig.frontendFolderName;

  var baseConfig = {
    static: `${dir}/${staticFolder}`,
    host: 'localhost',
    headers: {'Access-Control-Allow-Origin': '*'},
    port: 8080  
  };

  const server = {
    type: 'https',
  };

  if (https) baseConfig.server = server;
  return baseConfig;
}


module.exports = devServer;