import { useState } from 'react';
//Local copy of firebase to be printed
import React, { Fragment } from 'react';
const ReadingList = (props) => {
  const [booksCompleted, setBooksCompleted] = useState([]);
  const { readingListArray } = props;

  console.log("READINGLIST START");
  console.log(readingListArray);

  const handleComplete = (completedBook) => {
    console.log(completedBook);

    // if (completedBook === readingListArray.bookObj.id) {
    const bookFound = readingListArray.filter((book) => {
      return book.bookObj.id === completedBook
        ?
        book.bookObj.hasRead = true
        : null
    });
  }

  const sortBooks = () => {
    const bookFound = readingListArray.filter((book) => {
      return book.bookObj.hasRead === true
        ?
        // setBooksCompleted(book)
        <h1>has found</h1>
        : null
    });

  }

  return (

    <ul className="bookShelf">
      {
        readingListArray.map((book, index) => {
          const bookData = book.bookObj;
          // console.log(bookData);
          return (
            <Fragment key={index}>
              <div className='book'>
                <div className='reading-list-container'>
                  <img
                    src={bookData.volumeInfo.imageLinks.thumbnail} alt={bookData.volumeInfo.title}

                  />
                </div>
                <h3>{bookData.volumeInfo.title}</h3>
                <p>{bookData.volumeInfo.subtitle}</p>
                <p>{bookData.volumeInfo.authors}</p>
                <p>{bookData.volumeInfo.categories}</p>
                <p>{bookData.volumeInfo.averageRating}</p>

                <button onClick={() => handleComplete(bookData.id)}>Complete!</button>
                {/* <button onClick={() => {
                  handleRemove(bookResult.id)
                }}>remove from List!</button>  */}
              </div>
              {sortBooks()}
            </Fragment>
          )

        })
      }

    </ul>
  )
}
export default ReadingList;