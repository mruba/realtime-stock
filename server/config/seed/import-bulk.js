import locationSchema from '../../api/location/location.model';
import csv from 'fast-csv';
import fs from 'fs';
import path from 'path';


//files are put into upload folder.
var filePath = path.join(__dirname, 'upload/locations_region.csv')
//var path = "./upload/locations_region.csv";

locationSchema.find({}).remove()
  .then(()=>{
    locationSchema.esTruncate(function(err){
      if(err) console.log('there was an error with the trucate index');
    });
  })
  .then(()=>{
    fs.access(filePath, fs.R_OK || fs.W_OK, (err) => {
      if(!err){
        //lets populate the db with this bitch
        console.log('the bulk location has started');
        var stream = fs.createReadStream(filePath);
        csv.fromStream(stream, { comment: null, headers: ['zip','colonie','delegation','state','colonieId','transportZone','delegationId','region']})
        .on('data', (data)=>{

          var LocationObject = {
            zip: data.zip,
            delegation: data.delegation,
            colonie: data.colonie,
            state: data.state,
            city: data.region,
            citycode: data.delegationId,
            transportzone: data.transportZone,
            citypcode: data.colonieId
          };

          locationSchema.collection.insert(LocationObject, (err, docs) => {
            if(err) console.log('there was an error dude');
          });

        }).on('end', ()=>{
          console.log('the bulk is done!');
          //now its time to sync all this with the elastisearch
          var stream = locationSchema.synchronize()
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
  });
