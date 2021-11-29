/* eslint-disable func-names */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Item from '../item';
import Alert from '../alert';

import './item-list.scss';

const ItemList = function ({ data }) {
  if (data.length === 0) {
    return <Alert />;
  }
  return data
    .filter((item, index) => index < 5)
    .map((item) => (
      <li>
        <Item item={item} />
      </li>
    ));
};

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps)(ItemList);

ItemList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
