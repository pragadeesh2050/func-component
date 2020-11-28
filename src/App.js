import React from "react";
import SearchWiki from './components/SearchWiki';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="/">
            Wikipedia
          </a>
        </nav>

        <SearchWiki />
      </div>
    );
  }
}

export default App;
