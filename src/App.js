// import firebase from './firebase.js';
import { useState, useEffect } from 'react';
import './App.css'
import firebase from './firebase.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Search from './Search';
import Header from './Header';
import ReadingList from './ReadingList';

function App() {

  const [result, setResult] = useState('derrida');
  const [searchType, setSearchType] = useState('author');
  //firebase data
  const [booksArray, setBooksArray] = useState([]);
  const [userInput, setUserInput] = useState('')
  const [radioInput, setRadioInput] = useState('');

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
    setRadioInput(selectedRadio)
  }


  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (data) => {
      // save the database object within a variable
      const bookData = data.val();
      //create a variable equal to an empty array
      const bookHold = [];
      //use a for In loop to traverse this object ad push the book titles (AKA the property VALUES within the object) into the created array
      for (let bookKey in bookData) {
        //console.log(bookKey);
        //console.log(bookData);
        bookHold.push({
          uniqueKey: bookKey,
          bookObj: bookData[bookKey],
          hasRead: false

        });
        setBooksArray(bookHold)
        console.log(bookHold);
      }
    });
  }, []);

  return (
    <Router>
      <Route path="/header" component={Header} />
      <Header />
      <section className='form-field'>
        <form action='' onSubmit={handleSubmit}>
          <label htmlFor='bookSearch'></label>
          <input
            type='search'
            className="search-bar"
            id='bookSearch'
            placeholder='Search Here...'
            value={userInput}
            onChange={handleUserInput}
            required />
          <fieldset>
            <label className="radio-label" htmlFor='author'>Author</label>
            <input
              type='radio'
              id='author'
              value='author'
              name='searchType'
              onChange={handleRadioInput}
              checked={radioInput === 'author'}
            />

            <label className="radio-label" htmlFor='title'>Title</label>
            <input
              type='radio'
              id='title'
              value='title'
              name='searchType'
              onChange={handleRadioInput}
              checked={radioInput === 'title'}
            />
          </fieldset>
          <button className="search-button">Find Me A Book! </button>
        </form>
      </section>
      <main>
        <Search
          type={searchType}
          text={result}
          searchBook={booksArray}
          userInput={userInput}
        />

      </main>
      {/* <Route path="/readinglist" exact component={ReadingList(booksArray)} />  */}
      <Route path="/readinglist" exact render={() => <ReadingList booksArray={booksArray} />} />
    </Router>
  )
}

export default App
