import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import './App.css';

const App = () => {

  const [ calledNumbers, setCalledNumbers ] = useState([])

  const callNextNumber = () => {
    const nextNumber = Math.round((Math.random() * 90));
    if (!!nextNumber && !calledNumbers.includes(nextNumber)) return nextNumber;
    return callNextNumber();
  }

  const handleNextNumberClick = () => {
    setCalledNumbers([...calledNumbers, callNextNumber()]);
  }

  const buildGrid = () => {
    console.log(calledNumbers)
    const gridRows = []
    for (let y = 0; y < 9; y++) {
      const gridColumn = []
      for (let x = 1; x <= 10; x++) {
        const num = 10 * y + x
        const classStyle = calledNumbers.includes(num) ? 'called-number' : null;
        gridColumn.push(
          <Grid item key={`bingo-number-${num}`} className={`bingo-number ${classStyle}`}>{num}</Grid>
        );
      }
      gridRows.push(
        <div className='grid-row-wrapper'>
          <Grid container justify='space-between' spacing={2}>{gridColumn}</Grid>
        </div>
      )
    }
    return gridRows;
  }

  return (
    <div className="App">
      <header className="App-header">
        Bingo
      </header>
      <div className='app-contents'>
        <div className='announcer-area'>
          {calledNumbers.length ? <div>Last called number: {calledNumbers[calledNumbers.length - 1]}</div> : null}
        </div>
        <div className='card-container'>
          {buildGrid()}
        </div>
        {
          calledNumbers.length !== 90 ?
            <Button variant="contained" color="link" onClick={handleNextNumberClick}>Next number</Button> :
            null
        }
      </div>
    </div>
  );
}

export default App;
