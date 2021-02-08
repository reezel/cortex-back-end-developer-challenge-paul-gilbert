const debug =require('debug')('server:debug');
import mongoose from 'mongoose';
import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import characterRouter from './routes/character';

mongoose.connect(config.get('database'), {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// callback when connection to mongodb is open
mongoose.connection.once("open", function() {
  debug("MongoDB database connection established successfully");
});

const app=express();
 // support json encoded bodies in the req
 app.use(bodyParser.urlencoded({ extended: true}));

 //sets the limit of json bodies in the req body.
 app.use(bodyParser.json());
 app.use('/api/v1/',characterRouter);


const listen =app.listen(config.get('port'),()=>{
    debug(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`);
})



module.exports= app;
module.exports.port=listen.address().port;