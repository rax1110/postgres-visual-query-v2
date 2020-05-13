export const ADD_QUERY = 'ADD_QUERY';
export const UPDATE_QUERIES = 'UPDATE_QUERIES';
export const REMOVE_MAIN_FROM_QUERIES = 'REMOVE_MAIN_FROM_QUERIES';
export const DELETE_QUERIES = 'DELETE_QUERIES';

export const addQuery = activeQueryId => ({ type: ADD_QUERY, payload: { activeQueryId } });

export const updateQueries = (lastQuery, activeQueryId) => (
  { type: UPDATE_QUERIES, payload: { lastQuery, activeQueryId } }
);

export const deleteQueries = () => ({ type: DELETE_QUERIES });

export const removeMainFromQueries = () => ({ type: REMOVE_MAIN_FROM_QUERIES });
