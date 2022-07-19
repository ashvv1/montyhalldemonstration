import logo from './logo.svg';
import './App.css';

function App() {

  let gameActive = false;
  let prizeDoor = 0;
  let changedWin = 0;
  let keptWin = 0;
  let changed = 0;
  let kept = 0;
  let selectedDoor = 0;


  const playGame = () =>{
    prizeDoor = Math.floor(Math.random()*3) + 1;
    for(let i=0; i<document.getElementsByClassName('prize').length; i++){
      document.getElementsByClassName('prize')[i].innerHTML = "<img src='https://static.wixstatic.com/media/2cd43b_fd83057382f54e30ab0ea31d6f60face~mv2.png/v1/fill/w_320,h_254,q_90/2cd43b_fd83057382f54e30ab0ea31d6f60face~mv2.png' alt='car' width='500' height='500'>"
    };
    document.getElementById(`prize${prizeDoor.toString()}`).innerHTML = "<img src='https://vectorforfree.com/wp-content/uploads/2019/04/BMW_Car_PNG_VectorForFree.jpg' alt='car' width='500' height='500'>"
    gameActive = true;
    document.getElementById('playbutton').style.display = 'none';
    document.getElementById('status').innerHTML = ``;
    document.getElementById('status').style.display = 'none'
    selectedDoor = 0;
  }

  const reset = () => {
    for(let i=0; i<document.getElementsByClassName('door').length; i++){
      document.getElementsByClassName('door')[i].style.visibility = 'visible';
    };
    for(let i=0; i<document.getElementsByClassName('door').length; i++){
      document.getElementsByClassName('door')[i].style.border = '';
    };
    playGame();

  }

  const endGame = () => {
    gameActive = false;
    document.getElementById('status').innerHTML = `GAME OVER`
    document.getElementById('status').style.display = 'inline'
  }

  const selectDoor = (e) => {
    if(gameActive){
    if (selectedDoor == 0){
    document.getElementById(e.target.id).style.border = '.5vw solid yellow';
    selectedDoor = parseInt(e.target.innerHTML);
    for(let i=0; i<document.getElementsByClassName('door').length; i++){
      if(document.getElementsByClassName('door')[i].innerHTML != prizeDoor.toString() && document.getElementsByClassName('door')[i].innerHTML != selectedDoor){
        document.getElementsByClassName('door')[i].style.visibility = 'hidden';
        break;
      };
    };
  }else if(selectedDoor != 0){
    document.getElementById(e.target.id).style.visibility = 'hidden';
    console.log(`${e.target.innerHTML}, ${selectedDoor}`)
      if (parseInt(e.target.innerHTML) == selectedDoor){
        kept++;
        if (prizeDoor == parseInt(e.target.innerHTML)){
          keptWin++;
          document.getElementById('keptPerc').innerHTML = `${(keptWin/kept)*100}`
        }else{
          document.getElementById('keptPerc').innerHTML = `${(keptWin/kept)*100}`
        }
        document.getElementById('timeskept').innerHTML = `${kept}`;
      } else {
        changed++;
        if (prizeDoor == parseInt(e.target.innerHTML)){
          changedWin++
          document.getElementById('changedPerc').innerHTML = `${(changedWin/changed)*100}`
        }
        else{
          document.getElementById('changedPerc').innerHTML = `${(changedWin/changed)*100}`
        }
        document.getElementById('timeschanged').innerHTML = `${changed}`;
      }
      endGame();
    }
    
  };
}
  
  return (
    <div className="App">
     <header>
       <h1>Montey Hall Problem</h1>
       </header>
       <div className = 'body'>
       <button id = 'playbutton' onClick= {playGame}>PLAY</button>
       <button id = 'reset' onClick= {reset}>RESET</button>
         <div className = 'doors'>
         <div id = 'status'></div>
           <div onClick = {(e) => selectDoor(e)} id ='door1' className = "door">
             1
           </div>
           <div className = 'prize' id = 'prize1'></div>
           <div onClick = {(e) => selectDoor(e)} id = 'door2' className = "door">
             2
           </div>
           <div className = 'prize' id = 'prize2'></div>
           <div onClick = {(e) => selectDoor(e)} id = 'door3' className = "door">
             3
           </div>
           <div className = 'prize' id = 'prize3'></div>
         </div>
         <div className = 'results'>
           <div>Changed Answer: <span id='changedPerc'></span>% Win /<span id='timeschanged'></span>times</div> 
           <br>
           </br>
           <div>Kept Answer: <span id='keptPerc'></span>% Win /<span id='timeskept'></span>times</div>
         </div>
       </div>
     
    </div>
  );
}

export default App;
