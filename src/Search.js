import axios from 'axios'
import { useEffect, useState } from 'react';
//import firebase into our component
import firebase from './firebase.js';
import ReadingList from './ReadingList';

function Search(props) {
  const [searchResult, setSearchResult] = useState([]);
  const [booksArray, setBooksArray] = useState([]);
  const { searchBook } = props;
  console.log(searchBook);
  const searchObj = {}
  searchObj.userSearch = searchBook.text
  searchObj.userChoice = searchBook.type

  const getSearchedBook = (searchBook) => {
    if (searchBook.userChoice === 'author') {
      // console.log('author found');
      try {
        axios({
          url: `https://www.googleapis.com/books/v1/volumes?`,
          method: 'GET',
          dataResponse: 'json',
          params: {
            key: 'AIzaSyD6hfO1VwuXSmtlAk1VAkDP9az-txUHM70',
            q: `inauthor:${searchBook.userInput}`,
            // inauthor: searchBook.userSearch
            // maxResults: 40
          },
        }).then((res) => {
          // console.log(res.data.items)
          setSearchResult(res.data.items)
        })
      } catch (error) {
        console.log(error);
      }
    } else if (searchBook.userChoice === 'title') {
      try {
        axios({
          url: `https://www.googleapis.com/books/v1/volumes?`,
          method: 'GET',
          dataResponse: 'json',
          params: {
            key: 'AIzaSyD6hfO1VwuXSmtlAk1VAkDP9az-txUHM70',
            q: ` intitle:${searchBook.userSearch}`,

          },
        }).then((res) => {
          console.log(res.data.items)
          setSearchResult(res.data.items)
        })
        console.log('title found')
      } catch (error) {
        console.log(error);
      }
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
        //console.log(bookKey);
        //console.log(bookData);
        bookHold.push({
          uniqueKey: bookKey,
          bookObj: bookData[bookKey]
        });
      }
      setBooksArray(bookHold);
    })
    getSearchedBook(searchObj);
  }, [searchBook])

  const handleClick = (e) => {
    const dbRef = firebase.database().ref();
    dbRef.push(e);

  }

  const checkDuplicate = function (bookToBeAdded) {
    let hasDuplicate = false;
    booksArray.forEach((book) => {
      if (book.bookObj.id === bookToBeAdded.id) {
        hasDuplicate = true;
      }
    })
    if (!hasDuplicate) {
      handleClick(bookToBeAdded);

    }
  }

  const handleRemove = (bookId) => {
    const dbRef = firebase.database().ref();
    const copyOfAllBooks = [...booksArray];
    const bookInfo = copyOfAllBooks.filter((book) => {
      console.log(book.bookObj.id);
      return (
        book.bookObj.id === bookId ? dbRef.child(book.uniqueKey).remove() : null
      )
    })
    //console.log(copyOfAllBooks);
  }



  return (
    <section className='search-container wrapper'>
      { searchResult.map((bookResult) => {
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
            <h4>{bookResult.volumeInfo.subtitle}</h4>
            <p>{(bookResult.volumeInfo.authors).join(", ")}</p>
            <p>{bookResult.volumeInfo.categories}</p>
            <p>{bookResult.volumeInfo.averageRating}</p>
            <button onClick={() => checkDuplicate(bookResult)}>Add to List!</button>
            <button onClick={() => {
              handleRemove(bookResult.id)
            }}>remove from List!</button>
          </div>
        )
      })}
      <ReadingList booksArray={booksArray} />
    </section>

  )
}

export default Search
