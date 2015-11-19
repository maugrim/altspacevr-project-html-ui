var React = require("react");

// A widget to indicate when data for a page is loading. TODO: a loading gif or something.
var Loading = React.createClass({
    render: function() {
        return <p>Loading...</p>;
    }
});

module.exports = Loading;
