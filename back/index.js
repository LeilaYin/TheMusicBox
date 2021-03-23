const express = require('express');
const config = require('./config/config');
const bodyParser = require('body-parser');

async function startServer() {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
    
    await require('./loaders')(app);

  app.listen(config.port, err => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    console.log(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  });
}
  
  startServer();