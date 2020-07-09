let arc = require("@architect/functions");
let handler = require("@architect/shared/server");

exports.handler = function (event, context, callback) {
  let body = arc.http.helpers.bodyParser(event);
  event.body = JSON.stringify(body);
  handler(event, context, callback);
};
