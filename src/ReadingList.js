//Local copy of firebase to be printed
import React, { Fragment } from 'react';
const ReadingList = (props) => {
  const { booksArray } = props;
  // console.log(booksArray);
  return (
    <ul className="bookShelf">
      {
        booksArray.map((book, index) => {
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
                {/* <button onClick={() => handleClick(bookResult)}>Add to List!</button>
                <button onClick={() => {
                  handleRemove(bookResult.id)
                }}>remove from List!</button> */}
              </div>
            </Fragment>
          )

        })
      }
    </ul>

  )
}
export default ReadingList;