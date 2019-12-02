const yf = require("yahoo-finance");
const fs = require("fs");
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const SYMBOLS = [
  "MEX-TIIE28.MX",
  "MEX-CETES-I.MX",
  "USDMXN=X",
  "^MXX",
  "^NYA",
  "^IXIC",
  "EWW",
  "SPY",
  "BTC-USD",
  "XRP-USD",
  "ETH-USD"
];

exports.handler = async event => {
  yf.quote({
    fields: ["a", "b", "b2", "b3", "p", "o"],
    symbols: SYMBOLS
  })
    .then(response => {
      return new Promise((resolve, reject) => {
        fs.writeFile("prices.json", JSON.stringify(response), err => {
          if (err) reject(err);
          else resolve(response);
        });
      });
    })
    .then(results => {
      console.log("Results: " + results);
    })
    .catch(err => {
      console.log("Error: " + err);
    });

  const response = {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
  return response;
};

exports.handler();
