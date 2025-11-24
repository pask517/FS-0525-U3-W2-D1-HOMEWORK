import { Component } from "react"
import SingleBook from "./SingleBook"
import { Col, Form, Row } from "react-bootstrap"
import CommentArea from "./CommentArea"

class BookList extends Component {
  state = {
    searchQuery: "",
    selected: false,
    asin: "",
  }

  changeState = (newSelected) => {
    this.setState({
      selected: newSelected,
    })
  }
  changeAsin = (newAsin) => {
    this.setState({
      asin: newAsin,
    })
  }

  render() {
    return (
      <>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={4} className="text-center">
            <Form.Group>
              <Form.Control
                type="search"
                placeholder="Cerca un libro"
                value={this.state.searchQuery}
                onChange={(e) => this.setState({ searchQuery: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="g-2 mt-3">
          <Col className="col-9">
            {this.props.books
              .filter((b) =>
                b.title.toLowerCase().includes(this.state.searchQuery)
              )
              .map((b) => (
                <Col xs={12} md={6} key={b.asin}>
                  <SingleBook
                    book={b}
                    changeState={this.changeState}
                    selected={this.state.selected}
                    asin={b.asin}
                    changeAsin={this.changeAsin}
                  />
                </Col>
              ))}
          </Col>
          <Col className="col-3 text-start">
            <h1>Comment Area</h1>
            <CommentArea />
          </Col>
        </Row>
      </>
    )
  }
}

export default BookList
