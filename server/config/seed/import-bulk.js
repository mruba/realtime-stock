import locationSchema from '../../api/location/location.model';
import productSchema from '../../api/product/product.model';
import csv from 'fast-csv';
import fs from 'fs';
import path from 'path';
import redis from 'redis';


//files are put into upload folder.
var filePathLocations = path.join(__dirname, 'upload/locations_region.csv')
var filePathNearLocations = path.join(__dirname, 'upload/locations_relations.csv')
var filePathProducts = path.join(__dirname, 'upload/product_catalog.csv')

//var path = "./upload/locations_region.csv";

locationSchema.find({}).remove()
  // .then(()=>{
  //   locationSchema.esTruncate(function(err){
  //     if(err) console.log('there was an error with the trucate index');
  //   });
  // })
  .then(()=>{
    fs.access(filePathLocations, fs.R_OK || fs.W_OK, (err) => {
      if(!err){
        //lets populate the db with this bitch
        console.log('the bulk location has started');
        var stream = fs.createReadStream(filePathLocations);
        //Descripción de Colonia,Zona de Reparto,Codigo Postal,Farmacia,Descripción Farmacia,Desc. Delegación,Descripción Estado

        csv.fromStream(stream, { comment: null, headers: ['colonie', 'transportZone', 'zip', 'pharmacyNumber', 'pharmacyName', 'delegation', 'state']})
        .on('data', (data)=>{

          var LocationObject = {


            zip: data.zip,
            delegation: data.delegation,
            colonie: data.colonie,
            state: data.state,
            //city: data.region,
            //citycode: data.delegationId,
            transportzone: data.transportZone,
            //citypcode: data.colonieId,
            pharmacyNumber: data.pharmacyNumber,
            pharmacyName: data.pharmacyName
          };

          locationSchema.collection.insert(LocationObject, (err, docs) => {
            if(err) console.log('there was an error dude');
          });

        }).on('end', ()=>{
          console.log('the bulk is done!');
        })
        // .on('end', ()=>{
        //   console.log('the bulk is done!');
        //   //now its time to sync all this with the elastisearch
        //   var stream = locationSchema.synchronize()
        //   var count = 0;
        //   stream.on('data', function(err, doc){
        //     count++;
        //   });
        //
        //   stream.on('close', function(){
        //     console.log('indexed ' + count + ' documents!');
        //   });
        //
        //   stream.on('error', function(err){
        //     console.log(err);
        //   });
        //
        // })
      }else{
        console.log('no access!');
      }
    });
  });

var client = redis.createClient();

fs.access(filePathNearLocations, fs.R_OK || fs.W_OK, (err) => {
  if(!err){
    //lets populate the db with this bitch
    console.log('the bulk near-location has started');
    var stream = fs.createReadStream(filePathNearLocations);

    csv.fromStream(stream, { comment: null, headers: ['origin', 'location01', 'location02', 'location03', 'location04']})
    .on('data', (data)=>{
      //we should push only the availabe values
      let locationList = [data.location01, data.location02, data.location03, data.location04];
      let key = `nearstores:${data.origin}`;
      client.del(key);
      locationList.forEach((location)=>{
        if (location) client.rpush(key, location)
      });



    }).on('end', ()=>{
      console.log('the bulk is done!');
    })
  }else{
    console.log('no access!');
    client.quit();
  }
});



productSchema.find({}).remove()
  .then(()=>{
    fs.access(filePathProducts, fs.R_OK || fs.W_OK, (err) => {
      if(!err){
        //lets populate the db with this bitch
        console.log('the bulk products has started');
        var stream = fs.createReadStream(filePathProducts);
        //Descripción de Colonia,Zona de Reparto,Codigo Postal,Farmacia,Descripción Farmacia,Desc. Delegación,Descripción Estado

        csv.fromStream(stream, { comment: null, headers: ['item', 'upc', 'name', 'content', 'group', 'type', 'activeSustance', 'antibiotic', 'highSpeciality', 'status', 'category', 'brand', 'provider']})
        .on('data', (data)=>{
          console.log(data.name);

          let antibiotic = (data.antibiotic) ? true : false;
          let highSpeciality = (data.highSpeciality) ? true : false;

          let productObject = {
            item: data.item,
            upc: data.upc,
            name: data.name,
            content: data.content,
            group: data.group,
            type: data.type,
            activeSustance: data.activeSustance,
            antibiotic: antibiotic,
            highSpeciality: highSpeciality,
            status: data.status,
            category: data.category,
            brand: data.brand,
            provider: data.provider
          };

          productSchema.collection.insert(productObject, (err, docs) => {
            if(err) console.log('there was an error dude');
          });

        }).on('end', ()=>{
          console.log('the bulk products is done!');
            //now its time to sync all this with the elastisearch
            var stream = productSchema.synchronize()
            var count = 0;
            stream.on('data', function(err, doc){
              count++;
            });

            stream.on('close', function(){
              console.log('indexed ' + count + ' documents!');
            });

            stream.on('error', function(err){
              console.log(err);
            });

        })

      }else{
        console.log('no access!');
      }
    });
  })
