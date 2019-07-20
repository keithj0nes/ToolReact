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
      return res.json({ success: true, tools: tools });
    });
  });
router.post('/updateData', (req, res) => {
    const { id, update } = req.body;
    Tools.findByIdAndUpdate(id, update, (err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });
router.delete('/deleteTool', (req, res) => {
    const { _id } = req.body;
    Tools.findByIdAndRemove(_id, (err) => {
      if (err) return res.send(err);
      return res.json({ success: true });
    });
  });
router.post('/createTool', (req, res) => {
    let tools = new Tools();
    const { toolNumber, description } = req.body;
    if (!toolNumber || !description) {
      return res.json({ success: false, error: 'Please enter both tool number and description'});
    }
    tools.usedCount = 0;
    tools.comments = '';
    tools.missing = false;
    tools.checkOut = false;
    tools.broken = false;
    tools.description = description;
    tools.toolNumber = toolNumber;
    tools.save((err, tool) => {
      if (err) return res.json({ success: false, error: err });
      console.log("No error, saving tool successful!");
      return res.json({ success: true, data: tool })
    });
});
app.use('/api', router);
// eslint-disable-next-line no-template-curly-in-string
app.listen(API_PORT, () => console.log('Listening on port {API_PORT}'));