import Axios from "axios";
import React, { useState, useEffect } from "react";

const Search = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const search = async () => {
      if (!term) return;
      const { data } = await Axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });
      setResults(data.query.search);
    };
    const timeOutId = setTimeout(() => {
      if (term) search();
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [term]);

  const renderResults = results.map((r) => {
    return (
      <div key={r.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${r.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{r.title}</div>
          <span dangerouslySetInnerHTML={{ __html: r.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>ENter the search term</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>
      <div className="ui celled list">{renderResults}</div>
    </div>
  );
};

export default Search;
