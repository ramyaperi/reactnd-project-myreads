import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import serializeForm from 'form-serialize'
import Book from './Book'
import { Debounce } from 'react-throttle';

class SearchBook extends Component {

  state = {
    books: []
  }

  componentDidUpdate() {
    if (this.state.books!=="") {
      const searchbooks=this.state.books
      this.props.books.map(function(book) {
        const index=searchbooks.findIndex(sbook => sbook.id === book.id)
        if (index > -1) {
          searchbooks[index].shelf=book.shelf
        }
      })
      this.setState({
        searchbooks
      })
    }
  }

  search=(e) => {
    const value=e.target.value
    BooksAPI.search(value).then((books) => {
      if(books){
      this.setState({books})
      }
    }).catch((error) => {
      console.log(error)
    })

  }



  render() {
      return (

          <div className="search-books" >
          <div className="search-books-bar" >
          <Link to="/" className="close-search" > Close < /Link>
            <div className="search-books-input-wrapper" >
         <Debounce time="100" handler="onChange">
            <input onChange={this.search} type="text" name="serachstring" placeholder="Search by title or author" / >
          </Debounce>
          </div>
          </div>
          <div className="search-books-results" >
          <ol className="books-grid" > {this.state.books.map((book) => (
              <li key={book.id} >
                <Book book={book}
                changeshelf={this.props.changeshelf}/>
              </li>))}
               </ol>
               </div>
               </div>
              )
            }
          }
          export default SearchBook
