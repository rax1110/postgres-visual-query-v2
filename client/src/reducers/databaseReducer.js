import {
  ADD_TABLES,
  ADD_COLUMNS,
  ADD_CONSTRAINTS,
  CHANGE_SELECTED_SCHEMA,
  UPDATE_SEARCH_EXPR,
  DELETE_DATABASE,
} from '../actions/databaseActions';

export const INITIAL_STATE = {
  schemas: [],
  tables: [],
  columns: [],
  selectedSchema: '',
  constraints: [],
  searchExpr: '',
};

export const databaseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TABLES: {
      const schemas = [];

      action.payload.forEach((table) => {
        if (!schemas.includes(table.table_schema)) {
          schemas.push(table.table_schema);
        }
      });

      let selectedSchema = schemas[0];

      if (schemas.includes('public')) {
        const index = schemas.findIndex(schema => schema === 'public');
        selectedSchema = schemas[index];
      }

      return {
        ...state,
        schemas,
        tables: action.payload,
        selectedSchema,
      };
    }
    case CHANGE_SELECTED_SCHEMA: {
      return {
        ...state,
        selectedSchema: action.payload,
      };
    }
    case ADD_COLUMNS: {
      return {
        ...state,
        columns: action.payload,
      };
    }
    case ADD_CONSTRAINTS: {
      return {
        ...state,
        constraints: action.payload,
      };
    }
    case UPDATE_SEARCH_EXPR: {
      return {
        ...state,
        searchExpr: action.payload,
      };
    }
    case DELETE_DATABASE: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};
