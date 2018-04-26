import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import BookList from './component/BookList';
import AddBook from './component/AddBook';


const client =  new ApolloClient({
  uri:'http://localhost:8080/graphql',

})
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
        <div className="mui--text-headline" id="headline">My Book List</div>
        <BookList />
        <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
