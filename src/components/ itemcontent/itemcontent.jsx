/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { format, addMinutes, parseJSON } from 'date-fns';

import './itemcontent.scss';

const ItemContent = function({ direction }) {
  const { origin, destination, date, stops, duration } = direction;

  const getStopsCountLabel = (length) => {
    if (length === 0) {
      return 'без пересадок';
    }
    if (length === 1) {
      return '1 пересадка';
    }
    return `${length} пересадки`;
  };

  const formattedDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mm = minutes - hours * 60;
    return `${hours}ч ${mm}м`;
  };

  const formatDate = (dateToFormat) => format(dateToFormat, 'HH:mm');

  const parsedDate = parseJSON(date);
  const timeStart = formatDate(parsedDate);
  const timeFinish = formatDate(addMinutes(parsedDate, duration));
  const humanDuration = formattedDuration(duration);

  const stopsList = stops.join(', ');

  const stopsCountLabel = getStopsCountLabel(stops.length);

  return (
    <div className="ticket__flight">
      <div className="ticket__info">
        <p className="font--grey-title">{`${origin} - ${destination}`}</p>
        <p>{`${timeStart} – ${timeFinish}`}</p>
      </div>

      <div className="ticket__info">
        <p className="font--grey-title">В пути</p>
        <p>{humanDuration}</p>
      </div>

      <div className="ticket__info">
        <p className="font--grey-title">{stopsCountLabel}</p>
        <p>{stopsList}</p>
      </div>
    </div>
  );
}

export default ItemContent;

ItemContent.propTypes = {
  direction: PropTypes.shape({
    origin: PropTypes.string,
    destination: PropTypes.string,
    date: PropTypes.string,
    stops: PropTypes.arrayOf(PropTypes.string),
    duration: PropTypes.number,
  }).isRequired,
};