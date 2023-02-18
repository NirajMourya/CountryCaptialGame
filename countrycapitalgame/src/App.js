import { useEffect, useState } from 'react';
import './App.css';
import PlaceList from './PlaceList/PlaceList';
import axios from "axios"
import { BASE_URL } from './config/config';

function App() {
  const [loader,setLoader] = useState(true);
  const [timer, setTimer] = useState(10);
  const [countryData,setCountryData] = useState(null)
  
  useEffect(() => {
    fetchData();
  },[])

  const fetchData = () => {
      setLoader(true);
      axios.get(BASE_URL).then((response) =>{
            if(response.data){
                let data = response.data.data;
                let tempArray = {}
                for(let i = 0;i<data.length;i++)
                { 
                  if(data[i].capital)
                    tempArray[data[i].name] = data[i].capital
                }
                console.log(data);
                setCountryData(tempArray);
            }
            setLoader(false);
      })
  }
  return (
    <div className="App">
         { 
             loader ? "Loading....":  <PlaceList data={countryData} />
         }
    </div>
  );
}

export default App;
