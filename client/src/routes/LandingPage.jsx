import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import LoginFormContainer from '../components/LoginFormContainer';
import LanguageSwitcher from '../components/LanguageSwitcher';
import InformationPopover from '../components/InformationPopover';

const LandingPage = () => (
  <Container className="vh-100 pt-4">
    <Row>
      <Col>
        <LanguageSwitcher />
      </Col>
      <InformationPopover />
    </Row>
    <Row className="justify-content-center pt-4">
      <Col sm="9" md="7" lg="5" className="">
        <LoginFormContainer />
      </Col>
    </Row>
  </Container>
);

export default LandingPage;
