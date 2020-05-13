import React from 'react';
import { connect } from 'react-redux';
import '../codemirror-custom/codemirrorcustom.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/edit/matchbrackets';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import * as PropTypes from 'prop-types';
import { updateSql } from '../actions/queryActions';

export const ResultSQL = ({ sql, updateSqlProp }) => (
  <div className="col-sm-12 p-0" style={{ height: '30vh' }}>
    <div className="ml-n1 border" style={{ resize: 'vertical', overflow: 'auto' }}>
      <CodeMirror
        className="CodeMirror"
        value={sql}
        onChange={(editor, data, value) => {
          if (data.origin) {
            updateSqlProp(value);
          }
        }}
        autoCursor={false}
        options={{
          mode: 'text/x-pgsql',
          lineNumbers: true,
          matchBrackets: true,
          readOnly: false,
        }}
      />
    </div>
  </div>
);

ResultSQL.propTypes = {
  sql: PropTypes.string,
  updateSqlProp: PropTypes.func,
};

const mapStateToProps = store => ({
  sql: store.query.sql,
});

const mapDispatchToProps = {
  updateSqlProp: sql => updateSql(sql),
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultSQL);
