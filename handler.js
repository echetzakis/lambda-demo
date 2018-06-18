'use strict';

const { S3 } = require('aws-sdk');
const uuid = require('uuid/v4');

module.exports.save = (event, context, callback) => {
  console.log(event);

  const s3 = new S3({ region: 'us-east-1' });
  const response = {};

  s3.putObject({
    Bucket: process.env.BUCKET,
    Key: `${process.env.FOLDER}/${uuid()}`,
    Body: event.body
  }).promise()
    .then((s3res) => {
      console.log(s3res);
      response.statusCode = 200;
      response.body = JSON.stringify({S3: s3res});
      callback(null, response);
    }).catch((error) => {
      console.error(error);
      response.statusCode = 422;
      response.body = JSON.stringify({error});
      callback(error, response);
    });



};
