// import firebase from './firebase.js';
import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Search from './Search'

function App() {
  // books is an array
  const [book, setBook] = useState([])
  // results is an empty array
  const [result, setResult] = useState('derrida')
  const [searchType, setSearchType] = useState('author')

  //   handles submit on searchbar
  const handleSubmit = (event) => {
    const selectedRadio = document.querySelector('input[type ="radio"]:checked')
      .id
    const selectedText = document.getElementById('bookSearch').value
    event.preventDefault()

    setResult(selectedText)
    setSearchType(selectedRadio)

    console.log('Type: ' + searchType + ' Text: ' + result)
    // searchBook.changeBook("selectedRadio");
  }

  return (
    <>
      <header>
        <h1>Page Turner App</h1>
      </header>
      <section className='form-field'>
        <form action='' onSubmit={handleSubmit}>
          <label htmlFor='bookSearch'></label>
          <input type='text' id='bookSearch' placeholder='Search Here...' />
          <fieldset>
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
          </fieldset>
          <button>Find Me A Book! </button>
        </form>
      </section>

      <Search type={searchType} text={result} />
    </>
  )
}

export default App
