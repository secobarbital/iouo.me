// https://gist.github.com/kylebarrow/1042026
(function(doc, nav, alon) {
  // Mobile Safari in standalone mode
  if((alon in nav) && nav[alon]){

  	// If you want to prevent remote links in standalone web apps opening Mobile Safari, change 'remotes' to true
  	var noddy, remotes = false;
	
  	document.addEventListener('click', function(event) {
		
  		noddy = event.target;
		
  		// Bubble up until we hit link or top HTML element. Warning: BODY element is not compulsory so better to stop on HTML
  		while(noddy.nodeName !== "A" && noddy.nodeName !== "HTML") {
  	        noddy = noddy.parentNode;
  	    }
		
  		if('href' in noddy && noddy.href.indexOf('http') !== -1 && (noddy.href.indexOf(document.location.host) !== -1 || remotes))
  		{
  			event.preventDefault();
  			document.location.href = noddy.href;
  		}

  	},false);
  }
})(document, window.navigator, 'standalone');
