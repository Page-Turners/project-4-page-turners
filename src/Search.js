import axios from 'axios'
import { useEffect, useState } from 'react' //import firebase into our component
import firebase from './firebase.js'
// import { Link } from 'react-router-dom';
//import ReadingList from './ReadingList'

function Search(props) {
  const [searchResult, setSearchResult] = useState([])
  const [searchBooksArray, setSearchBooksArray] = useState([])

  // const {  text, type } = props


  const getSearchedBook = (type, text) => {
    console.log(type, text)
    let query = ''

    if (type === 'author') {
      query = `inauthor:${text}`
    } else if (type === 'title') {
      query = `intitle:${text}`
    }

    console.log('calling the api')
    try {
      axios({
        url: `https://www.googleapis.com/books/v1/volumes?`,
        method: 'GET',
        dataResponse: 'json',
        params: {
          key: 'AIzaSyD6hfO1VwuXSmtlAk1VAkDP9az-txUHM70',
          q: query,
          // maxResults: 40
        },
      }).then((res) => {
        // console.log(res.data.items)
        setSearchResult(res.data.items)
      })
    } catch (error) {
      console.log(error)
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
        //console.log(bookKey);
        //console.log(bookData);
        bookHold.push({
          uniqueKey: bookKey,
          bookObj: bookData[bookKey],
        })
      }
      setSearchBooksArray(bookHold)
    })
    // getSearchedBook(searchObj)
  }, [])

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

  
  // console.log(searchResult)
  // console.log('fdsfjsdf')
  return (
    <section className='search-container wrapper'>
      {/* <div className="wrapper"> */}
      {searchResult.map((bookResult) => {
        // console.log(bookResult);
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
              <h3></h3>
            )}

            {bookResult.volumeInfo.authors.join(', ') ? (
              <p>{bookResult.volumeInfo.authors}</p>
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

            {/* <h4>{bookResult.volumeInfo.subtitle}</h4>
            <p>{bookResult.volumeInfo.authors.join(', ')}</p>
            <p>{bookResult.volumeInfo.categories}</p>
            <p>{bookResult.volumeInfo.averageRating}</p> */}

            <button onClick={() => checkDuplicate(bookResult)}>
              Add to List!
            </button>
           
          </div>
        )
      })}
      {/* <ReadingList booksArray={booksArray} /> */}
      {/* </div> */}
    </section>
  )
}

export default Search
