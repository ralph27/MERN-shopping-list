const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const items = require('./routes/api/items');
const path = require('path')

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;


// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected...'))
.catch(() => console.log(err));

// Use Routes
app.use('/api/items', items);

// Serve Static Assets If In Production 
if (process.env.NODE_ENV === 'production') {
   // Set static folder
   app.use('/static', express.static(path.join(__dirname, 'client')))

   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

