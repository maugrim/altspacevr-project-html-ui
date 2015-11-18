var React = require("react");
var Loading = require("./loading.jsx");
var data = require("./data.js");

var Spaces = React.createClass({

    getInitialState: function() {
        return {
            spaces: null
        };
    },

    componentDidMount: function() {
        var self = this;
        data.Space.getAll().then(function(spaces) {
            if (self.isMounted()) {
                self.setState({ spaces: spaces });
            }
        });
    },

    renderSpace: function(space, idx) {
        return (
            <li className="list-group-item" key={idx}>
                <h4 className="list-group-item-heading">{space.title}</h4>
                <p className="list-group-item-text">{space.description}</p>
            </li>
        );
    },

    render: function() {
        if (this.state.spaces) {
            return (
                <ul className="list-group">
                    {this.state.spaces.map(this.renderSpace)}
                </ul>
            );
        } else {
            return <Loading />;
        }
    }
});

module.exports = Spaces;
