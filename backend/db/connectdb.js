const mongoose = require('mongoose');

async function connectMongoDb(url){
    return await mongoose.connect(url).then(()=>{
       return console.log('Mongo Db connected Successfully.');
    }).catch((error)=>{
        console.log('An error occurred:',error);
        process.exit(1); // failure
    })
}
module.exports = {connectMongoDb};