import React, { Component } from 'react';
import {graphql} from 'react-apollo'
import {getBooksQuery}from '../query'
import BookDetail from './BookDetails';


class BookList extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedBookId:""
    }
  }
  displayBooks(){
    if (this.props.data.loading){
      return (<div>Loading ...</div>)
    }else{
      return this.props.data.books.map(book =>{
        return (
          <li key={book.id} onClick={(e) => this.setState({selectedBookId: book.id})}>{book.title}</li>
        )
      })
    }
  }
  render() {
    return (
        <div id="book-list">
            {this.displayBooks()}
            <BookDetail bookId={this.state.selectedBookId} />
        </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
