var React = require("react");
var Loading = require("./loading.jsx");
var data = require("./data.js");

var User = React.createClass({

    getInitialState: function() {
        return {
            user: null
        };
    },

    componentDidMount: function() {
        var self = this;
        data.User.getById(this.props.params.id).then(function(user) {
            if (self.isMounted()) {
                self.setState({ user: user });
            }
        });
    },

    render: function() {
        if (this.state.user) {
            return (
                <p>TODO: details about {this.state.user.first_name + " " + this.state.user.last_name}.</p>
            );
        } else {
            return <Loading />;
        }
    }
});

module.exports = User;
