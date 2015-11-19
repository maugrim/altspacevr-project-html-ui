var React = require("react");
var ReactRouter = require("react-router");
var Loading = require("./loading.jsx");
var Link = ReactRouter.Link;

var data = require("./data.js");

// The list of all the users in the directory.
var Users = React.createClass({

    getInitialState: function() {
        return { users: null };
    },

    componentDidMount: function() {
        this.loadUsers();
    },

    loadUsers: function() {
        var self = this;
        return data.User.getAll().then(function(users) {
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
                <section>
                    <h2>All users</h2>
                    <div className="list-group">
                        {this.state.users.map(this.renderUser)}
                    </div>
                </section>
            );
        } else {
            return <Loading />;
        }
    }
});

module.exports = Users;
