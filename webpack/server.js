const devServer = (dir, devrig) => {
    const https = (devrig !== false && devrig !== undefined && devrig !== null);
    return {
      static: `${dir}/public`,
      host: 'localhost',
      headers: {'Access-Control-Allow-Origin': '*'},
      port: 8080,
      https
    }
}


module.exports = devServer;