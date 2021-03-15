import axios from 'axios'
import { useEffect, useState } from 'react';//import firebase into our component
import firebase from './firebase.js';
import ReadingList from './ReadingList';

function Search(props) {
  const [searchResult, setSearchResult] = useState([]);
  const [booksArray, setBooksArray] = useState([]);

  const { error, setError, loading, setLoading } = props;
  const searchBook = props
  const searchObj = {}

  searchObj.userSearch = searchBook.text
  searchObj.userChoice = searchBook.type

  const getSearchedBook = (searchBook) => {
    if (searchBook.userChoice === 'author') {
      setLoading(true);
      setError(false);
      // console.log('author found');
      try {
        axios({
          url: `https://www.googleapis.com/books/v1/volumes?`,
          method: 'GET',
          dataResponse: 'json',
          params: {
            key: 'AIzaSyD6hfO1VwuXSmtlAk1VAkDP9az-txUHM70',
            q: searchBook.userSearch,
            inauthor: searchBook.userSearch,
            maxResults: 40
          },
        }).then((res) => {
          // console.log(res.data.items)
          setSearchResult(res.data.items)
        })
      } catch (error) {
        setError(true);
      }
      setLoading(false)
    } else if (searchBook.userChoice === 'title') {
      setLoading(true);
      setError(false);
      try {
        axios({
          url: `https://www.googleapis.com/books/v1/volumes?`,
          method: 'GET',
          dataResponse: 'json',
          params: {
            key: 'AIzaSyD6hfO1VwuXSmtlAk1VAkDP9az-txUHM70',
            q: searchBook.userSearch,
            intitle: searchBook.userSearch,
          },
        }).then((res) => {
          console.log(res.data.items)
          setSearchResult(res.data.items)
        })
        console.log('title found')
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    }
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
        console.log(bookKey);
        console.log(bookData);
        bookHold.push({
          uniqueKey: bookKey,
          bookObj: bookData[bookKey]
        });
        console.log(bookHold);
      }
      setBooksArray(bookHold);
    })
    getSearchedBook(searchObj);
  }, [searchBook])

  const handleClick = (e) => {
    const dbRef = firebase.database().ref();
    dbRef.push(e);
  }

  const handleRemove = (event) => {
    const dbRef = firebase.database().ref();
    dbRef.child(event).remove();
    console.log(event.id);
  }

  return (
    <section className='search-container wrapper'>
      {searchResult.map((bookResult) => {
        // console.log(bookResult);
        return (
          <div className='book' key={bookResult.id}>
            <div className='image-container'>
              <img
                src={bookResult.volumeInfo.imageLinks.thumbnail}
                alt={bookResult.volumeInfo.title}
              />
            </div>
            <h3>{bookResult.volumeInfo.title}</h3>
            <p>{bookResult.volumeInfo.subtitle}</p>
            <p>{bookResult.volumeInfo.authors}</p>
            <p>{bookResult.volumeInfo.categories}</p>
            <p>{bookResult.volumeInfo.averageRating}</p>
            <button onClick={() => handleClick(bookResult)}>Add to List!</button>
            <button onClick={() => {
              handleRemove(bookResult.uniqueKey)
            }}>remove from List!</button>
          </div>
        )
      })}
      <ReadingList booksArray={booksArray} />
    </section>

  )
}

export default Search
