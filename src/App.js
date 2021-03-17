// import firebase from './firebase.js';
import { useState, useEffect } from 'react'
import './App.css'
import firebase from './firebase.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Search from './Search'
import Header from './Header'
import ReadingList from './ReadingList'

function App() {
  // books is an array
  // const [book, setBook] = useState([])
  // results is an empty array
  const [result, setResult] = useState('')
  const [searchType, setSearchType] = useState('')
  //Error Handling
  const [error, setError] = useState(false)
  //Loading state
  const [loading, setLoading] = useState(false)
  //firebase data
  const [booksArray, setBooksArray] = useState([])

  const [userInput, setUserInput] = useState('')
  const [radioInput, setRadioInput] = useState('')

  //   handles submit on searchbar
  const handleSubmit = (event) => {
    event.preventDefault()
    setResult(userInput)
    setSearchType(radioInput)
    console.log('userInput', userInput);
    console.log('radioInput', radioInput);
  }

  const handleUserInput = (event) => {
    const selectedText = event.target.value
    setUserInput(selectedText)
  }

  const handleRadioInput = (event) => {
    const selectedRadio = event.target.value
    console.log('radioinput!')
    setRadioInput(selectedRadio)
  }

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
      {/* <Route exact path="/header" exact component={Header} /> */}
      <Header />
      <section className='form-field'>
        {error ? (
          <div> Enter a Valid value </div>
        ) : (
          <form action='' onSubmit={handleSubmit}>
            <label htmlFor='bookSearch'></label>
            <input
              type='search'
              className='search-bar'
              id='bookSearch'
              placeholder='Search Here...'
              value={userInput}
              onChange={handleUserInput}
              required
            />
            <fieldset>
              <label className='radio-label' htmlFor='author'>
                Author
              </label>
              <input
                type='radio'
                id='author'
                value='author'
                name='searchType'
                onChange={handleRadioInput}
                checked={radioInput === 'author'}
              />

              <label className='radio-label' htmlFor='title'>
                Title
              </label>
              <input
                type='radio'
                id='title'
                value='title'
                name='searchType'
                onChange={handleRadioInput}
                checked={radioInput === 'title'}
              />
            </fieldset>
            <button className='search-button'>Find Me A Book! </button>
          </form>
        )}
        {/* {loading && (
          <div>
            fetching books for "<strong>{searchType}</strong>"
          </div>
        )} */}
      </section>
      <main>
        {searchType && result ? (
          <Search
            type={searchType}
            text={result}
            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            searchBook={booksArray}
          />
        ) : null}
      </main>
      {/* <Route path="/readinglist" exact component={ReadingList(booksArray)} />  */}
      <Route
        path='/readinglist'
        render={(props) => <ReadingList {...props} booksArray={booksArray} />}
      />

      {/* <Route
        path='/dashboard'
        render={(props) => (
          <Dashboard {...props} isAuthed={true} />
        )}
      /> */}
    </Router>
  )
}

export default App
