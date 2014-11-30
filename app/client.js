var Cycle = require('cyclejs');
var h = Cycle.h;
var Rx = Cycle.Rx;

var Route = require('./route');
var Owers = require('./owers');
var Owees = require('./owees');
var page = require('./page');
var style = require('./style.styl');

Cycle.createRenderer('#app').inject(Route);
Cycle.circularInject(Owers.Model, Owers.View, Owers.Intent);
Cycle.circularInject(Owees.Model, Owees.View, Owees.Intent);
Route.inject(Owers.View, Owees.View);
page();
