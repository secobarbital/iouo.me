(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof root === 'undefined' || root !== Object(root)) {
        throw new Error('templatizer: window does not exist or is not an object');
    } else {
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function r(r){return null!=r&&""!==r}function n(e){return Array.isArray(e)?e.map(n).filter(r).join(" "):e}var e={};return e.merge=function t(n,e){if(1===arguments.length){for(var a=n[0],s=1;s<n.length;s++)a=t(a,n[s]);return a}var i=n["class"],l=e["class"];(i||l)&&(i=i||[],l=l||[],Array.isArray(i)||(i=[i]),Array.isArray(l)||(l=[l]),n["class"]=i.concat(l).filter(r));for(var o in e)"class"!=o&&(n[o]=e[o]);return n},e.joinClasses=n,e.cls=function(r,t){for(var a=[],s=0;s<r.length;s++)a.push(t&&t[s]?e.escape(n([r[s]])):n(r[s]));var i=n(a);return i.length?' class="'+i+'"':""},e.attr=function(r,n,t,a){return"boolean"==typeof n||null==n?n?" "+(a?r:r+'="'+r+'"'):"":0==r.indexOf("data")&&"string"!=typeof n?" "+r+"='"+JSON.stringify(n).replace(/'/g,"&apos;")+"'":t?" "+r+'="'+e.escape(n)+'"':" "+r+'="'+n+'"'},e.attrs=function(r,t){var a=[],s=Object.keys(r);if(s.length)for(var i=0;i<s.length;++i){var l=s[i],o=r[l];"class"==l?(o=n(o))&&a.push(" "+l+'="'+o+'"'):a.push(e.attr(l,o,!1,t))}return a.join("")},e.escape=function(r){var n=String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return n===""+r?r:n},e.rethrow=function a(r,n,e,t){if(!(r instanceof Error))throw r;if(!("undefined"==typeof window&&n||t))throw r.message+=" on line "+e,r;try{t=t||require("fs").readFileSync(n,"utf8")}catch(s){a(r,null,e)}var i=3,l=t.split("\n"),o=Math.max(e-i,0),c=Math.min(l.length,e+i),i=l.slice(o,c).map(function(r,n){var t=n+o+1;return(t==e?"  > ":"    ")+t+"| "+r}).join("\n");throw r.path=n,r.message=(n||"Jade")+":"+e+"\n"+i+"\n\n"+r.message,r},e}();

    var templatizer = {};
    templatizer["includes"] = {};
    templatizer["pages"] = {};

    // body.jade compiled template
    templatizer["body"] = function tmpl_body() {
        return '<body><nav role="navigation" class="navbar"><div class="navbar-header"><a href="/" class="navbar-brand"><span class="logotype">IOU</span></a></div></nav><div class="container"><main data-hook="page-container"></main></div></body>';
    };

    // head.jade compiled template
    templatizer["head"] = function tmpl_head() {
        return '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/><link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png"/><link rel="shortcut icon" href="/apple-touch-icon.png"/>';
    };

    // includes/balance.jade compiled template
    templatizer["includes"]["balance"] = function tmpl_includes_balance() {
        return '<a data-hook="balance" class="list-group-item list-group-link"><span class="subject">@<span data-hook="subject"></span></span> <span data-hook="verb" class="verb"></span> <div class="list-group-link-rhs"><span class="currency">$ </span><span data-hook="amount" class="amount"></span></div></a>';
    };

    // includes/transaction.jade compiled template
    templatizer["includes"]["transaction"] = function tmpl_includes_transaction() {
        return '<a data-hook="transaction" class="list-group-item media list-group-link list-group-media"><img data-hook="image" class="media-object"/><div data-hook="body" class="media-body"><div data-hook="text"></div><small class="text-muted">&mdash; <span data-hook="ower"></span> <time data-hook="timestamp"></time></small></div></a>';
    };

    // includes/xbalance.jade compiled template
    templatizer["includes"]["xbalance"] = function tmpl_includes_xbalance() {
        return '<a data-hook="balance" class="list-group-item list-group-link"><span data-hook="prefix-verb" class="verb"></span> <span class="subject">@<span data-hook="subject"></span></span> <span data-hook="suffix-verb" class="verb"></span> <div class="list-group-link-rhs"><span class="currency">$ </span><span data-hook="amount" class="amount"></span></div></a>';
    };

    // pages/balance.jade compiled template
    templatizer["pages"]["balance"] = function tmpl_pages_balance() {
        return '<section class="page balance"><div class="panel panel-default"><div class="panel-heading clearfix"><span data-hook="ower" class="subject"></span> <span data-hook="verb" class="verb"></span><div class="panel-heading-rhs"><span class="currency">$ </span><span data-hook="total" class="amount"></span></div></div><div data-hook="balances" class="list-group"></div></div><footer><a data-hook="owe" class="btn btn-primary btn-block">Owe @<span data-hook="ower"></span></a><a data-hook="roulette" class="btn btn-default btn-block roulette-link">Who pays?</a></footer></section>';
    };

    // pages/home.jade compiled template
    templatizer["pages"]["home"] = function tmpl_pages_home() {
        return '<section class="page home"><div data-hook="balances" class="list-group"></div><footer><a href="/owe" class="btn btn-primary btn-block">Owe someone</a></footer></section>';
    };

    // pages/roulette.jade compiled template
    templatizer["pages"]["roulette"] = function tmpl_pages_roulette() {
        return '<section class="page roulette"><h1 data-hook="headline" class="roulette-headline">0.00</h1><div class="panel panel-default roulette-panel"><div class="panel-heading clearfix roulette-heading"><span data-hook="heading-prefix-verb" class="verb roulette-owed"></span> <a data-hook="heading-balance-url">@<span data-hook="heading-user" class="subject"></span></a> <span data-hook="heading-suffix-verb" class="verb roulette-owes"></span><div data-hook="heading-amount-container" class="panel-heading-rhs"><span class="currency">$ </span><span data-hook="heading-amount" class="amount"></span></div></div><div data-hook="neighbors" class="list-group roulette-neighbors"></div></div><div data-hook="no-neighbors" class="roulette-no-neighbors">Nobody here! :-(</div><div data-hook="geo-features-missing" class="alert alert-danger roulette-features-missing">Sorry! IOU Roulette requires a browser with<a href="http://html5test.com/compare/feature/location-geolocation/communication-eventSource.html">Geolocation and Server-Sent Events</a></div><div data-hook="geo-permission-denied" class="alert alert-danger roulette-geo-permission-denied">IOU Roulette needs to know your location in order to find other users nearby.<a href="#" class="roulette-geo-enable">Let\'s try again</a></div><div data-hook="geo-position-unavailable" class="alert alert-danger roulette-geo-position-unavailable">Position unavailable.<a href="#" class="roulette-geo-enable">Let\'s try again</a></div><div data-hook="geo-timeout" class="alert alert-danger roulette-geo-timeout">Timeout trying to determine your position.<a href="#" class="roulette-geo-enable">Let\'s try again</a></div><div data-hook="geo-error" class="alert alert-danger roulette-geo-error">Unable to determine your position:<span data-hook="geo-error-message" class="roulette-geo-error-message"></span><a href="#" class="roulette-geo-enable">Let\'s try again</a></div><div data-hook="post-error" class="alert alert-danger roulette-post-error">Unable to contact server:<span data-hook="post-error-message" class="roulette-post-error-message"></span><a href="#" class="roulette-geo-enable">Let\'s try again</a></div></section>';
    };

    // pages/transactions.jade compiled template
    templatizer["pages"]["transactions"] = function tmpl_pages_transactions() {
        return '<section class="page transactions"><div class="panel panel-default"><div class="panel-heading clearfix"><a data-hook="subjectLink">@<span data-hook="subject"></span></a> owes <a data-hook="objectLink">@<span data-hook="object"></span></a><div class="panel-heading-rhs"><span class="currency">$ </span><span data-hook="total" class="amount"></span></div></div><div data-hook="transactions" class="list-group"></div></div><footer><a data-hook="owe" class="btn btn-primary btn-block">Owe @<span data-hook="owee"></span></a></footer></section>';
    };

    return templatizer;
}));