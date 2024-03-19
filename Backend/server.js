const app = require('./app')
const dotenv = require('dotenv')
const moongose = require('mongoose')
process.on('uncaughtException', (err) => {
    console.error(`${err.name} and ${err.message}`);
    console.log('Uncaught Exception : Shutting Down');
    process.exit(1);
  });

dotenv.config({
    path :'./config.env'
})
const PORT = process.env.PORT || 3002;
const server = app.listen(PORT, ()=>{
    console.log("App is running on the port ", PORT)
})
moongose.connect(process.env.LocalDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Database Connected Successfully")
}).catch((error)=>{
    console.log("Error During connecting Database \n Error : ", error)
})
process.on('unhandledRejection', (err) => {
    console.error(err.name + ' ' + err.message);
    console.log('Unhandled Rejection : Shutting Down');
    server.close(() => {
      process.exit(1);
    });
  });

