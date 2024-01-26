import { useEffect, useState } from 'react';
import './App.css';
import PlaceList from './PlaceList/PlaceList';
import axios from "axios"
import { BASE_URL } from './config/config';

function App() {
  const [loader,setLoader] = useState(true);
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

                setCountryData(tempArray);
            }
            setLoader(false);
      })
  }
  return (
    <>
      <div>
          { 
              loader ? "Loading....":  <PlaceList data={countryData} />
          }
      </div>
    </>
  );
}

export default App;
