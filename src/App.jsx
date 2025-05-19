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
  const [isEditing, setIsEditing] = useState(false);
  const { width, height } = useWindowSize()
const wheelSize = Math.max(15, options.sort((a, b) => b.length - a.length)[0].length) * 10;
console.log(wheelSize)
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

  function drawWheel() {
    return <div>
      {options.length ?
        <WheelComponent
          segments={options}
          segColors={segColors}
          winningSegment={todo}
          primaryColor='white'
          contrastColor='white'
          buttonText='Spin'
          buttonFillColor='#242424'
          isOnlyOnce={false}
          size={wheelSize}
          upDuration={100}
          downDuration={1000}
          onFinished={winner => { setWinner(winner); chooseTodo(options); }}
          onStarted={() => setWinner(null)}
        />
        : <p>Add options to start!</p>}
      <button className='btn bg-purple' onClick={() => setIsEditing(true)}>Edit</button>
    </div>
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
      {winner ? <>
        <div id="result">
          <div>

            <span>You'll do:</span>
            <h3>{winner}</h3>
            <img height={"200px"} src="https://p8.itc.cn/q_70/images03/20230720/8a1585ab45064747a00b87e952ddec45.gif" />
          </div>
          <button className='btn bg-green' onClick={() => setWinner(null)}>I promise I'll do it...</button>
        </div>
        <Confetti
          width={width}
          height={height}
        />
      </> : null}
      {isEditing ?
        <div className='configuration-area'>

            <textarea type='text' rows={10} value={newItem} onChange={e => setNewItem(e.target.value)}></textarea>
          
            <button className='btn bg-orange' onClick={() => {
              let updatedOptions = newItem.split('\n').filter(e => e.length > 0);
              console.log(updatedOptions)
              setOptions(updatedOptions);
               localStorage.setItem('options', JSON.stringify(updatedOptions));
              setIsEditing(false);
              }}>Done</button>
        </div>
        :
        drawWheel()
      }


    </div>

  );
}

export default App
