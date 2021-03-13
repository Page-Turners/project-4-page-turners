// import firebase from './firebase.js';
import { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Search from './Search'

function App() {
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
        console.log(bookObj.volumeInfo.title, bookObj.volumeInfo.authors)
      })

    })
  }, []);
  return(
    <>
    <h1>Page Turner App</h1>
    <Search /> 
    </>
    
  ) 


};

export default App
