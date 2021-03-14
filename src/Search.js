import axios from 'axios'
import { useEffect, useState } from 'react'

function Search(props) {
  const searchBook = props
  const searchObj = {};
 // const [userChoice, setUserChoice] = useState('')
  
  searchObj.userSearch = searchBook.text;
  searchObj.userChoice = searchBook.type;
  

   // stores the search query
  // const handleRadioOption = (event) => {
  //     const searchQuery = event.target[0].value
  //     setUserChoice(searchQuery)
  // }

  useEffect(() => {
    axios({
      url: `https://www.googleapis.com/books/v1/volumes?`,
      method: 'GET',
      dataResponse: 'json',
      params: {
        key: 'AIzaSyD6hfO1VwuXSmtlAk1VAkDP9az-txUHM70',
        q: searchObj.userSearch ,
        inauthor: searchObj.userSearch,
        
      },
    }).then((res) => {
      console.log(res.data.items);
      // const booksData = res.data
      // console.log(res.data)
      // const booksDataArray = booksData.items
      // console.log(booksData.items)
      // booksDataArray.map((bookObj) => {
      //   // console.log(bookObj.volumeInfo.title, bookObj.volumeInfo.authors)
      // })
      // console.log(book)
      //setBook(res.data.items)
    })
  }, [])

  return (
    <div>
     <p>SeachBar: {props.text} Radio: {props.type}</p>
    </div>
  )
}

export default Search
