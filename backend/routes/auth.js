module.exports.required = function(req, res, next) {
  //pass
  return next();
}

module.exports.none = function(req, res, next) {
  
  return next();
}
