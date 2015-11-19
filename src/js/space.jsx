var React = require("react");
var Loading = require("./loading.jsx");
var data = require("./data.js");

var Space = React.createClass({

    getInitialState: function() {
        return {
            space: null,
            users: null
        };
    },

    componentDidMount: function() {
        this.loadData();
    },

    loadSpace: function() {
        if (this.props.params.id) {
            return data.Space.getById(this.props.params.id);
        } else {
            // create a new space
            return new Promise(function(resolve) {
                resolve({});
            });
        }
    },

    loadUsers: function() {
        return data.User.getAll();
    },

    loadData: function() {
        var self = this;
        return Promise.all([this.loadUsers(), this.loadSpace()]).then(function(results) {
            if (self.isMounted()) {
                var users = results[0];
                var space = results[1];
                self.setState({ users: users, space: space });
            }
        });
    },

    // Return the IDs of the currently selected members underneath the member select element.
    getSelectedMembers: function(membersEl) {
        // options isn't a real JS array, so no map/filter
        var values = [];
        for (var i = 0; i < membersEl.options.length; i++) {
            var option = membersEl.options[i];
            if (option.selected) {
                values.push(option.value);
            }
        }
        return values;
    },

    onChange: function() {
        this.state.space.title = this.refs.title.value;
        this.state.space.description = this.refs.description.value;
        this.state.space.featured = this.refs.featured.checked;
        this.state.space.private = this.refs.private.checked;
        this.state.space.members = this.getSelectedMembers(this.refs.members);
        this.setState({ space: this.state.space })
    },

    onSubmit: function() {
        var self = this;
        if (this.state.space.id) {
            data.Space.updateById(this.state.space.id, this.state.space).then(function(space) {
                console.log("Updated space " + self.state.space.id + ".");
                self.setState({ space: space });
            });
        } else {
            data.Space.create(this.state.space).then(function(space) {
                console.log("Created space " + self.state.space.id + ".");
                self.setState({ space: space });
                self.props.history.push("/space/" + space.id);
            })
        }
    },

    renderMemberOption: function(user, idx) {
        return <option key={idx} value={user.id}>{user.first_name}</option>;
    },

    render: function() {
        if (this.state.space && this.state.users) {
            return (
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input ref="title" type="text" className="form-control" id="title"
                               onChange={this.onChange} value={this.state.space.title} placeholder="My space"></input>
                        <span className="help-block">
                            A friendly name for this space.
                        </span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea ref="description" id="description" className="form-control" rows="5"
                                  onChange={this.onChange} value={this.state.space.description}></textarea>
                        <span className="help-block">
                            A short description of what this space contains.
                        </span>
                    </div>
                    <div className="checkbox">
                        <label><input onChange={this.onChange} ref="featured" id="featured" type="checkbox" checked={this.state.space.featured}></input>Featured</label>
                    </div>
                    <div className="checkbox">
                        <label><input onChange={this.onChange} ref="private" id="private" type="checkbox" checked={this.state.space.private}></input>Private</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="members">Members</label>
                        <select ref="members" multiple={true} id="members" className="form-control"
                                onChange={this.onChange} value={this.state.space.members}>
                            {this.state.users.map(this.renderMemberOption)}
                        </select>
                        <span className="help-block">
                            Which users are allowed to enter this space.
                        </span>
                    </div>
                    <button onSubmit={this.onSubmit} type="submit" className="btn btn-default">
                        {this.state.space.id ? "Update" : "Create"}
                    </button>
                </form>
            );
        } else {
            return <Loading />;
        }
    }
});

module.exports = Space;
