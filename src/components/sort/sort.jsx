/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../../actions';

import './sort.scss';

const Sort = function ({ sort, sortCheapest, sortFastest }) {
  const cheapestClassNames = cn({
    sort__btn: true,
    'sort__btn--focused': sort === 'cheapest',
  });

  const fastestClassNames = cn({
    sort__btn: true,
    'sort__btn--focused': sort === 'fastest',
  });

  return (
    <div className="sort">
      <button type="button" className={cheapestClassNames} onClick={sortCheapest}>
        Самый дешевый
      </button>
      <button type="button" className={fastestClassNames} onClick={sortFastest}>
        Самый быстрый
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sort: state.sort,
});

const mapDispatchToProps = (dispatch) => {
  const { sortCheapest, sortFastest } = bindActionCreators(actions, dispatch);
  return {
    sortCheapest,
    sortFastest,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);

Sort.propTypes = {
  sort: PropTypes.string.isRequired,
  sortCheapest: PropTypes.func.isRequired,
  sortFastest: PropTypes.func.isRequired,
};
