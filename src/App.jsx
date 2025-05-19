import { useState, useEffect } from 'react'
import yaml from 'js-yaml';
import WheelComponent from './components/WheelComponent';
import './App.css'

function App() {
  const [options, setOptions] = useState([]);
  const [todo, setTodo] = useState(null);
  const [loading, isLoading] = useState(true);

  const segColors = [
    '#EE4040', '#F0CF50', '#815CD1', '#3DA5E0',
    '#34A24F', '#F9AA1F', '#EC3F3F', '#FF9000'
  ];

  useEffect(() => {
    fetch("./sample.yml")
      .then((response) => response.text())
      .then((text) => {
        const parsedData = yaml.load(text);
        setOptions(parsedData);
        chooseTodo(parsedData);
        isLoading(false);
      })
      .catch((error) => console.error('Error loading YAML:', error));
  }, []);

  function chooseTodo(options) {
    const randomInt = Math.floor(Math.random() * options.length);
    const pickedTodo = options[randomInt];
    setTodo(pickedTodo);
    console.log(pickedTodo)
  }

  function drawWheel() {
    if (loading)
      return <p>loading...</p>;
    return <WheelComponent
      segments={options}
      segColors={segColors}
      winningSegment={todo}
      primaryColor='black'
      contrastColor='white'
      buttonText='Spin'
      isOnlyOnce={false}
      size={290}
      upDuration={100}
      downDuration={1000}
      onFinished={() =>{ chooseTodo(options);}}
    />
    { }
  }

  return (
    <div>
      <h1>Doullete</h1>
      {drawWheel()}

    </div>
  );
}

export default App
