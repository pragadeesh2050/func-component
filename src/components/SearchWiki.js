import React, { useState } from "react";
import axios from "axios";

const SearchWiki = () => {
  const [searchText, setsearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchResultTemplate = searchResults.map(
    ({ pageid, title, snippet }) => {
      return (
        <React.Fragment key={pageid}>
          <a
            href={`https://en.wikipedia.org/?curid=${pageid}`}
            target="_blank"
            className="list-group-item list-group-item-action"
            rel="noreferrer"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{title}</h5>
            </div>
            <p
              className="mb-1"
              dangerouslySetInnerHTML={{ __html: snippet }}
            ></p>
            <small>Donec id elit non mi porta.</small>
          </a>
        </React.Fragment>
      );
    }
  );

  const performSearch = async () => {
    console.log(searchText);
    const searchResults = await axios.get(
      "https://en.wikipedia.org/w/api.php",
      {
        params: {
          action: "query",
          list: "search",
          format: "json",
          origin: "*",
          srsearch: searchText,
          limit: 10,
        },
      }
    );

    const { data } = searchResults;
    console.log(data.query.search);
    setSearchResults(data.query.search);
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Wikipedia"
                    aria-label="Search Wikipedia"
                    aria-describedby="click-search"
                    value={searchText}
                    onChange={(e) => setsearchText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        performSearch();
                      }
                    }}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      id="click-search"
                      onClick={performSearch}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
              {/* Search Results */}

              <div className="row">
                <div className="col">
                  <div className="list-group">{searchResultTemplate}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWiki;
