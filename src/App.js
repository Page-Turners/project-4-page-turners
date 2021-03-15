// import firebase from './firebase.js';
import { useState } from 'react';
import './App.css'
import Search from './Search';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { fasBookMark } from '@fortawesome/free-solid-svg-icons';

function App() {
  // books is an array
  // const [book, setBook] = useState([])
  // results is an empty array
  const [result, setResult] = useState('derrida');
  const [searchType, setSearchType] = useState('author');
  //Error Handling
  const [error, setError] = useState(false);
  //Loading state
  const [loading, setLoading] = useState(false);
  //   handles submit on searchbar
  const handleSubmit = (event) => {
    const selectedRadio = document.querySelector('input[type ="radio"]:checked')
      .id
    const selectedText = document.getElementById('bookSearch').value
    event.preventDefault()
    setResult(selectedText)
    setSearchType(selectedRadio)
  }

  return (
    <>
      <header>
        <h1>Page Turner App</h1>
        {/* <button className="iconBtn">
          <FontAwesomeIcon icon={fasBookMark} /></button> */}
      </header>
      <section className='form-field'>
        {error ? <div> Enter a Valid value </div> :
          <form action='' onSubmit={handleSubmit}>
            <label htmlFor='bookSearch'></label>
            <input type='search' id='bookSearch' placeholder='Search Here...' required />
            <fieldset>
              <label htmlFor='author'>Author</label>
              <input
                type='radio'
                id='author'
                value='author'
                name='searchType'
              />

              <label htmlFor='title'>Title</label>
              <input
                type='radio'
                id='title'
                value='title'
                name='searchType'
              />
            </fieldset>
            <button>Find Me A Book! </button>
          </form>
        }
        {loading && <div>fetching books for "<strong>{searchType}</strong>"</div>}
      </section>

      <Search
        type={searchType}
        text={result}
        error={error}
        setError={setError}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  )
}

export default App
