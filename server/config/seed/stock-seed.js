import _ from 'lodash';
//import redisConnection from 'redis-connection';
import redis from 'redis';
var client = redis.createClient();

//var redisClient = redisConnection();
//client.flushall();

let itemList = [
  {"item": "03250124"},
  {"item": "07180009"},
  {"item": "40210046"},
  {"item": "09151212"},
  {"item": "09151198"},
  {"item": "09151199"},
  {"item": "03250129"},
  {"item": "07180054"}];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function asyncFunction (itemList, cb) {
  for (var i = 0; i < 80; i++) {
    let location = i + 1 ;
    let stock = getRandomInt(0, 90);
    let key = 'stock:'+itemList.item;
    client.hset(key, location, stock);
     if(location === 80) cb();
  }
}

let requests = itemList.map((item) => {
  return new Promise((resolve) => {
    asyncFunction(item, resolve);
  });
});

Promise.all(requests).then(() => {
  console.log('done')
  client.quit();
});


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
