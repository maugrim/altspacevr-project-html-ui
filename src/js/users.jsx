var React = require("react");
var Loading = require("./loading.jsx");
var data = require("./data.js");

var Users = React.createClass({

    getInitialState: function() {
        return { users: null };
    },

    componentDidMount: function() {
        var self = this;
        data.User.getAll().then(function(users) {
            if (self.isMounted()) {
                self.setState({ users: users });
            }
        });
    },

    renderUser: function(user, idx) {
        return (
            <li className="list-group-item" key={idx}>
                {user.first_name + " " + user.last_name}
            </li>
        );
    },

    render: function() {
        if (this.state.users) {
            return (
                <ul className="list-group">
                    {this.state.users.map(this.renderUser)}
                </ul>
            );
        } else {
            return <Loading />;
        }
    }
});

module.exports = Users;
