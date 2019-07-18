const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Tools = require('./data');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

const dbRoute = 
'mongodb+srv://mschnapp:river123@tools-nmtin.mongodb.net/Tools?retryWrites=true&w=majority';
mongoose.connect(dbRoute, { useNewUrlParser: true});
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
router.get('/getData', (req, res) => {
      Tools.find((err, tools) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, tools: Tools });
    });
  });
router.post('/updateData', (req, res) => {
    const { id, update } = req.body;
    Tools.findByIdAndUpdate(id, update, (err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });
router.delete('/deleteData', (req, res) => {
    const { id } = req.body;
    Tools.findByIdAndRemove(id, (err) => {
      if (err) return res.send(err);
      return res.json({ success: true });
    });
  });
router.post('/putData', (req, res) => {
    let tools = new Tools();
    const { id, toolNumber, description, broken, missing, checkOut, comments, usedCount } = req.body;
    if ((!id && id !== 0)) {
      return res.json({
        success: false,
        error: 'INVALID INPUTS',
      });
    }
    tools.usedCount = usedCount;
    tools.comments = comments;
    tools.missing = missing;
    tools.checkOut = checkOut;
    tools.broken = broken;
    tools.description = description;
    tools.toolNumber = toolNumber;
    tools.id = id;
    tools.save((err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true })
    });
    console.log("worked");
});
app.use('/api', router);
// eslint-disable-next-line no-template-curly-in-string
app.listen(API_PORT, () => console.log('Listening on port {API_PORT}'));