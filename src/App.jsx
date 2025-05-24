import { useState, useEffect } from 'react'
import './App.css'
import ColorfulHeader from './components/ColorfulHeader';
import AIDisclaimer from './components/AIDisclaimer';
import WheelComponent from './components/WheelComponent';
import ResultModal from './components/ResultModal';
import activities from './aiGeneratedActivities';

function App() {
  const [options, setOptions] = useState([]);
  const [todo, setTodo] = useState(null);
  const [winner, setWinner] = useState(null);
  const [newItem, setNewItem] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const wheelSize = options.length ? Math.max(15, options.sort((a, b) => b.length - a.length)[0].length) * 10 : 0;
  const segColors = [
    '#EE4040', '#F0CF50', '#815CD1', '#3DA5E0',
    '#34A24F', '#F9AA1F', '#EC3F3F', '#FF9000'
  ];

  useEffect(() => {
    let storedOptions = localStorage.getItem('options');
    const parsedOptions = JSON.parse(storedOptions);
    const loadedOptions = parsedOptions ?? [];
    setOptions(loadedOptions);
    setNewItem(loadedOptions.join('\n'))
  }, []);

  useEffect(() => {
    chooseTodo(options);
  }, [options]);

  function chooseTodo(options) {
    const randomInt = Math.floor(Math.random() * options.length);
    const pickedTodo = options[randomInt];
    setTodo(pickedTodo);
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
      <ColorfulHeader text={"TODOulette"} colors={segColors} />
      {/* <AIDisclaimer /> */}
      {winner && <ResultModal winner={winner} onClose={() => setWinner(null)} />}
      {isEditing ?
        <div className='configuration-area'>
          {/* <button className='btn flow-button' onClick={() => {
            let generated = '';
            for (let i = 0; i < 10; i++) {
              const randomInt = Math.floor(Math.random() * activities.length);
              const pickedItem = activities[randomInt];
              generated += pickedItem + '\n'
            }
            setNewItem(generated);

          }}>Get from ✨AI✨</button> */}
          <textarea type='text' rows={10} value={newItem} onChange={e => setNewItem(e.target.value)}></textarea>
          <button className='btn bg-green' onClick={() => {
            let updatedOptions = newItem.split('\n').filter(e => e.length > 0);
            setOptions(updatedOptions);
            localStorage.setItem('options', JSON.stringify(updatedOptions));
            setIsEditing(false);
          }}>Done</button>
        </div>
        :
        drawWheel()
      }

      <div className='footer'>
        I just need this space to add some padding.
      </div>
    </div>


  );
}

export default App
