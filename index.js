const yf = require("yahoo-finance");
const fs = require("fs");
const AWS = require("aws-sdk");
const dotenv = require('dotenv');
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: 'AKIAQK37GNI7H4U6TBEB',
  secretAccessKey: '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'
});

const SYMBOLS = [
  "USDMXN=X",
  "^MXX",
  "^NYA",
  "^IXIC",
  "SPY",
  "DJI",
  "BTC-USD",
  "ALFAA.MX",
  "ALSEA.MX",
  "LALAB.MX",
  "LIVEPOLC-1.MX",
  "ORBIA.MX",
  "NEMAKA.MX",
  "PE&OLES.MX",
  "TLEVISACPO.MX",
  "VOLARA.MX",
  "AUTLANB.MX",
  "USO",
  "UBER",
  "BABAN.MX",
  "XRP-USD",
];

exports.handler = (event) => {
  yf.quote({
    fields: ["a", "b", "b2", "b3", "p", "o"],
    symbols: SYMBOLS
  })
    .then(response => {
      return new Promise((resolve, reject) => {

        const params = {
            Body: JSON.stringify(response, null, 2),
            Bucket: "hub.rocktech",
            Key: "prices.json",
          };
          s3.upload(params, (s3Err, data) => {
            if (s3Err) throw s3Err;
            console.log("File uploaded successfully");
          });
      });
    })
    .catch(err => {
      console.log("Error: " + err);
    });

    return "DONE"
};
