import React from 'react';
import './Modal.css';
import Modal from 'react-modal';

class ExampleApp extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    console.log('The component mounted');
    // const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
    // if (!hasVisitedBefore) {
    //   this.setState({ hasVisitedBefore: false });
    //   localStorage.setItem("hasVisitedBefore", true);
    // //   this.setState({ showModal: true });
    // }

  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleOpenModal}>Need Help?</button>
        <Modal
          id="modal"
          ariaHideApp={false}
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
        >
          {/* <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2> */}
          <div>
            {' '}
            <h5>
              Welcome to GreenATX{' '}
              <span role="img" aria-label="light">
                ✨
              </span>
            </h5>
            <strong>Drop a pin</strong> to share your favorite park,
            water, or nature spot <br />
            <strong>Filter pins</strong> by category
            <strong />
          </div>

          <button className="gotit" onClick={this.handleCloseModal}>Got it!</button>
        </Modal>
      </div>
    );
  }
}

export default ExampleApp;

// const props = {};

// ReactDOM.render(<ExampleApp {...props} />, document.getElementById('main'));
