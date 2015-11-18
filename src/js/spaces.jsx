var React = require("react");
var ReactRouter = require("react-router");
var Loading = require("./loading.jsx");
var Link = ReactRouter.Link;

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
            <Link className="list-group-item" to={"/space/" + space.id} key={idx}>
                <h4 className="list-group-item-heading">{space.title}</h4>
                <p className="list-group-item-text">{space.description}</p>
            </Link>
        );
    },

    render: function() {
        if (this.state.spaces) {
            return (
                <section>
                    <h2>All spaces</h2>
                    <div className="list-group">
                        {this.state.spaces.map(this.renderSpace)}
                    </div>
                </section>
            );
        } else {
            return <Loading />;
        }
    }
});

module.exports = Spaces;
