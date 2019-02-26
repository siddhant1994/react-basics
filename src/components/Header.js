import React from "react";

const Header = () => {
    return (
        <nav className="navigation">
            <div>
                <div className="navbar-header">
                    <a className="navbar-brand logo" href="/">
                        <span></span>
                    </a>
                </div>
                <ul className="navigation_links">
                    <li><a href="#/events">Events</a></li>
                    <li><a href="#/subcategories">Subcategories</a></li>
                    <li className="active"><a href="#">Categories</a></li>
                </ul>
            </div>
        </nav>

    );
};

export default Header