const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname + '/../dist'));

app.get('/', (req, res) => {
  res.status(200).send();
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});