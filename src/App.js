import React,{useState} from 'react';
import './index.css';
import Main from './component/Main/Main';
import Header from './component/Header/Header';

function App() {
  const [main,setMain] = useState("");

  const searchSummoner = (summonerName)=>{
    setMain(<Main
      summonerName={summonerName}
    />);
  }

  return (
    <div className="App">
      <Header 
        search={searchSummoner}
      />
      {main}
    </div>
  );
}



export default App;
