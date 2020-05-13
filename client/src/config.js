export const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080/postgres-query/api'
  : 'http://apex.ttu.ee:8080/postgres-query/api';
