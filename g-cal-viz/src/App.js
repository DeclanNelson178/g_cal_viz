import React, { useState } from 'react';

import ApiCalendar from 'react-google-calendar-api';
import moment from 'moment';
import ReactWordCloud from 'react-wordcloud';
import { colorCounts, processText } from './data-utils/process-calendar-data'

function App() {
  const [auth, setAuth] = useState(false);
  const [processed, setProcessed] = useState(true);
  const [data, setData] = useState(false);
  const [wordCloud, setWordCloud] = useState(null);

  const handleSignIn = (e) => {
    ApiCalendar.handleAuthClick();
    if (ApiCalendar.sign) {
      setAuth(true);
      console.log(auth);
    }
  }
  
  const handleSignOut = (e) => {
    ApiCalendar.handleSignoutClick();
    setAuth(false);
    console.log(auth);
  }

  const getEvents = async () => {
    while (!ApiCalendar.sign) {
      console.log('waiting to sign in');
    }
    const { result } = await ApiCalendar.listEvents({
      timeMin: moment().subtract(3, 'days').toISOString(),
      timeMax: moment().toISOString(),
      showDeleted: true,
      maxResults: 15,
      orderBy: 'updated'
    });
    console.log(result);
    setData(result);
    setProcessed(true);
  }

  const handleGraphics = () => {
    if (data.items) {
      const wordMap = processText(data.items);
      let wordCloud = [];
      Object.keys(wordMap).forEach(key => {
        wordCloud.push({
          text: key,
          value: wordMap[key]
        });
      });
      // temp
      return (
        <ReactWordCloud words={wordCloud}/>
      );
    } else {
      return (
        <p>Loading...</p>
      );
    }
  }

  return (
    <div className="App">
      {!auth ? 
        <button onClick={(e) => handleSignIn(e)}>Sign In</button> : 
        <>
          <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
          <button onClick={(e) => getEvents()}>Process Calendar Data</button>
        </>
      }
      {processed ? handleGraphics(): <p>Loading</p>}
    </div>
  );
}

export default App;
