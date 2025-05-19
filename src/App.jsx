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
const wheelSize = options.length ? Math.max(15, options.sort((a, b) => b.length - a.length)[0].length) * 10 : 0;
  const segColors = [
    '#EE4040', '#F0CF50', '#815CD1', '#3DA5E0',
    '#34A24F', '#F9AA1F', '#EC3F3F', '#FF9000'
  ];

 const activities = [
    "Watch a movie",
    "Read a book",
    "Listen to a podcast",
    "Paint a picture",
    "Go for a run",
    "Try a new recipe",
    "Play a board game",
    "Write a short story",
    "Do a yoga session",
    "Learn a new language",
    "Solve a puzzle",
    "Take a nature walk",
    "Knit or crochet something",
    "Play an instrument",
    "Stargaze at night",
    "Try photography",
    "Build a DIY craft",
    "Explore a museum",
    "Dance to your favorite songs",
    "Meditate for relaxation",
    "Go cycling around your neighborhood",
    "Call or text a friend",
    "Organize your workspace",
    "Create a playlist",
    "Journal your thoughts",
    "Visit a farmers’ market",
    "Try gardening",
    "Bake a cake or cookies",
    "Play video games",
    "Learn basic coding",
    "Research a historical event",
    "Take an online course",
    "Write a poem",
    "Try calligraphy",
    "Visit a local café",
    "Make a scrapbook",
    "Try woodworking",
    "Take a nap",
    "Join a sports club",
    "Do a digital detox",
    "Build a Lego creation",
    "Sketch a comic strip",
    "Go birdwatching",
    "Try indoor rock climbing",
    "Watch a documentary",
    "Make handmade gifts",
    "Set up a picnic",
    "Try roller skating",
    "Create an origami figure",
    "Participate in a trivia game",
    "Test out new makeup looks",
    "Start a YouTube channel",
    "Learn about astronomy",
    "Write a handwritten letter",
    "Try a virtual escape room",
    "Experiment with science experiments",
    "Play chess or checkers",
    "Create a vision board",
    "Take silly photos with friends",
    "Explore a new hiking trail",
    "Try a new workout routine",
    "Play frisbee at the park",
    "Start a travel bucket list",
    "Design your own clothing",
    "Cook an international dish",
    "Rewatch childhood cartoons",
    "Make a time capsule",
    "Build a paper airplane race",
    "Learn how to juggle",
    "Write a song or lyrics",
    "Explore urban street art",
    "Try indoor gardening",
    "Do charity work or volunteering",
    "Go to a food festival",
    "Host a game night",
    "Learn to do magic tricks",
    "Build a blanket fort",
    "Try making pottery",
    "Research family genealogy",
    "Ride a horse",
    "Go thrift shopping",
    "Make homemade candles",
    "Solve a crossword puzzle",
    "Start a blog",
    "Try painting with watercolors",
    "Create a stop-motion animation",
    "Write down your dreams",
    "Try a martial arts class",
    "Build a playlist based on a mood",
    "Take an afternoon tea break",
    "Practice deep breathing exercises",
    "Play in a virtual reality game",
    "Learn sign language",
    "Try wild swimming (if safe)",
    "Go camping in your backyard",
    "Make a DIY face mask",
    "Join a local book club",
    "Learn how to sew",
    "Watch live theater or an improv show",
    "Try archery"
  ]

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
      <button className='btn bg-purple' onClick={() => setIsEditing(true)}>Edit (omg try the new ✨AI✨)</button>
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
      <span>Now with ✨AI✨</span>
      <pre className='not-so-hidden-subtitle'>Just like everything else...</pre>
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

          <button className='btn flow-button' onClick={() => {
            let generated = '';
            for(let i = 0; i < 10; i++){
 const randomInt = Math.floor(Math.random() * activities.length);
    const pickedItem = activities[randomInt];
    generated += pickedItem + '\n'
                }
                    setNewItem(generated);
            
          }}>Generate with ✨AI✨</button>
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


    </div>

  );
}

export default App
