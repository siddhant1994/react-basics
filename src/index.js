import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Category from "./components/Category";
import Subcategory from './components/Subcategory';
import { HashRouter, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./static/css/style.css";
import "./static/css/common.css";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopUp: false,
            popup: {}
        };

        this.showPopUp = this.showPopUp.bind(this);
        this.closePopUp = this.closePopUp.bind(this);
    }

    showPopUp(popup) {
        this.setState({
            popup: popup,
            showPopUp: true
        });
    }

    closePopUp() {
        this.setState({
            popup: {},
            showPopUp: false
        });
    }

    render() {
        return (
            <div>
                <HashRouter>
                    <div className="container">
                        <Header />
                        <Route
                            exact
                            path="/"
                            render={props => (
                                <Category
                                    showPopUp={this.showPopUp}
                                    closePopUp={this.closePopUp}
                                    {...props}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/subcategories"
                            render={props => (
                                <Subcategory
                                    showPopUp={this.showPopUp}
                                    closePopUp={this.closePopUp}
                                    {...props}
                                />
                            )}
                        />
                        <Route path="/events" component={Topics} />
                    </div>
                </HashRouter>
                {JSON.stringify(this.state)}
                {this.state.showPopUp ? this.state.popup : ""}
            </div>
        );
    }
}

function About() {
    return (
        <div>
            {/*<Header />*/}
            <h2>About</h2>
        </div>
    );
}

function Topics({ match }) {
    return (
        <div>
            {/*<Header />*/}
            <h2>Topics</h2>
            <ul>
                <li>
                    <Link to={`${match.url}/rendering`}>
                        Rendering with React
                    </Link>
                </li>
                <li>
                    <Link to={`${match.url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>
                        Props v. State
                    </Link>
                </li>
            </ul>

            <Route path={`${match.path}/:topicId`} component={Topic} />
            <Route
                exact
                path={match.path}
                render={() => <h3>Please select a topic.</h3>}
            />
        </div>
    );
}

function Topic({ match }) {
    return (
        <div>
            <h3>{match.params.topicId}</h3>
        </div>
    );
}

ReactDOM.render(<Index />, document.getElementById("root"));
