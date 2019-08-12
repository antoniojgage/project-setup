import React from 'react';
import './Search.css';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Search extends React.Component {
  state = {
    suggestions: [],
    text: '',
  };

  onTextChanged = (event, data) => {
    console.log('data = ' + JSON.stringify(data));

    // data is not an array here then - try doing data.locations
    let items = data.map(location => {
      if (!location.tag) {
        location.tag = '';
      }
      return location.tag;
    });
    const value = event.target.value;
    console.log(items);
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = items.sort().filter(v => regex.test(v));
    }
    this.setState(() => ({ suggestions, text: value }));
  };

  suggestionSelected(value) {
    this.props.onSearchSelection(value);

    this.setState(() => ({
      text: value,
      suggestions: [],
    }));
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map(item => (
          <li onClick={() => this.suggestionSelected(item)}>
            {item}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { text } = this.state;
    return (
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Form id="search">
              {/* <Form.Label>Search</Form.Label> */}
              <Form.Control
                size="lg"
                type="text"
                placeholder="Search"
                value={text}
                onChange={event =>
                  this.onTextChanged(event, this.props.locations)
                }
              />
              {this.renderSuggestions()}
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
