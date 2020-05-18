'use strict'

var validate = require('jsonschema').validate;
const fs = require('fs');

/**
 * @function  [read JSON file]
 * @returns {Sting} status
 */
const readFile = (fileName) => {
  fs.readFile(fileName, (err, data) => {
    if (err) throw err;
    let jsonObj = JSON.parse(data);

    fs.readFile('json.schema.json', (err,jsonSchema) => {
      if (err) throw err;
      let schemaVal = JSON.parse(jsonSchema);
      console.log(validate(jsonObj, schemaVal).valid);


  });
});

};


// Export all methods
module.exports = { readFile };
