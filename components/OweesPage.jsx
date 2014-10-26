/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var request = require('superagent');
var OwerHeader = require('./OwerHeader');
var OweeRow = require('./OweeRow');
var Loading = require('./Loading');

var OweesPage = React.createClass({
    getInitialState: function() {
        var initialData = this.props.initialData;
        var ower = this.props.params.ower;
        return {
            source: '/api/' + ower,
            ower: ower,
            data: initialData || {}
        };
    },

    componentDidMount: function() {
        if (!this.props.initialData) {
            this.fetch();
        }
        this.props.setTitle('@' + this.state.ower);
        this.props.setLeftNav(function() {
            return <Link to="owers" className="icon icon-left-nav pull-left" />;
        });
    },

    componentWillUnmount: function() {
        setTimeout(function() {
            this.props.setLeftNav(null);
            this.props.setTitle(null);
        }.bind(this), 0);
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

    render: function() {
        var data = this.state.data;
        if (!data.rows) {
            return <Loading />
        }
        var ower = this.state.ower;
        var total = data.rows.reduce(function(sum, row) {
            return sum + row.value;
        }, 0);
        var oweeRows = data.rows.filter(function(row) {
            return row.value !== 0;
        }).sort(function(a, b) {
            return b.value - a.value;
        }).map(function(row) {
            var owee = row.key[1];
            var amount = row.value;
            var params = {
                ower: ower,
                owee: owee
            };
            return (
                <OweeRow key={'balance-' + ower + '-' + owee} owee={owee} amount={amount} to="transactions" params={params} />
            );
        });
        return (
            <div className="content">
                <OwerHeader ower={ower} amount={total} />
                <ul className="table-view">
                    {oweeRows}
                </ul>
            </div>
        );
    }
});

module.exports = OweesPage;
