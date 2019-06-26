import React from "react";
import "./Search.css";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class Search extends React.Component {
  constructor (props) {
    super(props);

    console.log(this.props.locations);
    // this is what we passed into the component!!!!!
    var data = this.props.locations;
    // hopefully this data looks like this:
    // [ {id: 1, latitude: 30483.33333, longitude: 34833.34444, tag: "my fucking tag"}, {....}, {.....} ] and so on

    // so when we made the get request in App - we stored it as state in the App component
    // And passed it to this Search component by using something called props
    // <Search locations={this.state.locations} />
    // that attribute locations is the props so it makes that data accessible in here
    // it can be called anything ----
    // we could have made it
    // <Search fuckingdata={this.state.locations} />
    // And to access it in this component we could do
    // this.props.fuckingdata

    // so data will most likely be formatted like on line 15 - how do we go over each one of those records???
    var array_of_tags = data.map(locations => locations.tag);

    this.items = array_of_tags;
    this.state = {
      suggestions: [],
      text: "",
    };
  }

  onTextChanged = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = this.items.sort().filter(v => regex.test(v));
    }
    this.setState(() => ({ suggestions, text:value }));
  }
  
  suggestionSelected (value) {
    this.setState(() => ({
      text: value,
      suggestions: [],
    }));
  }

  renderSuggestions () {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item) }>{item}</li>)}
      </ul>

    );
  }

  render () {
    const { text } = this.state;
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
                value={text}
                onChange={this.onTextChanged}
              />
             
              <Form.Text className="text-muted">
                    Write something here.
              </Form.Text>
              {this.renderSuggestions()}
            </Form>
          </Col>
        </Row>
      </Container>
      // <div>
      //   <input placeholder="Search" value={text} onChange={this.onTextChanged} type="text" />
      //   {this.renderSuggestions()}
      // </div>
    );
  }
}



// function Search() {
//   return (
//     <Container>
//       <Row>
//         <Col md={{ span: 8, offset:2 }}>
//           <Form id="search">
//             {/* <Form.Label>Search</Form.Label> */}
//             <Form.Control
//               size="lg"
//               type="text"
//               placeholder="Search"
//             />
//             <Form.Text className="text-muted">
//               Write something here.
//             </Form.Text>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default Search;
