import React from 'react';
import PropTypes from 'prop-types';

function QandASearch(props) {
  const {
    search,
    change,
  } = props;

  return (
    <div className="kris-QandASearch">
      <input className="kris-SearchBar" placeholder="Have a question? Search for answers..." value={search} onChange={change} />
    </div>
  );
}

QandASearch.propTypes = {
  search: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};
export default QandASearch;
