import React, { useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  Button,
  Card,
  CardBody,
  Container,
  CustomInput,
  Form,
  FormGroup,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeSet, updateSet } from '../actions/queryActions';
import { translations } from '../utils/translations';
import { getCorrectQueryName } from '../utils/getCorrectQueryName';

export const Set = (props) => {
  useEffect(() => {
    if (props.set.subqueryId) {
      let set = _.cloneDeep(props.set);

      const subquery = props.queries.find(query => query.id === props.set.subqueryId);
      const subquerySql = subquery ? subquery.sql : '';

      set = {
        ...set,
        subquerySql,
      };

      props.updateSet(set);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.set.subqueryId]);

  const selectedQuery = props.queries.find(query => query.id === props.set.subqueryId);
  const selectedQueryId = selectedQuery ? selectedQuery.id : 0;

  const handleTypeChange = (e) => {
    e.preventDefault();

    let set = _.cloneDeep(props.set);

    set = {
      ...set,
      type: e.target.value,
    };

    props.updateSet(set);
  };

  const handleQueryChange = (e) => {
    e.preventDefault();

    let set = _.cloneDeep(props.set);

    const subqueryId = +e.target.value;
    const subquerySql = subqueryId ? props.queries.find(query => query.id === subqueryId).sql : '';

    set = {
      ...set,
      subqueryId,
      subquerySql,
    };

    props.updateSet(set);
  };

  const handleRemove = () => {
    props.removeSet(props.set);
  };

  return (
    <div className="my-2">
      <Draggable
        draggableId={props.id}
        index={props.index}
      >
        {provided => (
          <Card
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
          >
            <CardBody className="py-2 px-0">
              <Form>
                <Container fluid>
                  <Row>
                    <div className="col-auto d-flex">
                      <FontAwesomeIcon className="align-self-center" icon="sort" />
                    </div>
                    <div className="col-10 px-0">
                      <Row form className="align-items-center">
                        <div className="col-auto pb-1">
                          <span style={{
                            color: props.set.color,
                            fontWeight: 'bold',
                            fontSize: 'large',
                          }}
                          >
                            {'{}'}
                          </span>
                        </div>
                        <div className="col-auto">
                          {props.index === 0
                            ? getCorrectQueryName(props.language, props.queryName, props.queryId)
                            : translations[props.language.code].queryBuilder.setResult}
                        </div>
                        <div className="col-auto">
                          <FormGroup className="m-0">
                            <CustomInput
                              bsSize="sm"
                              type="select"
                              id={`${props.id}-set-type`}
                              onChange={handleTypeChange}
                              value={props.set.type}
                              key={`set-type-${props.id}-query-${props.queryId}`}
                            >
                              <option value="union">UNION</option>
                              <option value="unionall">UNION ALL</option>
                              <option value="intersect">INTERSECT</option>
                              <option value="except">EXCEPT</option>
                            </CustomInput>
                            <UncontrolledTooltip
                              placement="top"
                              delay={{ show: 500, hide: 0 }}
                              target={`${props.id}-set-type`}
                            >
                              {translations[props.language.code].tooltips.setType}
                            </UncontrolledTooltip>
                          </FormGroup>
                        </div>
                        <div className="col-5">
                          <FormGroup className="m-0">
                            <CustomInput
                              bsSize="sm"
                              type="select"
                              name="select_query"
                              id={`set-query-${props.id}`}
                              key={`set-${props.id}-query-${props.queryId}`}
                              value={selectedQueryId}
                              onChange={handleQueryChange}
                            >
                              <option value="">
                                {translations[props.language.code]
                                  .queryBuilder.setQuery}
                              </option>
                              {props.queries.map(query => (
                                <option
                                  key={`set-${props.id}-query-${query.id}`}
                                  value={query.id}
                                >
                                  {getCorrectQueryName(props.language, query.queryName, query.id)}
                                </option>
                              ))}
                            </CustomInput>
                          </FormGroup>
                        </div>
                      </Row>
                    </div>
                    <div className="col-1 d-flex ml-auto pr-2 justify-content-end">
                      <FormGroup className="align-self-center m-0">
                        <Button
                          size="sm"
                          color="danger"
                          onClick={handleRemove}
                          id={`${props.id}-remove-set`}
                        >
                          <FontAwesomeIcon icon="times" />
                        </Button>
                      </FormGroup>
                    </div>
                  </Row>
                </Container>
              </Form>
            </CardBody>
          </Card>
        )}
      </Draggable>
    </div>
  );
};

Set.propTypes = {
  id: PropTypes.string,
  language: PropTypes.shape({ code: PropTypes.string }),
  set: PropTypes.shape({
    id: PropTypes.number,
    color: PropTypes.string,
    type: PropTypes.string,
    subqueryId: PropTypes.number,
  }),
  updateSet: PropTypes.func,
  removeSet: PropTypes.func,
  index: PropTypes.number,
  queries: PropTypes.arrayOf(PropTypes.shape({})),
  queryName: PropTypes.string,
  queryId: PropTypes.number,
};

const mapStateToProps = store => ({
  language: store.settings.language,
  queries: store.queries.filter(query => query.id !== 0)
    .sort((query1, query2) => query1.id - query2.id),
});

const mapDispatchToProps = {
  updateSet,
  removeSet,
};

export default connect(mapStateToProps, mapDispatchToProps)(Set);
