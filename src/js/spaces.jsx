var _ = require("lodash");
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
        this.loadSpaces();
    },

    loadSpaces: function() {
        var self = this;
        return data.Space.getAll().then(function(spaces) {
            if (self.isMounted()) {
                self.setState({ spaces: spaces });
            }
        });
    },

    onCreate: function() {
        this.props.history.push("/spaces/new");
    },

    deleteSpace: function(space, e) {
        e.preventDefault();
        data.Space.deleteById(space.id).then(this.loadSpaces);
    },

    renderSpace: function(space, idx) {
        return (
            <Link className="list-group-item" to={"/space/" + space.id} key={idx}>
                <span onClick={this.deleteSpace.bind(this, space)} className="pull-right glyphicon glyphicon-remove text-danger" aria-hidden="true"></span>
                <h4 className="list-group-item-heading">{space.title}</h4>
                <p className="list-group-item-text">{space.description}</p>
            </Link>
        );
    },

    renderSpaces: function(heading, spaces) {
        if (spaces.length) {
            return (
                <section>
                    <h2>{heading}</h2>
                    <div className="list-group">{spaces.map(this.renderSpace)}</div>
                </section>
            );
        }
    },

    render: function() {
        if (this.state.spaces) {
            if (this.state.spaces.length) {
                var spaceLists = _.partition(this.state.spaces, "featured");
                var featured = _.sortBy(spaceLists[0], "title");
                var others = _.sortBy(spaceLists[1], "title");
                return (
                    <div>
                        {this.renderSpaces("Featured spaces", featured)}
                        {this.renderSpaces("Other spaces", others)}
                        <button onClick={this.onCreate} type="button" className="btn btn-primary">Create space</button>
                    </div>
                );
            } else {
                return <p>There are no spaces yet. Perhaps you should <Link to="/spaces/new">create</Link> one?</p>
            }
        } else {
            return <Loading />;
        }
    }
});

module.exports = Spaces;
