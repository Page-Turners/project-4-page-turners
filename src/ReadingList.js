import { useState } from 'react';
import React, { Fragment } from 'react';
import firebase from './firebase.js'

const ReadingList = (props) => {
  const [booksCompleted, setBooksCompleted] = useState([]);
  const { readingListArray } = props;

  console.log("READINGLIST START");
  console.log(readingListArray);

  //Sets the hasRead Attribute in firebase to true
  const handleComplete = (completedBook) => {
    console.log(completedBook);
    let bookRef = firebase.database();

      const bookFound = readingListArray.filter((book) => {
        return book.bookObj.id === completedBook
        ?
         bookRef.ref(book.uniqueKey).update({hasRead:true})

        : null
    });
  }

  const sortBooks = () => {
    console.log("Sort books HERE !");
    let result = "";
    let sortRef = firebase.database().ref();
    
    sortRef.on('value',(data)=>{
      //console.log(data.val());
      const sortData = data.val();
     // const booksToBeSorted = [];

      for (let bookKey in sortData){
       // console.log(sortData[bookKey]);
        if (sortData[bookKey].hasRead === true)
        {
          
          result = result+ `<div className='book'>
            <div className='reading-list-container'>
              <img
                src={sortData[bookKey].volumeInfo.imageLinks.thumbnail} alt={sortData[bookKey].volumeInfo.title}
              />
            </div>

            <h3>{sortData[bookKey].volumeInfo.title}</h3>
            <p>{sortData[bookKey].volumeInfo.subtitle}</p>
            <p>{sortData[bookKey].volumeInfo.authors}</p>
            <p>{sortData[bookKey].volumeInfo.categories}</p>
            <p>{sortData[bookKey].volumeInfo.averageRating}</p>
            <button onClick={() => handleComplete(sortData[bookKey].id)}>Complete!</button>
            {/* <button onClick={() => {
                  handleRemove(bookResult.id)
                }}>remove from List!</button>  */}
          </div>`;
          
        }
        else{
          

        }
      }
      return(result)
    })
    
    //console.log(sortRef.data);

    // bookRef = readingListArray.filter((book) => {
    //   return (book.hasRead === true)
    //     ?
    //     <h1>has found</h1>
    //     : <p>Not found</p>
    // });
    
  }
  
  return (
    
    <ul className="bookShelf">
      {sortBooks()}
      {
        readingListArray.map((book, index) => {
          const bookData = book.bookObj;
          // console.log(bookData);
          return (
            <Fragment key={index}>
              <div className='book'>
                {/* <div className='reading-list-container'>
                
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
            </Fragment>
          )

        })
      }

    </ul>
  )
}
export default ReadingList;