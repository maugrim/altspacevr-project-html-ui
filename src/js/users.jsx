var React = require("react");
var ReactRouter = require("react-router");
var Loading = require("./loading.jsx");
var Link = ReactRouter.Link;

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
            <Link className="list-group-item" to={"/user/" + user.id} key={idx}>
                {user.first_name + " " + user.last_name}
            </Link>
        );
    },

    render: function() {
        if (this.state.users) {
            return (
                <div className="list-group">
                    {this.state.users.map(this.renderUser)}
                </div>
            );
        } else {
            return <Loading />;
        }
    }
});

module.exports = Users;
