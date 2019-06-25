import React from 'react';
import './Search.css';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Search() {
  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset:2 }}>
          <Form id="search">
            {/* <Form.Label>Search</Form.Label> */}
            <Form.Control
              size="lg"
              type="text"
              placeholder="Search"
            />
            <Form.Text className="text-muted">
              Write something here.
            </Form.Text>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Search;
