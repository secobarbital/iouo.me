var Cycle = require('cyclejs');
var h = Cycle.h;
var Rx = Cycle.Rx;

var Route = require('./route');
var Owers = require('./owers');
var Owees = require('./owees');
var page = require('./page');
var style = require('./style.styl');

Cycle.createRenderer('#app').inject(Route.View);
Route.Intent.inject(Route.View, Owers.Intent, Owees.Intent);
Route.View.inject(Route.Model, Owers.View, Owees.View);
Route.Model.inject(Route.Intent);
page();
