import React from "react";
import { IndexLink, Link } from "react-router";

import AuthMenu from '../Auth/Menu';

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({
      collapsed
    });
  }

  render() {
    const {location} = this.props;
    const {collapsed} = this.state;

    const assetsClass = (location.pathname === "/" || location.pathname.match(/^\/asset/)) ? "active" : "";
    const categoriesClass = location.pathname.match(/^\/categories/) ? "active" : "";
    const aboutClass = location.pathname.match(/^\/about/) ? "active" : "";

    const navClass = collapsed ? "collapse" : "";

    return (
      <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" onClick={this.toggleCollapse.bind(this)}>
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">Assetbase</a>
          </div>
          <div className={"navbar-collapse " + navClass}>
            <ul className="nav navbar-nav">
              <li className={assetsClass}>
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>
                  Assets
                </IndexLink>
              </li>
              <li className={categoriesClass}>
                <Link to="/categories" onClick={this.toggleCollapse.bind(this)}> Categories
                </Link>
              </li>
              <li className={aboutClass}>
                <Link to="/about" onClick={this.toggleCollapse.bind(this)}> About
                </Link>
              </li>
            </ul>
            <AuthMenu logout={this.props.onLogout} />
          </div>
        </div>
      </nav>
      );
  }
}
;

Nav.propTypes = {
  location: React.PropTypes.object,
  onLogout: React.PropTypes.func,
};