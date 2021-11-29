/* eslint-disable func-names */

/* eslint-disable no-unused-vars */
import React, {useState,useEffect} from 'react';
import { Checkbox } from 'antd';
import './filter.scss'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../actions'


const Filter = function({filters, stateFilter, CheckedList, CheckedAll}) {
  const { allFilters, defaultFilters } = filters;
  const { checkedList, checkAll } = stateFilter;

  
 
  useEffect(() => {
    CheckedList(defaultFilters);
    CheckedAll(defaultFilters.length === allFilters.length);
  }, [CheckedList, CheckedAll, allFilters, defaultFilters]);

  const onChange = (checkList) => {
    CheckedAll(checkList.length === allFilters.length);
    CheckedList(checkList);
  };

  const onCheckAllChange = (event) => {
    const isChecked = event.target.checked;
    CheckedAll(isChecked);
    CheckedList(isChecked ? allFilters : []);
  };

return (
<aside className="content-filter">
<h5>КОЛИЧЕСТВО ПЕРЕСАДОК</h5>
<Checkbox className="filter-all" onChange={onCheckAllChange} checked={checkAll}>  Все</Checkbox>
<Checkbox.Group className="filter-options"
options={allFilters} value={checkedList} onChange={onChange} 
/>
</aside>
)
}



const mapStateToProps = (state) => ({
    stateFilter: state.filter,
  });
const mapDispatchToProps = (dispatch) => {
  const { CheckedList, CheckedAll } = bindActionCreators(actions, dispatch);
  return {
    CheckedList,
    CheckedAll,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);


Filter.propTypes = {
  filters: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  stateFilter: PropTypes.shape({
    checkedList: PropTypes.arrayOf(PropTypes.string),
    checkAll: PropTypes.bool,
  }).isRequired,
  CheckedList: PropTypes.func.isRequired,
  CheckedAll: PropTypes.func.isRequired,
};