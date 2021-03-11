// import firebase from './firebase.js';
import { useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  useEffect(() => {
    axios({
      url: `https://www.googleapis.com/books/v1/volumes?`,
      method: 'GET',
      dataResponse: 'json',
      params: {
        key: "AIzaSyDKgwjUjoEPLSTlCBheUgeuCpqTxirPtGM",
        q: "flowers",
        inauthor: 'keyes',
      }
    }).then((res) => {
      const booksData = res.data;

    })
  }, []);
  return <h1>Page Turner App</h1>

};

export default App
