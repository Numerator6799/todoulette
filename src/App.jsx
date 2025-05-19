import { useState, useEffect } from 'react'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import WheelComponent from './components/WheelComponent';
import './App.css'

function App() {
  const [options, setOptions] = useState([]);
  const [todo, setTodo] = useState(null);
  const [winner, setWinner] = useState(null);
  const [newItem, setNewItem] = useState('');
  const { width, height } = useWindowSize()

  const segColors = [
    '#EE4040', '#F0CF50', '#815CD1', '#3DA5E0',
    '#34A24F', '#F9AA1F', '#EC3F3F', '#FF9000'
  ];

  useEffect(() => {
    let storedOptions = localStorage.getItem('options');
    const parsedOptions = JSON.parse(storedOptions);
    setOptions(parsedOptions ?? []);
  }, []);

  useEffect(() => {
    chooseTodo(options);
  }, [options]);

  function chooseTodo(options) {
    const randomInt = Math.floor(Math.random() * options.length);
    const pickedTodo = options[randomInt];
    setTodo(pickedTodo);
    console.log("next todo chosen", pickedTodo)
  }
  function addOption(option) {
    const updatedOptions = [...options, option];
    setOptions(updatedOptions);
    localStorage.setItem('options', JSON.stringify(updatedOptions));
  }

  function drawWheel() {
    if(!options.length)
    return <p>Add options to start!</p>
    return <WheelComponent
      segments={options}
      segColors={segColors}
      winningSegment={todo}
      primaryColor='white'
      contrastColor='white'
      buttonText='Spin'
      buttonFillColor='#242424'
      isOnlyOnce={false}
      size={200}
      upDuration={100}
      downDuration={1000}
      onFinished={winner => { setWinner(winner); chooseTodo(options); }}
      onStarted={() => setWinner(null)}
    />
    { }
  }

  return (
    <div>
      <h1>
        {"TODOulette".split('').map((c, i) => {
          let colorIndex = i;
          if (i >= segColors.length)
            colorIndex = colorIndex - segColors.length;
          return <span className="title-letter" key={i} style={{ color: segColors[colorIndex] }}>{c}</span>
        })}

      </h1>
      <div className='input-box'>
        <input type='text' value={newItem} onChange={e => setNewItem(e.target.value)}></input>
        <button disabled={!newItem} onClick={() => {
          addOption(newItem)
          setNewItem('');
        }}>Add</button>
      </div>
      {winner ? <>
        <div id="result">

          <span>You'll do:</span>
          <h3>{winner}</h3>
          <img height={"200px"} src="https://p8.itc.cn/q_70/images03/20230720/8a1585ab45064747a00b87e952ddec45.gif" />
        </div>
        <Confetti
          width={width}
          height={height}
        />
      </> : null}
      {drawWheel()}

    </div>

  );
}

export default App
