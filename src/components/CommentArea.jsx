import { Component } from "react"
import CommentList from "./CommentList"
import AddComment from "./AddComment"
import Loading from "./Loading"
import Error from "./Error"

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: true,
    isError: false,
  }

  componentDidMount = async () => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYmFlY2Y0YmQ0NzAwMTU4NWIxZTgiLCJpYXQiOjE3NjM5OTM4NDYsImV4cCI6MTc2NTIwMzQ0Nn0.EvQFCsBByhmuhVXufzCxlK8-PlUAVQwglU_6ZmSHjiE",
          },
        }
      )
      console.log(response)
      if (response.ok) {
        let comments = await response.json()
        this.setState({
          comments: comments,
          isLoading: false,
          isError: false,
        })
      } else {
        this.setState({ isLoading: false, isError: true })
      }
    } catch (error) {
      console.log(error)
      this.setState({ isLoading: false, isError: true })
    }
  }

  render() {
    return (
      <div className="text-center">
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        <AddComment asin={this.props.asin} />
        <CommentList commentsToShow={this.state.comments} />
      </div>
    )
  }
}

export default CommentArea
