import { translations } from './translations';

export const getCorrectQueryName = (language, queryName, queryId) => {
  if (queryName) {
    return queryName;
  }

  return queryId === 0
    ? translations[language.code].queryBuilder.mainQuery
    : `${translations[language.code].queryBuilder.query} ${queryId}`;
};
