// import firebase from './firebase.js';
import { useState } from 'react';
import './App.css'
import Search from './Search';
import Header from './Header';

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
      <Header />
      <section className='form-field'>
        {error ? <div> Enter a Valid value </div> :
          <form action='' onSubmit={handleSubmit}>
            <label htmlFor='bookSearch'></label>
            <input 
            type='search' 
            className="search-bar"
            id='bookSearch' placeholder='Search Here...' required />
            <fieldset>
              <label className="radio-label" htmlFor='author'>Author</label>
              <input
                type='radio'
                id='author'
                value='author'
                name='searchType'
              />

              <label className="radio-label" htmlFor='title'>Title</label>
              <input
                type='radio'
                id='title'
                value='title'
                name='searchType'
              />
            </fieldset>
            <button className="search-button">Find Me A Book! </button>
          </form>
        }
        {loading && <div>fetching books for "<strong>{searchType}</strong>"</div>}
      </section>

      <main>
      <Search
        type={searchType}
        text={result}
        error={error}
        setError={setError}
        loading={loading}
        setLoading={setLoading}
      />

      </main>
      
    </>
  )
}

export default App
