const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('\x1b[32m%s\x1b[0m', '[Data flow] server listening on port ' + port); // eslint-disable-line
});
