const queries = {
  postgre: {
    tables: 'SELECT table_schema, table_name, table_type\n' +
      'FROM information_schema.tables\n' +
      '/*Leia hetktõmmised*/\n' +
      'UNION SELECT n.nspname AS table_schema, c.relname AS table_name, \'MATERIALIZED VIEW\' AS table_type\n' +
      'FROM pg_catalog.pg_class AS c INNER JOIN pg_catalog.pg_namespace AS n ON c.relnamespace=n.oid\n' +
      'WHERE c.relkind=\'m\'\n' +
      'ORDER BY table_schema, table_type, table_name;',
    columns: 'SELECT table_schema, table_name, column_name, ordinal_position, data_type\n' +
      'FROM information_schema.columns\n' +
      '/*Leia hetktõmmise veerud*/\n' +
      'UNION SELECT n.nspname AS table_schema, c.relname AS table_name, a.attname AS column_name, a.attnum AS ordinal_position, t.typname AS data_type\n' +
      'FROM pg_catalog.pg_class AS c INNER JOIN pg_catalog.pg_namespace AS n ON c.relnamespace=n.oid\n' +
      'INNER JOIN pg_catalog.pg_attribute AS a ON c.oid=a.attrelid\n' +
      'INNER JOIN pg_catalog.pg_type AS t ON a.atttypid=t.oid\n' +
      'WHERE c.relkind=\'m\' AND a.attnum>0\n' +
      '/*Leia baastabelite oid veerud*/\n' +
      'UNION SELECT n.nspname AS table_schema, c.relname AS table_name, a.attname AS column_name, a.attnum AS ordinal_position, t.typname AS data_type\n' +
      'FROM pg_catalog.pg_class AS c INNER JOIN pg_catalog.pg_namespace AS n ON c.relnamespace=n.oid\n' +
      'INNER JOIN pg_catalog.pg_attribute AS a ON c.oid=a.attrelid\n' +
      'INNER JOIN pg_catalog.pg_type AS t ON a.atttypid=t.oid\n' +
      'WHERE c.relkind=\'r\' AND a.attnum=-2\n' +
      'ORDER BY table_schema, table_name, ordinal_position;',
    constraints: 'with keys as (select \n' +
      'o.conname,\n' +
      '(select nspname from pg_namespace where oid=m.relnamespace) as key_schema,\n' +
      'm.relname as key_table, \n' +
      'm.oid as key_table_oid,\n' +
      'o.conkey AS key_col,\n' +
      'case when o.contype=\'p\' then \'PRIMARY KEY\' ELSE \'UNIQUE\' END as contype\n' +
      'from pg_constraint o inner join pg_class c on c.oid = o.conrelid\n' +
      'inner join pg_class m on m.oid = o.conrelid\n' +
      'where o.contype in (\'p\',\'u\')  and o.conrelid in (select oid from pg_class c where c.relkind = \'r\')),\n' +
      'keys_unnest as (select conname, key_schema, key_table, key_table_oid, key_col, key_col_num, ordin, contype\n' +
      'from keys, unnest(keys.key_col) with ordinality as k(key_col_num, ordin)),\n' +
      'keys_with_names as (select conname, key_schema, key_table, contype, array_agg(a_key.attname order by ordin) as key_col\n' +
      'from keys_unnest k inner join pg_attribute a_key on k.key_col_num = a_key.attnum and k.key_table_oid = a_key.attrelid and a_key.attisdropped = false\n' +
      'group by conname, key_schema, key_table, contype),\n' +
      'fk as (select \n' +
      'o.conname,\n' +
      '(select nspname from pg_namespace where oid=f.relnamespace) as foreign_schema,\n' +
      'f.relname as foreign_table,\n' +
      'f.oid as foreign_table_oid,\n' +
      'o.confkey AS foreign_col,\n' +
      '(select nspname from pg_namespace where oid=m.relnamespace) as target_schema,\n' +
      'm.relname as target_table, \n' +
      'm.oid as target_table_oid,\n' +
      'o.conkey AS target_col\n' +
      'from pg_constraint o inner join pg_class c on c.oid = o.conrelid\n' +
      'inner join pg_class f on f.oid = o.confrelid \n' +
      'inner join pg_class m on m.oid = o.conrelid\n' +
      'where o.contype = \'f\' and o.conrelid in (select oid from pg_class c where c.relkind = \'r\')),\n' +
      'fk_unnest as (select conname, foreign_schema, foreign_table,  foreign_table_oid, foreign_col, foreign_col_num, target_schema, target_table, target_table_oid, target_col, target_col_num, ordin\n' +
      'from fk, unnest(fk.foreign_col, fk. target_col) with ordinality as f(foreign_col_num, target_col_num, ordin)),\n' +
      'fk_with_names as (select conname, foreign_schema, foreign_table, array_agg(a_foreign.attname order by ordin) as foreign_col, target_schema, target_table, array_agg(a_target.attname order by ordin) as target_col\n' +
      'from fk_unnest fk inner join pg_attribute a_foreign on fk.foreign_col_num = a_foreign.attnum and fk.foreign_table_oid = a_foreign.attrelid and a_foreign.attisdropped = false\n' +
      'inner join pg_attribute a_target on fk.target_col_num = a_target.attnum and fk.target_table_oid = a_target.attrelid and a_target.attisdropped = false\n' +
      'group by conname, foreign_schema, foreign_table, target_schema, target_table)\n' +
      'select conname AS constraint_name, \'FOREIGN KEY\' as constraint_type,  target_schema as table_schema, target_table as table_name, target_col as column_name, foreign_schema as foreign_table_schema, foreign_table as foreign_table_name, foreign_col as foreign_column_name\n' +
      'from fk_with_names\n' +
      'union \n' +
      'select conname, contype, key_schema, key_table,  key_col, NULL, NULL, NULL\n' +
      'from keys_with_names\n' +
      'order by table_schema, table_name, constraint_type, column_name;\n'
  }
};

export default queries;
