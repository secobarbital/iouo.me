(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
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
        return '<body><nav role="navigation" class="navbar"><div class="navbar-header"><a href="/" class="navbar-brand"><span class="logotype">IOU</span></a></div></nav><div class="container"><main role="page-container"></main></div></body>';
    };

    // head.jade compiled template
    templatizer["head"] = function tmpl_head() {
        return '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/><link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png"/><link rel="shortcut icon" href="/apple-touch-icon.png"/>';
    };

    // includes/balance.jade compiled template
    templatizer["includes"]["balance"] = function tmpl_includes_balance() {
        return '<a role="balance" class="list-group-item list-group-link"><span class="subject">@<span role="subject"></span></span> <span role="verb" class="verb"></span> <div class="list-group-link-rhs"><span class="currency">$ </span><span role="amount" class="amount"></span></div></a>';
    };

    // includes/transaction.jade compiled template
    templatizer["includes"]["transaction"] = function tmpl_includes_transaction() {
        return '<a role="transaction" class="list-group-item media list-group-link list-group-media"><img role="image" class="media-object"/><div role="body" class="media-body"><div role="text"></div><small class="text-muted">&mdash; <span role="ower"></span> <time role="timestamp"></time></small></div></a>';
    };

    // includes/xbalance.jade compiled template
    templatizer["includes"]["xbalance"] = function tmpl_includes_xbalance() {
        return '<a role="balance" class="list-group-item list-group-link"><span role="prefixVerb" class="verb"></span> <span class="subject">@<span role="subject"></span></span> <span role="suffixVerb" class="verb"></span> <div class="list-group-link-rhs"><span class="currency">$ </span><span role="amount" class="amount"></span></div></a>';
    };

    // pages/balance.jade compiled template
    templatizer["pages"]["balance"] = function tmpl_pages_balance() {
        return '<section class="page balance"><div class="panel panel-default"><div class="panel-heading clearfix"><span role="ower" class="subject"></span> <span role="verb" class="verb"></span><div class="panel-heading-rhs"><span class="currency">$ </span><span role="total" class="amount"></span></div></div><div role="balances" class="list-group"></div></div><footer><a role="owe" class="btn btn-primary btn-block">Owe @<span role="ower"></span></a></footer></section>';
    };

    // pages/home.jade compiled template
    templatizer["pages"]["home"] = function tmpl_pages_home() {
        return '<section class="page home"><div role="balances" class="list-group"></div><footer><a href="/owe" class="btn btn-primary btn-block">Owe someone</a></footer></section>';
    };

    // pages/transactions.jade compiled template
    templatizer["pages"]["transactions"] = function tmpl_pages_transactions() {
        return '<section class="page transactions"><div class="panel panel-default"><div class="panel-heading clearfix"><a role="subjectLink">@<span role="subject"></span></a> owes <a role="objectLink">@<span role="object"></span></a><div class="panel-heading-rhs"><span class="currency">$ </span><span role="total" class="amount"></span></div></div><div role="transactions" class="list-group"></div></div><footer><a role="owe" class="btn btn-primary btn-block">Owe @<span role="owee"></span></a></footer></section>';
    };

    return templatizer;
}));