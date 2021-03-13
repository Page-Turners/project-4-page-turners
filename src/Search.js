import { useEffect, useState } from 'react'

function Search(props) {
  const searchBook = props
  const [userChoice, setUserChoice] = useState('placeholder')
  //   handles submit
  const handleSubmit = (event) => {
    const selectedRadio = document.querySelector('input[type ="radio"]:checked')
      .id
    event.preventDefault()
    console.log(selectedRadio)
    // stores the search query
    const searchQuery = event.target[0].value
    setUserChoice(searchQuery)
  }

  // const handleRadioOption = (event) => {
  //   console.log(event)
  // }

  return (
    <div>
      <form action='' onSubmit={handleSubmit}>
        <label htmlFor='bookSearch'>What would you like to read?</label>
        <input type='text' id='bookSearch' value={userChoice} />

        <label htmlFor='author'>Author</label>
        <input
          type='radio'
          id='author'
          value='author'
          name='searchType'
          // onChange={handleRadioOption}
        />

        <label htmlFor='title'>Title</label>
        <input
          type='radio'
          id='title'
          value='title'
          name='searchType'
          // onChange={handleRadioOption}
        />

        <button>Find Me A Book! </button>
      </form>
    </div>
  )
}

export default Search
