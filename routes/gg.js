
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.render('GoogleGravity', {});
};

exports.ggUI = function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.render('GoogleGravityUI', {});
};