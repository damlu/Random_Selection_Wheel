import React from "react";
import { Link } from "react-router";

class Sidebar extends React.Component {
  // ...
  render() {
    const users = [];
    return (
      <div>
        <button onClick={this.toggleExpand}>expand</button>
        <ul>
          {users.map(user => (
            <li>
              <Link to={user.path}>{user.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
