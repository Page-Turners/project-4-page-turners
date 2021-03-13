// import firebase from './firebase.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Search from './Search'

function App() {
  const [book, setBook] = useState('');
  useEffect(() => {
    axios({
      url: `https://www.googleapis.com/books/v1/volumes?`,
      method: 'GET',
      dataResponse: 'json',
      params: {
        key: "AIzaSyDKgwjUjoEPLSTlCBheUgeuCpqTxirPtGM",
        q: "derrida",
        inauthor: 'keyes',
      }
    }).then((res) => {
      const booksData = res.data;
      const booksDataArray= booksData.items
      console.log(booksData.items)
      booksDataArray.map((bookObj)=> {
        // console.log(bookObj.volumeInfo.title, bookObj.volumeInfo.authors)
      })

    })
  }, [book]);
  return(
    <>
    <h1>Page Turner App</h1>
    <Search searchBook = {book} /> 
    </>
    
  ) 


};

export default App
