import { useState, useEffect } from 'react'
import React from 'react'

import Search from './Search.js'


const FormField = () => {
    const [result, setResult] = useState('')
    const [searchType, setSearchType] = useState('')

    const [userInput, setUserInput] = useState('')
    const [radioInput, setRadioInput] = useState('')

    const [formBooksArray, setFormBooksArray] = useState([])


    const handleUserInput = (event) => {
        const selectedText = event.target.value
        console.log('userinput!')
        setUserInput(selectedText)
    }

    const handleRadioInput = (event) => {
        const selectedRadio = event.target.value
        console.log('radioinput!')
        setRadioInput(selectedRadio)
    }


    //   handles submit on searchbar
    const handleSubmit = (event) => {
        // const selectedRadio = document.querySelector('input[type ="radio"]:checked')
        //   .id
        // const selectedText = document.getElementById('bookSearch').value
        event.preventDefault()
        setResult(userInput)
        setSearchType(radioInput)
    }


    return (
        <>
            {/* <div className="search-container"> */}
                <section className='form-field'>

                    <form action='' onSubmit={handleSubmit}>
                        <label className="sr-only" htmlFor='bookSearch'>Search for book</label>
                        <input
                            type='search'
                            className='search-bar'
                            id='bookSearch'
                            placeholder='Search Here...'
                            value={userInput}
                            onChange={handleUserInput}
                            required
                        />
                        <fieldset>
                            <label className='radio-label' htmlFor='author'>
                                Author
              </label>
                            <input
                                type='radio'
                                id='author'
                                value='author'
                                name='searchType'
                                onChange={handleRadioInput}
                                checked={radioInput === 'author'}
                            />

                            <label className='radio-label' htmlFor='title'>
                                Title
              </label>
                            <input
                                type='radio'
                                id='title'
                                value='title'
                                name='searchType'
                                onChange={handleRadioInput}
                                checked={radioInput === 'title'}
                            />
                        </fieldset>
                        <button className='search-button'>Find Me A Book! </button>
                    </form>

                </section>

            {/* </div> */}
            <main>
                {searchType && result ? (
                    <Search
                        type={searchType}
                        text={result}
                        searchBook={formBooksArray}
                    />
                ) : null}

            </main>
        </>
    )
}

export default FormField;
