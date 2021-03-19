import axios from 'axios'
import { useEffect, useState } from 'react' //import firebase into our component
import firebase from './firebase.js'


function Search(props) {
  const [searchResult, setSearchResult] = useState([])
  const [searchBooksArray, setSearchBooksArray] = useState([])



  const getSearchedBook = (type, text) => {
  
    let query = ''

    if (type === 'author') {
      query = `inauthor:${text}`
    } else if (type === 'title') {
      query = `intitle:${text}`
    }

    
    try {
      axios({
        url: `https://www.googleapis.com/books/v1/volumes?`,
        method: 'GET',
        dataResponse: 'json',
        params: {
          key: 'AIzaSyD6hfO1VwuXSmtlAk1VAkDP9az-txUHM70',
          q: query,
        },
      }).then((res) => {
        setSearchResult(res.data.items)
      })
    } catch (error) {
      alert('Page Not Found')
    }
  }

  useEffect(() => {
    const dbRef = firebase.database().ref()
    getSearchedBook(props.type, props.text)
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
      }
      setSearchBooksArray(bookHold)
    })
   
  }, [props.text, props.type])

  // Adding things to FireBase

  const handleClick = (e) => {
    let totalBook = {}
    totalBook = e
    totalBook.hasRead = false

    const dbRef = firebase.database().ref()
    dbRef.push(totalBook)
  }

  // Checking for duplicate books

  const checkDuplicate = function (bookToBeAdded) {
    let hasDuplicate = false
    searchBooksArray.forEach((book) => {
      if (book.bookObj.id === bookToBeAdded.id) {
        hasDuplicate = true
      }
    })
    if (!hasDuplicate) {
      handleClick(bookToBeAdded)
    }
  }

  
 
  return (
    <section className='search-container wrapper'>
   
      {searchResult.map((bookResult) => {
       
        return (
          <div className='book' key={bookResult.id}>
            <div className='image-container'>
              {bookResult.volumeInfo.imageLinks ? (
                <img
                  src={bookResult.volumeInfo.imageLinks.thumbnail}
                  alt={bookResult.volumeInfo.title}
                />
              ) : (
                <h3>No image available</h3>
              )}
            </div>

            {/* book details */}
            {bookResult.volumeInfo.title ? (
              <h2>{bookResult.volumeInfo.title}</h2>
            ) : (
              <h3>No title available</h3>
            )}

            {bookResult.volumeInfo.subtitle ? (
              <h3>{bookResult.volumeInfo.subtitle}</h3>
            ) : (
              <p></p>
            )}

            {bookResult.volumeInfo.authors ? (
              <p>{(bookResult.volumeInfo.authors).join(', ')}</p>
            ) : (
              <p></p>
            )}

            {bookResult.volumeInfo.categories ? (
              <p>{bookResult.volumeInfo.categories}</p>
            ) : (
              <p></p>
            )}

            {bookResult.volumeInfo.averageRating ? (
              <p>rating:{bookResult.volumeInfo.averageRating}/5</p>
            ) : (
              <p></p>
            )}


            <button className="search-results-button" onClick={() => checkDuplicate(bookResult)}>
              Add to List!
            </button>
           
          </div>
        )
      })}
    </section>
  )
}

export default Search
