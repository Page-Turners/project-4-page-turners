import axios from 'axios'
import { useEffect, useState } from 'react';//import firebase into our component


import firebase from './firebase.js';

function Search(props) {
  const [searchResult, setSearchResult] = useState([]);

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
        bookHold.push({
          uniqueKey: bookKey,
          title: bookData[bookKey]
        });
        console.log(bookHold);
      }
    })
    getSearchedBook(searchObj)
  }, [searchBook])

  const handleClick = (e) => {
    const dbRef = firebase.database().ref();
    dbRef.push(e);
  }

  const handleRemove = (event) => {
    const dbRef = firebase.database().ref();
    dbRef.child(event.id).remove();
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
              handleRemove(bookResult.id)
            }}>remove from List!</button>
          </div>
        )
      })}
    </section>
  )
}

export default Search
