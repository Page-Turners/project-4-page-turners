// import firebase from './firebase.js';
import { useState, useEffect } from 'react'
import './App.css'
import firebase from './firebase.js'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
// import Header from './Header'
import FormField from './FormField'
import ReadingList from './ReadingList'

function App() {
  // books is an array
  // const [book, setBook] = useState([])
  // results is an empty array
  // const [result, setResult] = useState('')
  // const [searchType, setSearchType] = useState('')

  //firebase data
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
        //console.log(bookKey);
        //console.log(bookData);
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
      <button className="icon-button">
        <FontAwesomeIcon icon={faBookmark} className="bookMark" />
      </button>
    </Link>

      {/* <Link to={"/readinglist"}>
        <FontAwesomeIcon icon={faBookmark} className="bookMark" />
        </Link> */}

      <Route path='/' exact >
        <FormField />
        {/* component ={FormField} */}

      </Route>


      <Route
        path='/readinglist'
        render={() => <ReadingList readingListArray={booksArray} />}
      />
    </Router>
  )
}

export default App