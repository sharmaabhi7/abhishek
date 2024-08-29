import React, {useEffect, useState} from 'react'
import './App.css'

function App() {
  let [jokes,setJokes] = useState([]);
  let [Time,setTime] = useState(0)
  let [toggleClass, newClass] = useState('bx bx-toggle-left');
  let [theme,setTheme] = useState({
    backgroundColor: "white",
    color: "black"
  })

  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((a) => (a > 0 ? a - 1 : 0));
    }, 1020);
    
    return () => clearInterval(interval); 
  }, [jokes]);



  const NightMode = () => {
    setTheme((prevTheme) => ({
      backgroundColor: prevTheme.backgroundColor === 'white' ? 'black' : 'white',
      color: prevTheme.color === 'black' ? 'white' : 'black',
    }));
    newClass((prevClass) =>
      prevClass === 'bx bx-toggle-left' ? 'bx bx-toggle-right' : 'bx bx-toggle-left'
    );
  };

  const FetchJokes = async ()=>{
  const res = await fetch("https://geek-jokes.sameerkumar.website/api?format=json");
  const data = await res.json();
  setJokes(data.joke)
  setTime(20)
  }

  
  return (
  <>
    
  <div className="gradient">
  <div className='main' style={theme}>
  <p style={{fontSize: "50px"}}>
  😂😂😂
    </p>
  <p>
    {jokes}
  </p>

  <button onClick={FetchJokes}>NEW JOKES</button>
    <p style={{marginTop: "10px"}}>
  This joke having a {jokes.length} word. & read within a {parseInt(jokes.length*0.04)} seconds
    </p>
  <p style={{marginTop: "10px"}}>Joke will end in {Time} Seconds</p>
  <i className={toggleClass} onClick={NightMode} style={{fontSize: "35px"}} id='tog'></i>
  </div>
  </div>
  </>

  )
}

export default App
