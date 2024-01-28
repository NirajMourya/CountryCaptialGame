import { useEffect, useState } from 'react';
import './App.css';
import PlaceList from './components/PlaceList';
import axios from "axios"
import { BASE_URL } from './config/config';
import Congratulations from './components/Congratulations';

const COUNTRYCOUNT = 20;
function App() {
  const [gameStatus,setGameStatus] = useState({
     level:1,
     countryData:[]
  })
  useEffect(() => {
    fetchData();
  },[])

  function handlelevelCompleted()
  {
    setGameStatus((prevGameStatus) => {
       return {
        ...prevGameStatus,
        level:prevGameStatus.level +1
       }
    });
  }
  
  const fetchData = () => {
      axios.get(BASE_URL).then((response) =>{
            if(response.data){
                let data = response.data.data;
                let tempArray = new Array();
                for(let i = 0;i<data.length;i++)
                { 
                  let countryData = data[i];
                  if(countryData.capital)
                  {
                     let CapitalCity = countryData["capital"];
                     if(countryData["capital"] === countryData["name"])
                       CapitalCity = countryData["capital"] + " City";
                    
                     let tempObject = {
                      'CountryName': countryData["name"],
                      'CapitalCity': CapitalCity
                     };
                     tempArray.push(tempObject);   
                  }   
                }
                tempArray.sort(() => Math.random() - 0.5)
                setGameStatus({
                   countryData:tempArray,
                   level:1
                });
            }
      })
  }
 
  return (
    <>
      <div>
          { 
              gameStatus.countryData.length === 0 ? (<p className='level'>Loading....</p>):
              ((gameStatus.level - 1)*COUNTRYCOUNT) > gameStatus.countryData.length ?
              <Congratulations />:
              (
                <>
                <h2 className='level'>Level {gameStatus.level}</h2>
                <PlaceList data={gameStatus.countryData.slice((gameStatus.level-1)*COUNTRYCOUNT,gameStatus.level*COUNTRYCOUNT)} handlelevelCompleted={handlelevelCompleted}/>
                </>
              )                            
          }
      </div>
    </>
  );
}

export default App;
