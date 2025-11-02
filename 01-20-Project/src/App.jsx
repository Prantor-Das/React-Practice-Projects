import './App.css'
import Accordian from './components/01-accordian'
import RandomColor from './components/02-random-color'
import StarRating from './components/03-star-rating'

function App() {

  return (
    <div>
      <h1 style={{ textAlign: "center"}}>Accordian</h1>
      <Accordian />
      <br />
      <hr />
      <br />
      <h1 style={{ textAlign: "center"}}>Random Color</h1>
      <RandomColor />
      <br />
      <hr />
      <br />
      <h1 style={{ textAlign: "center"}}>Star Rating</h1>
      <StarRating noOfStars={10} />
      <br />
      <hr />
      <br />
      <h1 style={{ textAlign: "center"}}>Image Slider</h1>
    </div>
  )
}

export default App
