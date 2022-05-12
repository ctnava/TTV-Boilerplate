const devServer = (dir, https) => {
    return {
      static: `${dir}/public`,
      host: 'localhost',
      headers: {'Access-Control-Allow-Origin': '*'},
      port: 8080,
      https
    }
}


module.exports = devServer;