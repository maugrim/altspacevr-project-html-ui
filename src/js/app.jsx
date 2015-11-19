var $ = global.jQuery = require("jquery"); // bootstrap depends on it
var React = require("react");
var ReactDOM = require("react-dom");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRedirect = ReactRouter.IndexRedirect;

var Navigation = require("./navigation.jsx");
var Spaces = require("./spaces.jsx");
var Space = require("./space.jsx");
var Users = require("./users.jsx");
var User = require("./user.jsx");

require("./app.css");

var App = React.createClass({
    render: function() {
        return (
            <main>
                <Navigation path={this.props.location.pathname}></Navigation>
                <div id="content" className="container">
                    {this.props.children}
                </div>
            </main>
        );
    }
});

ReactDOM.render((
    <Router>
        <Route path="/" component={App}>
            <IndexRedirect to="spaces"/>
            <Route path="spaces" component={Spaces}/>
            <Route path="spaces/new" component={Space}/>
            <Route path="space/:id" component={Space}/>
            <Route path="users" component={Users}/>
            <Route path="user/:id" component={User}/>
        </Route>
    </Router>
), $("#app")[0]);
