(function(){
    var loaded = false, interval;

    var scripts = document.getElementsByTagName('script');
    var myscript = scripts[scripts.length-1];
    for(var i=0; i<scripts.length; i++){
        var script = scripts[i];
        if(script.src.search('cdn.webglstats.com') >= 0){
            var src = myscript.src;
            var match = src.match(/#(.*)/);
            if(match){
                var load = parseFloat(match[1]);
                if(Math.random() > load){
                    return;
                }
            }
            break;
        }
    }
        
    var vendors = [null, 'webkit', 'moz', 'ms', 'o'];
    var vendorName = function(name, vendor){
        if(vendor && vendor.length > 0){
            return vendor + name[0].toUpperCase() + name.substr(1);
        }
        else{
            return name;
        }
    }
    var getAttrib = function(obj, name){
        if(obj){
            for(var i=0; i<vendors.length; i++){
                var vendor = vendors[i];
                var prop = vendorName(name, vendor)
                if(obj[prop] !== undefined){
                    return obj[prop];
                }
            }
        }
        return null;
    }

    var isPresent = function(obj, name){
        return getAttrib(obj, name) != null;
    }

    var onLoad = function(){
        document.removeEventListener('load', onLoad, false);
        document.removeEventListener('DOMContentLoaded', onLoad, false);
        clearInterval(interval);
        if(!loaded){
            loaded = true;
            var frame = document.createElement('iframe');
            var flags = [];
            if(isPresent(document, 'cancelFullScreen')){
                flags.push('fullscreen');
            }
            if(isPresent(navigator, 'gamepads')){
                flags.push('gamepads');
            }
            if(isPresent(document.body, 'requestPointerLock')){
                flags.push('pointerlock');
            }
            flags = flags.join(',');
            
            frame.src = 'http://cdn.webglstats.com/statframe.html#' + flags + '|' + document.location.origin;
            frame.style.cssText = 'display: none;';
            document.body.appendChild(frame);
        }
    }

    if(document.addEventListener){
        document.addEventListener('DOMContentLoaded', onLoad, false);
        document.addEventListener('load', onLoad, false);
    }
    if(document.readyState){
        interval = setInterval(function(){
            if(/loaded|complete/.test(document.readyState)){
                onLoad()
            }
        }, 250);
    }
})();
