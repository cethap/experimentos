/**
 * Rutas.
 */

var gg = require('./gg'),
	spider = require('./spider'),
	rtc = require('./rtc');

exports.init = function(app){
	app.get('/gg', gg.index);
	app.get('/ggUI', gg.ggUI);
	app.get('/spider', spider.index);
	app.get('/spiderUI', spider.spiderUI);
	app.get('/rtc', rtc.index);
};