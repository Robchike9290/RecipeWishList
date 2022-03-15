const express = require('epxress');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});