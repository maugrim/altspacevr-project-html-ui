var $ = global.jQuery = require("jquery"); // bootstrap depends on it
var React = require("react");
var ReactDOM = require("react-dom");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var Navigation = require("./navigation.jsx");
var Spaces = require("./spaces.jsx");
var Users = require("./users.jsx");

require("./app.css");

var App = React.createClass({
    render: function() {
        return (
            <main>
                <Navigation path={this.props.location.pathname}></Navigation>
                <div className="container">
                    {this.props.children}
                </div>
            </main>
        );
    }
});

ReactDOM.render((
    <Router>
        <Route path="/" component={App}>
            <Route path="spaces" component={Spaces}/>
            <Route path="users" component={Users}/>
        </Route>
    </Router>
), $("#app")[0]);
