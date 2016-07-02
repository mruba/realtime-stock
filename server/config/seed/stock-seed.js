import _ from 'lodash';
//import redisConnection from 'redis-connection';
import csv from 'fast-csv';
import fs from 'fs';
import path from 'path';
import redis from 'redis';
var client = redis.createClient();

//var redisClient = redisConnection();
//client.flushall();


var filePathLocations = path.join(__dirname, 'upload/stock.csv')


fs.access(filePathLocations, fs.R_OK || fs.W_OK, (err) => {
  if(!err){
    var stream = fs.createReadStream(filePathLocations);
    csv.fromStream(stream, { comment: null, headers: true} )
    .on('data', (data)=>{
      let item = _.padStart(data.item, 8, 0);
      let keyStock = `stock:${item}`
      _.forEach(data, (value, key)=>{
        if(key !== 'item'){
          client.hset(keyStock, _.parseInt(key), value);
        }
      })
    })
    .on('end', ()=>{
      console.log('the stock bulk is done!');
      client.quit();
    })
  }
});

// let itemList = [
//   {"item": "03250124"},
//   {"item": "07180009"},
//   {"item": "40210046"},
//   {"item": "09151212"},
//   {"item": "09151198"},
//   {"item": "09151199"},
//   {"item": "03250129"},
//   {"item": "07180054"}];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// function asyncFunction (itemList, cb) {
//   for (var i = 0; i < 80; i++) {
//     let location = i + 1 ;
//     let stock = getRandomInt(0, 90);
//     let key = 'stock:'+itemList.item;
//     client.hset(key, location, stock);
//      if(location === 80) cb();
//   }
// }
//
// let requests = itemList.map((item) => {
//   return new Promise((resolve) => {
//     asyncFunction(item, resolve);
//   });
// });
//
// Promise.all(requests).then(() => {
//   console.log('done')
//
// });






//
// var redisIncrement = (products) => {
//   let location = getRandomInt(1, 88);
//   products.forEach((product)=>{
//     //redisIncrement(i+1, product.item);
//     let stock = getRandomInt(3, 100)
//     client.incrby(`0${location}:${product.item}`, stock, function(err, reply) {
//         //console.log(reply);
//     });
//
//
//   })
// }
//
//



// Product.find().exec((err, products)=>{
//   if(products){
//     // for (let i of Array(10).keys()) {
//     //   //redisIncrement(products);
//     // }
//     products.forEach((product)=>{
//       console.log(product);
//     });
//   }
// })
