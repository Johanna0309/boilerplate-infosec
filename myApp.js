const express = require('express');
const app = express();
const helmet = require('helmet');
// Use Helmet to secure HTTP headers
app.use(helmet());

// Customize security headers

// Content Security Policy (CSP)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],  // Only allow content from the same origin
      scriptSrc: ["'self'", "https://cdn.example.com"],  // Allow scripts from the same origin and the specified CDN
      styleSrc: ["'self'", "https://fonts.googleapis.com"],  // Allow styles from Google Fonts
      fontSrc: ["'self'", "https://fonts.gstatic.com"],  // Allow fonts from Google Fonts
    },
  })
);
// XSS Protection
app.use(helmet.xssFilter());

// Clickjacking Protection
app.use(helmet.frameguard({ action: 'deny' }));  // This denies all iframe embedding

// Strict-Transport-Security (HSTS)
app.use(helmet.hsts({
  maxAge: 31536000,  // One year in seconds
  includeSubDomains: true,  // Apply this to all subdomains
  preload: true  // Optionally, ask browsers to preload your domain for HTTPS
}));

// Referrer Policy
app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));

// Start the server
app.listen(3000, () => {
  console.log('App is listening on port 3000');
});














































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
