import { useState, useEffect } from 'react'
import './App.css'
import firebase from './firebase.js'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import FormField from './FormField'
import ReadingList from './ReadingList'

function App() {
  const [booksArray, setBooksArray] = useState([])



  useEffect(() => {
    const dbRef = firebase.database().ref()
    dbRef.on('value', (data) => {
      // save the database object within a variable
      const bookData = data.val()
      //create a variable equal to an empty array
      const bookHold = []
      //use a for In loop to traverse this object ad push the book titles (AKA the property VALUES within the object) into the created array
      for (let bookKey in bookData) {
        bookHold.push({
          uniqueKey: bookKey,
          bookObj: bookData[bookKey],
        })
        setBooksArray(bookHold)
        console.log(bookHold);
      }
    })
  }, [])

  return (
    <Router>
      <header>
      <Link to={"/"}>
        <h1>Page Turner</h1>
      </Link>
      </header>

      <Link to={"/readinglist"} >
      <button className="icon-button" >
        <FontAwesomeIcon icon={faBookmark} className="bookMark" />
      </button>
    </Link>


      <Route path='/' exact >
        <FormField />
        

      </Route>


      <Route
        path='/readinglist'
        render={() => <ReadingList readingListArray={booksArray} />}
      />
      <footer>
        <p>Copyright 
         <a href="https://www.junocollege.com"> Juno College</a>
        </p>
      </footer>
    </Router>
  )
}

export default App