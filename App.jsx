import './App.css'
import Grid from './components/Grid/Grid'

//mport Card from './components/card/Card'

function App() {
  

  return (
    <>
     <h1 className="game">TIC TOE GAME</h1>
    <Grid numberOfCards={9}  />
    </>
  );
}

export default App;
