/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../../api/thing/thing.model';
import User from '../../api/user/user.model';
import Product from '../../api/product/product.model';
import Order from '../../api/order/order.model';
// import redis from 'redis';
//
// var client = redis.createClient();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// var redisIncrement = (products) => {
//   let location = getRandomInt(10, 80);
//   products.forEach((product)=>{
//     //redisIncrement(i+1, product.item);
//     let stock = getRandomInt(3, 100)
//     client.incrby(`0${location}:${product.item}`, stock, function(err, reply) {
//         //console.log(reply);
//     });
//   })
//
// }


Thing.find({}).remove()
  .then(()=>{
    Thing.esTruncate(function(err){
      if(err) console.log('error while deleting the elasticsearch index');
    });
  })
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.',
     active: true
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deploy unknow',
      info: 'this is just a simple test that we need.'
    },{
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    })
  });

User.find({}).remove()
  .then(()=>{
    User.esTruncate(function(err){
      if(err) console.log('error while deleting the elasticsearch index');
    });
  })
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    },
    {
      provider: 'local',
      role: 'salesman',
      name: 'Agent',
      email: 'agent@example.com',
      password: 'agent'
    })
    .then(() => {
      console.log('finished populating users');
      //Lets seed some orders
      //this needs to be executed after seeding the user
      var createOrder = (user, i) => {
        Product.random(function(errs, product) {
          var order = new Order({
            pharmacy: "0003"+i,
            payment: 'debit',
            comment: 'hello world',
            _user: user._id
          })

          var newProduct = new Product({_id: product._id, name: 'product.name', item: 'product.item'});
          // console.log(newProduct);
          // order.products.push({name: 'product.name', item: 'product.item'});

          order.save(function (err) {
            if (err) return console.log(err);
            // console.log('Success!');
          });

        });
      };

      Order.find({}).remove()
        .then(() => {
          User.findOne({name: 'Test User'}).exec(function(err, user){
            for (let i of Array(10).keys()) {
              createOrder(user, i);
            }
          });
        });
    });
  });



Product.find({}).remove()
  .then(()=>{
  Product.create(
    {
        "item": "07180054",
        "upc": "75013394",
        "name": "GERBER®  Papilla Zanahoria Etapa 1  Nestle® 71gr",
        "price": 8.5,
        "family": "Alimentos para bebes",
        "description": "nestle-alimentos",
        "provider": "Gerber",
        "images": {
          "thumb": "http://cdn-media.production-west.farmaciasanpablo.com.mx/uploads/product/product_image/532f657769702d5c61280000/thumb_07180054.png",
          "medium": "http://cdn-media.production-west.farmaciasanpablo.com.mx/uploads/product/product_image/532f657769702d5c61280000/medium_07180054.png",
          "large": "http://cdn-media.production-west.farmaciasanpablo.com.mx/uploads/product/product_image/532f657769702d5c61280000/large_07180054.png",
        }
      },
      {
        "item": "03250129",
        "upc": "7501005115728",
        "name": "Ades manzana tetrapack 330 ml",
        "price": 8.5,
        "family": "Bebidas",
        "description": "Bebidas - jugos de soya",
        "provider": "Ades",
        "images": {
          "thumb": "http://cdn-media.production-west.farmaciasanpablo.com.mx/uploads/product/product_image/532f657769702d5c613b0000/thumb_03250129.png",
          "medium": "http://cdn-media.production-west.farmaciasanpablo.com.mx/uploads/product/product_image/532f657769702d5c613b0000/medium_03250129.png",
          "large": "http://cdn-media.production-west.farmaciasanpablo.com.mx/uploads/product/product_image/532f657769702d5c613b0000/large_03250129.png",
          "original": "http://cdn-media.production-west.farmaciasanpablo.com.mx/uploads/product/product_image/532f657769702d5c613b0000/03250129.png"
        }
      },
      {
        "item": "09151199",
        "upc": "7509552459999",
        "name": "Vichy cap sol toalla emp c/1pz",
        "price": 0,
        "family": "Dermocosméticos",
        "description": "Vichy   -  Dermocosméticos",
        "provider": "Vichy ",
        "url": "http://farmaciasanpablo.com.mx/api/products/568d324869702d3e92c90a00",
        "images": {
          "thumb": '',
          "medium": '',
          "large": '',
          "original": ''
        }
      },
      {
        "item": "09151198",
        "upc": "7509552460018",
        "name": "Vichy case cap sol bolsa emp c/1pz",
        "price": 0,
        "family": "Dermocosméticos",
        "description": "Vichy   -  Dermocosméticos",
        "provider": "Vichy ",
        "images": {
          "thumb": "http://cdn-media.production-west.farmaciasanpablo.com.mx/uploads/product/product_image/568d324869702d3e92ca0a00/thumb_09151198.png",
          "medium": "http://cdn-media.production-west.farmaciasanpablo.com.mx/uploads/product/product_image/568d324869702d3e92ca0a00/medium_09151198.png",
          "large": "http://cdn-media.production-west.farmaciasanpablo.com.mx/uploads/product/product_image/568d324869702d3e92ca0a00/large_09151198.png",
          "original": "http://cdn-media.production-west.farmaciasanpablo.com.mx/uploads/product/product_image/568d324869702d3e92ca0a00/09151198.png"
        }
      },
      {
        "item": "09151212",
        "upc": "7509552454901",
        "name": "Vichy lift supreme piel ideal paq c/4pz",
        "price": 509,
        "family": "Dermocosméticos",
        "description": "Vichy   -  Dermocosméticos",
        "provider": "Vichy ",
        "images": {
          "thumb": '',
          "medium": '',
          "large": '',
          "original": ''
        }
      },
      {
        "item": "40210046",
        "upc": "7501094910617",
        "name": "Tofranil tab 25mg caj c/20",
        "price": 297,
        "family": "Medicinal",
        "description": "Imipramina  -  25mg",
        "provider": "Tofranil ",
        "images": {
          "thumb": '',
          "medium": '',
          "large": '',
          "original": ''
        }
      },
      {
        "item": "07180009",
        "upc": "75003470",
        "name": "Papillas Gerber 2/e Guayaba",
        "price": 9,
        "family": "Alimentos Para Bebes",
        "description": "Gerber",
        "provider": "Gerber",
        "images": {
          "thumb": "http://cdn-media.production-west.farmaciasanpablo.com.mx/uploads/product/product_image/532f657769702d5c61440000/thumb_07180009.png",
          "medium": "http://cdn-media.production-west.farmaciasanpablo.com.mx/uploads/product/product_image/532f657769702d5c61440000/medium_07180009.png",
          "large": "http://cdn-media.production-west.farmaciasanpablo.com.mx/uploads/product/product_image/532f657769702d5c61440000/large_07180009.png",
          "original": "http://cdn-media.production-west.farmaciasanpablo.com.mx/uploads/product/product_image/532f657769702d5c61440000/07180009.png"
        }
      },
      {
        "item": "03250124",
        "upc": "7501005113373",
        "name": "Ades durazno tetrapack 200 ml",
        "price": 6,
        "family": "Bebidas",
        "description": "Bebidas - jugos de soya",
        "provider": "Ades",
        "images": {
          "thumb": "http://cdn-media.production-west.farmaciasanpablo.com.mx/uploads/product/product_image/532f657769702d5c61460000/thumb_03250124.png",
          "medium": "http://cdn-media.production-west.farmaciasanpablo.com.mx/uploads/product/product_image/532f657769702d5c61460000/medium_03250124.png",
          "large": "http://cdn-media.production-west.farmaciasanpablo.com.mx/uploads/product/product_image/532f657769702d5c61460000/large_03250124.png",
          "original": "http://cdn-media.production-west.farmaciasanpablo.com.mx/uploads/product/product_image/532f657769702d5c61460000/03250124.png"
        }
    })
    .then(() => {
      // client.flushall();
      // Product.find().exec((err, products)=>{
      //   if(products){
      //     for (let i of Array(10).keys()) {
      //       redisIncrement(products);
      //     }
      //   }
      // })
    })
    .then(() => {
      console.log('finished populating produts');
      // client.close();
    })
  })
