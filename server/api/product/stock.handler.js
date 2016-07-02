'use strict';

import _ from 'lodash';
import redis from 'redis';
import Promise from 'bluebird'
//import redisConnection from 'redis-connection';

//this function will help us to merge the stock aviability
// with the search method

var stockProductMerge = (products, store = '2') => {
  return new Promise((resolve)=>{
    var client = redis.createClient();

    let productStockList = [];

    function buildObject(objProduct, objStock){
      let filterProduct = _.pick(objProduct, ['item', 'images', 'upc', 'name', 'price', 'family', 'description', 'provider']);
      let product = Object.assign({}, filterProduct, objStock);
      console.log(typeof objProduct === 'object');
      console.log(typeof objStock === 'object');
      productStockList.push(product);
    }

    // if(err) throw.exception
    //nearStores.unshift(store);
    let allProducts = products.map((productItem)=>{

      return new Promise((cb)=>{
        let key = `stock:${productItem.item}`;
        client.hget(key, store, (err, qty)=>{
          if(qty > 0){
            buildObject(productItem, {stock: [{store: store, qty: qty}] });
            cb()
          }else if ( qty === null) {
            buildObject(productItem, {stock: null });
            cb()
          }else{
            let key = `nearstores:${store}`;
            client.lrange(key, 0, -1, (err, nearStores)=>{
              let allStock = nearStores.map((store)=>{
                return new Promise((resolve)=>{
                  let key = `stock:${productItem.item}`;
                  client.hget(key, store, (err, qty)=>{
                    console.log({store: store, qty: qty});
                    resolve({store: store, qty: qty});
                  });
                });
              });
              Promise.all(allStock)
              .then((stock) => {
                // let product = Object.assign({}, productItem, {stock: stock} );
                // productStockList.push(product);
                buildObject(productItem, {stock: stock});
                cb();
              })
            })
          }
        })
      });
    });

    Promise.all(allProducts).then(()=>{
      client.quit();
      resolve(productStockList);
    });
  });
}


module.exports = stockProductMerge;
