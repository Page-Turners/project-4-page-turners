import axios from 'axios'
import { useEffect, useState } from 'react'

function Search(props) {
  const [searchResult, setSearchResult] = useState([])
  const searchBook = props
  const searchObj = {}
  // const [userChoice, setUserChoice] = useState('')

  searchObj.userSearch = searchBook.text
  searchObj.userChoice = searchBook.type

  // stores the search query
  // const handleRadioOption = (event) => {
  //     const searchQuery = event.target[0].value
  //     setUserChoice(searchQuery)
  // }
  const getSearchedBook = (searchBook) => {
    if (searchBook.userChoice === 'author') {
      console.log('author found')
      axios({
        url: `https://www.googleapis.com/books/v1/volumes?`,
        method: 'GET',
        dataResponse: 'json',
        params: {
          key: 'AIzaSyD6hfO1VwuXSmtlAk1VAkDP9az-txUHM70',
          q: searchBook.userSearch,
          inauthor: searchBook.userSearch,
        },
      }).then((res) => {
        console.log(res.data.items)
        setSearchResult(res.data.items)
      })
    } else if (searchBook.userChoice === 'title') {
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
    }
  }

  useEffect(() => {
    {
      getSearchedBook(searchObj)
    }
  }, [searchBook])

  return (
    <section className='search-container wrapper'>
      {searchResult.map((bookResult) => {
        console.log(bookResult)
        return (
          <div className='book'>
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
          </div>
        )
      })}
    </section>
  )
}

export default Search
