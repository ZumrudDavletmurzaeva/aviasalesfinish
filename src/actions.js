
import { getSearchId, getData } from './services/aviasalesApi';

export const sortCheapest = () => ({ type: 'SORT__CHEAPEST' });

export const sortFastest = () => ({ type: 'SORT__FASTEST'});

export const CheckedList = (list) => ({ type: 'CHECKED__LIST', list });

export const CheckedAll = (checked) => ({ type: 'CHECKED__ALL', checked });

export const Error = (error) => ({ type: 'SET__ERROR', error });

export const Loading = (isLoading) => ({ type: 'SET__LOADING', isLoading });

export const Progress = (progress) => ({ type: 'SET__PROGRESS', progress });



export const DataFlight = () => async (dispatch) => {
  dispatch(Loading(true));
  let responseId;
  try {
    responseId = await getSearchId();
  } catch (err) {
    dispatch(Error(err));
    dispatch(Loading(false));
    return;
  }
  try {
   const { tickets, stop} = await getData(responseId.searchId);
   if (stop) {
    dispatch(Progress(100));
   }
   dispatch({ type: 'SET__DATA', tickets}); 
   dispatch(Progress((100)));
  } catch (err) {
    dispatch(Error(err));
  } finally {
   dispatch(Loading(false));
    }
  
};

