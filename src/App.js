// import firebase from './firebase.js';
import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Search from './Search'

function App() {
  // books is an array
  const [book, setBook] = useState([])
  // results is an empty array
  const [result, setResult] = useState("derrida")
  const [searchType, setSearchType] = useState("author")

  //   handles submit on searchbar
  const handleSubmit = (event) => {
    const selectedRadio = document.querySelector('input[type ="radio"]:checked').id
    const selectedText = document.getElementById('bookSearch').value;
    event.preventDefault()

    setResult(selectedText)
    setSearchType(selectedRadio);

    console.log("Type: " + searchType + " Text: " + result)
    // searchBook.changeBook("selectedRadio");
  }

  return (
    <>
      <h1>Page Turner App</h1>

      <form action='' onSubmit={handleSubmit}>
        <label htmlFor='bookSearch'>What would you like to read?</label>
        <input type='text' id='bookSearch' />

        <label htmlFor='author'>Author</label>
        <input
          type='radio'
          id='author'
          value='author'
          name='searchType'
        // onChange={handleRadioOption}
        />

        <label htmlFor='title'>Title</label>
        <input
          type='radio'
          id='title'
          value='title'
          name='searchType'
        // onChange={handleRadioOption}
        />

        <button>Find Me A Book! </button>
      </form>
      <Search
        type={searchType}
        text={result}
      />
    </>
  )
}

export default App
