import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { connectToDatabase } from '../actions/databaseActions';
import { translations } from '../utils/translations';

const LoginForm = props => (
  <Container>
    <h3>{translations[props.language.code].loginForm.formHeader}</h3>
    <Form onSubmit={props.handleSubmit}>
      <FormGroup>
        <Label htmlFor="hostAddress">{translations[props.language.code].loginForm.serverL}</Label>
        <Input
          required
          type="text"
          className="form-control"
          id="hostAddress"
          name="host"
          placeholder={translations[props.language.code].loginForm.serverPh}
          value={props.host}
          onChange={props.handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="serverPort">{translations[props.language.code].loginForm.portL}</Label>
        <Input
          required
          type="number"
          className="form-control"
          id="serverPort"
          name="port"
          placeholder={translations[props.language.code].loginForm.portPh}
          value={props.port}
          onChange={props.handleChange}
          max="65535"
        />
      </FormGroup>
      <FormGroup>
        <Label
          htmlFor="databaseName"
        >
          {translations[props.language.code].loginForm.databaseL}
        </Label>
        <Input
          required
          type="text"
          className="form-control"
          id="databaseName"
          name="database"
          placeholder={translations[props.language.code].loginForm.databasePh}
          value={props.database}
          onChange={props.handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="userName">{translations[props.language.code].loginForm.usernameL}</Label>
        <Input
          required
          type="text"
          className="form-control"
          id="userName"
          name="user"
          placeholder={translations[props.language.code].loginForm.usernamePh}
          value={props.user}
          onChange={props.handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">{translations[props.language.code].loginForm.passwordL}</Label>
        <Input
          required
          type="password"
          autoComplete="on"
          className="form-control"
          id="password"
          name="password"
          placeholder={translations[props.language.code].loginForm.passwordPh}
          value={props.password}
          onChange={props.handleChange}
        />
      </FormGroup>
      <Button color="primary" type="submit" className="btn-block" disabled={props.connecting}>
        {props.connecting
          ? (
            <div className="d-flex align-items-center justify-content-center">
              <div className="mr-2">{translations[props.language.code].loginForm.connecting}</div>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            </div>
          )
          : translations[props.language.code].loginForm.formSubmit}
      </Button>
    </Form>
  </Container>
);

LoginForm.propTypes = {
  language: PropTypes.shape({ code: PropTypes.string }),
  handleSubmit: PropTypes.func,
  host: PropTypes.string,
  handleChange: PropTypes.func,
  database: PropTypes.string,
  port: PropTypes.string,
  user: PropTypes.string,
  password: PropTypes.string,
  connecting: PropTypes.bool,
};

export class LoginFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      host: '',
      port: '5432',
      database: '',
      user: '',
      password: '',
      toQuery: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.connectToDatabase(this.state);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (this.props.connected === true) {
      return <Redirect to="/query" />;
    }

    return (
      <div>
        {this.props.error
          ? (
            <Alert color="danger">
              {this.props.error}
            </Alert>
          ) : null}
        <LoginForm
          {...this.state}
          language={this.props.language}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          connecting={this.props.connecting}
        />
      </div>
    );
  }
}

LoginFormContainer.propTypes = {
  connectToDatabase: PropTypes.func,
  connected: PropTypes.bool,
  error: PropTypes.string,
  connecting: PropTypes.bool,
  language: PropTypes.shape({ code: PropTypes.string }),
};

const mapStateToProps = store => ({
  connected: store.host.connected,
  error: store.host.error,
  language: store.settings.language,
  connecting: store.host.connecting,
});

const mapDispatchToProps = {
  connectToDatabase,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);
