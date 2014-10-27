/** @jsx React.DOM */

var accounting = require('accounting');
var React = require('react');
var request = require('superagent');
var OwerRow = require('./OwerRow');
var Loading = require('./Loading');

var OwersPage = React.createClass({
    getInitialState: function() {
        var initialData = this.props.initialData;
        return {
            source: '/api',
            data: initialData || {}
        };
    },

    componentDidMount: function() {
        if (!this.props.initialData) {
            this.fetch();
        }
    },

    fetch: function() {
        var source = this.state.source;
        request.get(source, function(res) {
            if (this.isMounted()) {
                this.setState({
                    data: res.body
                });
            }
        }.bind(this));
    },

    getOwersFromData: function(data) {
        return data.rows.map(function(row) {
            var link = '/' + name;
            return {
                name: name,
                verb: verb,
                amount: amount,
                link: link
            };
        }).sort(function(a, b) {
            return b.amount - a.amount;
        });
    },

    render: function() {
        var data = this.state.data;
        if (!data.rows) {
            return <Loading />
        }
        var owerRows = data.rows.filter(function(row) {
            return row.value !== 0;
        }).sort(function(a, b) {
            return b.value - a.value;
        }).map(function(row) {
            var ower = row.key[0];
            var amount = row.value;
            var verb = amount > 0 ? 'owes' : 'is owed';
            var params = {
                ower: ower
            };
            return (
                <OwerRow key={'balance-' + ower} ower={ower} verb={verb} amount={amount} to="owees" params={params} />
            );
        });
        return (
            <div className="content">
                <ul className="table-view">
                    {owerRows}
                </ul>
            </div>
        );
    }
});

module.exports = OwersPage;
