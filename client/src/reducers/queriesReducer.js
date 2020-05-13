import _ from 'lodash';
import {
  ADD_QUERY,
  DELETE_QUERIES,
  REMOVE_MAIN_FROM_QUERIES,
  UPDATE_QUERIES,
} from '../actions/queriesActions';
import { INITIAL_STATE } from './queryReducer';

const INIT_QUERIES_STATE = _.cloneDeep(INITIAL_STATE);

export const queriesReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_QUERY: {
      let id;

      if (state.length) {
        const allQueries = [...state, { id: action.payload.activeQueryId }];
        const maxId = Math.max(...allQueries.map(query => query.id));

        id = maxId + 1;
      } else {
        id = 1;
      }

      const query = {
        ...INIT_QUERIES_STATE,
        id,
      };

      return [...state, query];
    }
    case UPDATE_QUERIES: {
      const lastActiveQuery = _.cloneDeep(action.payload.lastQuery);
      const queries = [...state, lastActiveQuery];
      const newQueriesState = queries.filter(query => query.id !== action.payload.activeQueryId);

      return [...newQueriesState];
    }
    case REMOVE_MAIN_FROM_QUERIES: {
      const queriesState = _.cloneDeep(state);
      const queries = queriesState.filter(query => query.id !== 0);

      return [...queries];
    }
    case DELETE_QUERIES: {
      return [];
    }
    default:
      return state;
  }
};
