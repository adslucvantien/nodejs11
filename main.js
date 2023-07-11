const express = require('express');
const app = express();


const username = 'lvtien';
const password = 'Aptech';

const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    console.log(authHeader);

    if (authHeader) {
      const encodedCredentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');

      console.log(credentials);

      const [enteredUsername, enteredPassword] = credentials.split(':');
  
      if (enteredUsername === username && enteredPassword === password) {
        next(); // Authentication successful, proceed to the next middleware
        return;
      }
    }
  
    // Authentication failed, send a 401 Unauthorized response
    res.setHeader('WWW-Authenticate', 'Basic realm="Authentication Required"');
    res.status(401).send('Unauthorized');
  };
  

  app.get('/documents', basicAuth, (req, res) => {
    res.send('You have access to the protected resource!');
  });

  
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
  