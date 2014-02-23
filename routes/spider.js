
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.render('spider', {});
};

exports.spiderUI = function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.render('spiderUI', {});
};
