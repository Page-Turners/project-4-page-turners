import { useState, useEffect } from 'react'
import React, { Fragment } from 'react'
import firebase from './firebase.js'

const ReadingList = (props) => {
  const [booksCompleted, setBooksCompleted] = useState([])
  const [readingListBooks, setReadingListBooks] = useState([])
  const { readingListArray } = props
  const totalReadingListSize = readingListArray.length

 

  //Sets the hasRead Attribute in firebase to true
  const handleComplete = (completedBook) => {
    
    let bookRef = firebase.database()

   
    readingListArray.filter((book) => {
      return book.bookObj.id === completedBook
        ? bookRef.ref(book.uniqueKey).update({ hasRead: true })
        : null
    })
  }

  useEffect(() => {
    
    let sortRef = firebase.database().ref()
    const completedBookHold = []
    const readingListBooksHold = []

    sortRef.on('value', (data) => {
    
      const sortData = data.val()

      for (let bookKey in sortData) {
        
        if (sortData[bookKey].hasRead === true) {
          completedBookHold.push(sortData[bookKey])
          console.log('completed')
          console.log(sortData[bookKey])
        } else {
          readingListBooksHold.push(sortData[bookKey])
          console.log('other')
          console .log(sortData[bookKey])
        }
      }
    })
    setBooksCompleted(completedBookHold)
    setReadingListBooks(readingListBooksHold)
  }, [booksCompleted.hasRead])

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
    
    copyOfAllBooks.filter((book) => {
      
      return book.bookObj.id === bookId
        ? dbRef.child(book.uniqueKey).remove()
        : null
    })
    
  }

  return (
    <div className='wrapper'>
      <h2 className='readingListTitle'>Reading Library</h2>
      <ul className='bookShelf'>
        {readingListBooks.map((book, index) => {
          const bookData = book
         
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

            {bookData.volumeInfo.authors ? (
                  <p>{(bookData.volumeInfo.authors).join(', ')}</p>
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
              
              </div>
            </Fragment>
          )
        })}
      </ul>

      <h2 className='completedListTitle'>Completed Library</h2>
      <ul className='completedShelf'>
        {booksCompleted.map((book, index) => {
          const completedBookData = book
         
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

                {completedBookData.volumeInfo.authors ? (
                  <p>{(completedBookData.volumeInfo.authors).join(', ')}</p>
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
               
              </div>
            </Fragment>
          )
        })}
      </ul>

      <aside className='readingProgress'>
        <h1 className='readingPercentage'>
          Reading Progress: {percentRead()}
        </h1>
  
      </aside>
    </div>
  )
}
export default ReadingList
