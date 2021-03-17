// import firebase from './firebase.js';
import { useState, useEffect } from 'react'
import './App.css'
import firebase from './firebase.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Header from './Header'
import FormField from './FormField'
import Search from './Search'
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
          hasRead: false,
        })
        setBooksArray(bookHold)
        console.log(bookHold);
      }
    })
  }, [])

  return (
    <Router>
      <Header />
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