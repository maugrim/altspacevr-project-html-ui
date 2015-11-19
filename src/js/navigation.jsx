var classNames = require("classnames");
var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;

// The navigation bar at the top of the page.
var Navigation = React.createClass({

    propTypes: {
        path: React.PropTypes.string
    },

    renderLink: function(destination, text) {
        // react-router has a feature where links can know if they are active, but it's
        // hard to use together with Bootstrap's navbar list entries in an obvious way
        var linkClass = classNames({ active: this.props.path === destination });
        return <li className={linkClass}><Link to={destination}>{text}</Link></li>;
    },

    render: function() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">Directory</Link>
                    </div>
                    <nav className="nav navbar-nav">
                        {this.renderLink("/spaces", "Spaces")}
                        {this.renderLink("/users", "Users")}
                    </nav>
                </div>
            </nav>
        );
    }
});

module.exports = Navigation;
