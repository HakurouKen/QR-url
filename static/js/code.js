(function(window,document,undefined){

	// jQuery.extend
	var extend = function() {
		var src, copyIsArray, copy, name, options, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy ) {
						clone = src;
						// Never move original objects, clone them
						target[ name ] = extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	function setQR(opt,callback){
		var img = document.getElementById('qr'),
			favicon = document.querySelector('.detail .favicon'),
			title = document.querySelector('.detail .title');


		opt = extend({
			width: 300,
			height: 300,	
			choe: 'UTF-8',
			chld: 'L'
		},opt);
		chrome.windows.getCurrent(null,function(win){
			chrome.tabs.query({active:true,windowId:win.id},function(tabs){
				var tab = tabs[0] || {},
					url = encodeURIComponent(tab.url);
				img.src = 'https://chart.googleapis.com/chart?cht=qr&chs=' + opt.width + 'x' + opt.height + '&chl=' + url + '&choe=' + opt.choe + '&chld=' + opt.chld ;
				if( tab.favIconUrl && /^http(s)?:\/\//.test(tab.favIconUrl) ){
					favicon.src = tab.favIconUrl;
				} else {
					favicon.parentElement.removeChild(favicon);
				}
				title.textContent = tab.title;
				title.title = tab.title;
				callback && callback(tab);
			});
		});
	}

	setQR();

})(window,document);