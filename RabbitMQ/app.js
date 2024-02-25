const express = require('express');
const app = express();
const publisher = require('./publisher');
const router = express.Router();
app.use(express.json());
app.use(router);

app.listen(3000, () => {

})


router.post('/create', async(req, res) => {
  const {email} = req.body
  await publisher({email,Date:Date.now()});
  res.send('Email sent')
})