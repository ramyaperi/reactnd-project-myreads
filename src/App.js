import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {
  Route
} from 'react-router-dom'
import ShowBooks from './ShowBooks'
import SearchBook from './SearchBook'
import * as BooksAPI from './BooksAPI'



class BooksApp extends React.Component {

  state = {
    books: []
  };

  componentDidMount() {

    const cachedHits = localStorage.getItem("BooksAPI")
    if (cachedHits) {
      const books = JSON.parse(cachedHits)
      if (books.length > 0) {
        this.setState({
          books
        })
        return
      }
    }

    BooksAPI.getAll().then((books) => {
      this.setState({
        books
      })
    })


  }

  changeshelf = (event, book) => {
    const value = event.target.value
    const books = this.state.books
    const bookId = book.id

    const index = books.findIndex(tempbook => tempbook.id === bookId)

    if (index > -1) {
      books[index].shelf = value
    } else {
      book.shelf = value
      books.push(book)
    }
    this.setState({
      books
    })
    localStorage.setItem("BooksAPI", JSON.stringify(books));
  }

  render() {
    return ( <
      div className = "app" >
      <
      Route exact path = '/'
      render = {
        () => ( <
          ShowBooks books = {
            this.state.books
          }
          changeshelf = {
            this.changeshelf
          }
          />
        )
      }
      /> <
      Route path = '/search'
      render = {
        () => ( <
          SearchBook books = {
            this.state.books
          }
          changeshelf = {
            this.changeshelf
          }
          />
        )
      }
      /> <
      /div>
    )
  }
}

export default BooksApp
