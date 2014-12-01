var Cycle = require('cyclejs');
var h = Cycle.h;
var Rx = Cycle.Rx;
var xhr = require('../xhr');

function vrenderTxns(txns) {
    return txns
        .map(function(txn) {
            return h('li',
                     h('a', { href: txn.href },
                       txn.ower + ' owed ' + txn.owee + ' ' + txn.amount));
        })
}

var TxnsModel = Cycle.createModel(['txnsRoute$'], function(routeModel) {
    return {
        txns$: routeModel.txnsRoute$
            .map(function(ctx) {
                return '/api' + ctx.pathname
            })
            .flatMap(xhr.jsonSource)
            .map(function(body) {
                return body.rows
                    .map(function(row) {
                        var tweet = row.doc.raw;
                        return {
                            ower: row.key[0],
                            owee: row.key[1],
                            amount: row.value,
                            href: 'http://twitter.com/' + tweet.user.id_str + '/status/' + tweet.id_str
                        };
                    });
            })
    };
});

var TxnsView = Cycle.createView(['txns$'], function(model) {
    return {
        events: [],
        vtree$: model.txns$
            .map(function(txns) {
                return h('div.page#txns',
                    h('ul', vrenderTxns(txns))
                );
            })
    };
});

exports.Model = TxnsModel;
exports.View = TxnsView;
