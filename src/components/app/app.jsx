/* eslint-disable func-names */
import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import 'antd/es/progress/style/index.css';
import { Progress, Spin } from 'antd';
import './app.scss';
import 'antd/es/spin/style/index.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ItemList from '../item-list';
import Filter from '../filter';
import Sort from '../sort';
import * as actions from '../../actions';
import logo from './Logo.png';

const allFilters = ['Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];

const defaultFilters = ['Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];

const withAllFilters = (data, checkedList, filters) => (checkboxNumber) =>
  !checkedList.includes(filters[checkboxNumber])
    ? []
    : data.filter((ticket) => {
        const stopsCount = ticket.segments[0].stops.length;
        return stopsCount === checkboxNumber;
      });

const App = function ({ isLoading, data, sort, filter, DataFlight, progress }) {
  const { checkedList } = filter;

  const withOneFilter = withAllFilters(data, checkedList, allFilters);

  const filteredOptions = useMemo(
    () => allFilters.reduce((acc, filterName, checkboxNumber) => [...acc, ...withOneFilter(checkboxNumber)], []),
    [withOneFilter]
  );

  const sortedOptions = useMemo(
    () =>
      sort === 'fastest'
        ? filteredOptions.sort((prev, next) => (prev.segments[0].duration > next.segments[0].duration ? 1 : -1))
        : filteredOptions.sort((prev, next) => (prev.price > next.price ? 1 : -1)),
    [filteredOptions, sort]
  );

  useEffect(() => {
    DataFlight();
  }, [DataFlight]);

  return (
    <div className="app">
      <Progress
        percent={progress}
        showInfo={false}
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#108ee9',
        }}
      />
      <header className="header">
        <img alt="logo" src={logo} />
      </header>

      <main className="content">
        <Filter filters={{ allFilters, defaultFilters }} />
        <section className="ticket-list">
          <Sort />

          <Spin spinning={isLoading} size="large">
            <ul className="ticket-list">{isLoading ? null : <ItemList data={sortedOptions} />}</ul>
          </Spin>
        </section>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  searchId: state.searchId,
  isLoading: state.isLoading,
  data: state.data,
  filter: state.filter,
  sort: state.sort,
  progress: state.progress,
});

const mapDispatchToProps = (dispatch) => {
  const { DataFlight } = bindActionCreators(actions, dispatch);
  return {
    DataFlight,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.shape({
    checkedList: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  DataFlight: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
};
