var Cycle = require('cyclejs');
var h = Cycle.h;
var Rx = Cycle.Rx;

var Route = require('./route');
var Owers = require('./owers');
var Owees = require('./owees');
var page = require('./page');
var style = require('./style.styl');

Cycle.createRenderer('#app').inject(Route);

Owers.Intent.inject(Owers.View, Route);
Owers.View.inject(Owers.Model);
Owers.Model.inject(Owers.Intent);

Owees.Intent.inject(Owees.View, Route);
Owees.View.inject(Owees.Model);
Owees.Model.inject(Owees.Intent);

Route.inject(Owers.View, Owees.View);

page();
