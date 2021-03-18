import { useState, useEffect } from 'react'
import React, { Fragment } from 'react'
import firebase from './firebase.js'

const ReadingList = (props) => {
  const [booksCompleted, setBooksCompleted] = useState([])
  const [readingListBooks, setReadingListBooks] = useState([])
  const { readingListArray } = props
  const totalReadingListSize = readingListArray.length

  console.log('READINGLIST START')
  console.log(readingListArray)

  //Sets the hasRead Attribute in firebase to true
  const handleComplete = (completedBook) => {
    console.log(completedBook)
    let bookRef = firebase.database()

    // const bookFound = 
    readingListArray.filter((book) => {
      return book.bookObj.id === completedBook
        ? bookRef.ref(book.uniqueKey).update({ hasRead: true })
        : null
    })
  }

  useEffect(() => {
    console.log('Sort books HERE !')
    let sortRef = firebase.database().ref()
    const completedBookHold = []
    const readingListBooksHold = []

    sortRef.on('value', (data) => {
      //console.log(data.val());
      const sortData = data.val()

      for (let bookKey in sortData) {
        // console.log(sortData[bookKey]);
        if (sortData[bookKey].hasRead === true) {
          completedBookHold.push(sortData[bookKey])
        } else {
          readingListBooksHold.push(sortData[bookKey])
        }
      }
    })
    setBooksCompleted(completedBookHold)
    setReadingListBooks(readingListBooksHold)
  }, [booksCompleted])

  // returns how many books the user has read vs how many are left in the reading list
  const percentRead = () => {
    if (booksCompleted.length > 0)
    {
      return `${Math.floor((booksCompleted.length / totalReadingListSize) * 100)}`
    
    } else if (booksCompleted.length === 0) {
      return "0% Better get reading!"

    } else if ((booksCompleted.length / totalReadingListSize) === 1) {
      return "100%! Good Work! "
    } else {
      return "Couldn't calculate!"
    }

  }

  const handleRemove = (bookId) => {
    const dbRef = firebase.database().ref()
    const copyOfAllBooks = [...readingListArray]
    // const bookInfo = 
    copyOfAllBooks.filter((book) => {
      console.log(book.bookObj.id)
      return book.bookObj.id === bookId
        ? dbRef.child(book.uniqueKey).remove()
        : null
    })
    //console.log(copyOfAllBooks);
  }

  return (
    <div className='wrapper'>
      <h2 className='readingListTitle'>Reading Library</h2>
      <ul className='bookShelf'>
        {/* {sortBooks()} */}
        {readingListBooks.map((book, index) => {
          const bookData = book
          console.log(bookData)
          return (
            <Fragment key={index}>
                <div className='reading-list-container'>
                   <div className='image-container'>
              {bookData.volumeInfo.imageLinks ? (
                <img
                  src={bookData.volumeInfo.imageLinks.thumbnail}
                  alt={bookData.volumeInfo.title}
                />
              ) : (
                <h3>No image available</h3>
              )}
            </div>

            {/* book details */}
            {bookData.volumeInfo.title ? (
              <h2>{bookData.volumeInfo.title}</h2>
            ) : (
              <h3>No title available</h3>
            )}

            {bookData.volumeInfo.subtitle ? (
              <h3>{bookData.volumeInfo.subtitle}</h3>
            ) : (
              <p></p>
            )}

            {bookData.volumeInfo.authors.join(', ') ? (
              <p>{bookData.volumeInfo.authors}</p>
            ) : (
              <p></p>
            )}

            {bookData.volumeInfo.categories ? (
              <p>{bookData.volumeInfo.categories}</p>
            ) : (
              <p></p>
            )}

            {bookData.volumeInfo.averageRating ? (
              <p>rating:{bookData.volumeInfo.averageRating}/5</p>
            ) : (
              <p></p>
            )}

                <button onClick={() => handleComplete(bookData.id)}>
                  Complete!
                </button>
                
                {/* <button onClick={() => {
                  handleRemove(bookResult.id)
                }}>remove from List!</button>  */}
              </div>
            </Fragment>
          )
        })}
      </ul>

      <h2 className='completedListTitle'>Completed Library</h2>
      <ul className='completedShelf'>
        {booksCompleted.map((book, index) => {
          const completedBookData = book
          // console.log(bookData);
          return (
            <Fragment key={index}>
              <div className='book'>
                <div className='image-container'>
                  {completedBookData.volumeInfo.imageLinks ? (
                    <img
                      src={completedBookData.volumeInfo.imageLinks.thumbnail}
                      alt={completedBookData.volumeInfo.title}
                    />
                  ) : (
                    <h3>No image available</h3>
                  )}
                </div>

                {/* book details */}
                {completedBookData.volumeInfo.title ? (
                  <h2>{completedBookData.volumeInfo.title}</h2>
                ) : (
                  <h3>No title available</h3>
                )}

                {completedBookData.volumeInfo.subtitle ? (
                  <h3>{completedBookData.volumeInfo.subtitle}</h3>
                ) : (
                 <p></p>
                )}

                {completedBookData.volumeInfo.authors.join(', ') ? (
                  <p>{completedBookData.volumeInfo.authors}</p>
                ) : (
                  <p></p>
                )}

                {completedBookData.volumeInfo.categories ? (
                  <p>{completedBookData.volumeInfo.categories}</p>
                ) : (
                  <p></p>
                )}

                {completedBookData.volumeInfo.averageRating ? (
                  <p>rating:{completedBookData.volumeInfo.averageRating}/5</p>
                ) : (
                  <p></p>
                )}
                <button
                  onClick={() => {
                    handleRemove(completedBookData.id)
                  }}
                >
                  remove from List!
            </button>
                {/* <button onClick={() => {
                  handleRemove(bookResult.id)
                }}>remove from List!</button>  */}
              </div>
            </Fragment>
          )
        })}
      </ul>

      <aside className='readingProgress'>
        <h1 className='readingPercentage'>
          Reading Progress: {percentRead()}
        </h1>
        {/* <h1>{totalReadingListSize}</h1>
        <h1>{booksCompleted.length}</h1> */}
      </aside>
    </div>
  )
}
export default ReadingList
