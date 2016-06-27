import locationSchema from '../../api/location/location.model';
import csv from 'fast-csv';
import fs from 'fs';
import path from 'path';
import redis from 'redis';


//files are put into upload folder.
var filePathLocations = path.join(__dirname, 'upload/locations_region.csv')
var filePathNearLocations = path.join(__dirname, 'upload/locations_relations.csv')

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

      client.rpush(data.origin, data.location01, data.location02, data.location03, data.location04);

    }).on('end', ()=>{
      console.log('the bulk is done!');
    })
  }else{
    console.log('no access!');
    client.quit();
  }
});
