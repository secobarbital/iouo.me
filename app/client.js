var Cycle = require('cyclejs');
var h = Cycle.h;
var Rx = Cycle.Rx;

var Route = require('./route');
var Owers = require('./owers');
var Owees = require('./owees');
var Txns = require('./txns');
var page = require('./page');
var style = require('./style.styl');

Cycle.createRenderer('#app').inject(Route.View);

Owers.View.inject(Owers.Model);
Owers.Model.inject(Route.Model);

Owees.View.inject(Owees.Model);
Owees.Model.inject(Route.Model);

Txns.View.inject(Txns.Model);
Txns.Model.inject(Route.Model);

Route.View.inject(Route.Model, Owers.View, Owees.View, Txns.View);

page();
