import { useEffect, useState } from 'react';
import './App.css';
import PlaceList from './PlaceList/PlaceList';
import axios from "axios"
import { BASE_URL } from './config/config';

const COUNTRYCOUNT = 5;
function App() {
  const [loader,setLoader] = useState(true);
  const [countryData,setCountryData] = useState(null);
  const [level,setLevel] = useState(1);  
  useEffect(() => {
    fetchData();
  },[])

  function handlelevelCompleted()
  {
     setLevel((prevLevel) => prevLevel+1);
  }
  
  const fetchData = () => {
      setLoader(true);
      axios.get(BASE_URL).then((response) =>{
            if(response.data){
                let data = response.data.data;
                let tempArray = new Array();
                for(let i = 0;i<data.length;i++)
                { 
                  let countryData = data[i];
                  if(countryData.capital)
                  {
                     let tempObject = {
                      'CountryName': countryData["name"],
                      'CapitalCity':countryData["capital"]
                     };
                     tempArray.push(tempObject);   
                  }   
                }
                tempArray.sort(() => Math.random() - 0.5)
                setCountryData(tempArray);
            }
            setLoader(false);
      })
  }
  return (
    <>
      <div>
          { 
              loader ? "Loading....":  
              (
                <>
                <h2>Level {level}</h2>
                <PlaceList data={countryData.slice((level-1)*COUNTRYCOUNT,level*COUNTRYCOUNT)} handlelevelCompleted={handlelevelCompleted}/>
                </>)
          }
      </div>
    </>
  );
}

export default App;
