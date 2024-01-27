import React,{useState,useEffect} from "react";

export default function PlaceList({ data,handlelevelCompleted }) {
    const [state,setState] = useState({
        "country":"",
        "capital":"",
        "wrongData":false,
    })
    const [displayButtons,setDisplayButtons] = useState([])

    useEffect(() =>{
       shuffleData(data)
    },[data])

    const shuffleData = (dataArray) =>{
        let tempArray = []
        dataArray.map((place) =>{
             tempArray.push(place['CountryName'])
             tempArray.push(place['CapitalCity'])
         })
        tempArray.sort(() => Math.random() - 0.5)
         setDisplayButtons([...tempArray])
    }
    const add = (val) => 
    {
        debugger;
        var filterData = [];
        if(state.country && state.country !== val && !state.wrongData)
        {
            let country = data.filter(function (o) {
               return o.CountryName   === state.country;
            });
             if(country[0].CapitalCity === val )
             {
                setState({wrongData:false})
                filterData = displayButtons.filter((a) => {
                      return  a !== val && a !== state.country
                })
                if(filterData.length === 0)
                  handlelevelCompleted();
                else
                  setDisplayButtons([...filterData])
             } 
             else
                setState({wrongData:true,country:state.country,capital:val})
        }
        else if(state.capital && state.capital !== val && !state.wrongData)
        {
            let country = data.filter(function (o) {
               return o.CapitalCity   === state.capital;
            });
             if(country[0].CountryName === val )
             {  
                 setState({wrongData:false})
                 filterData = displayButtons.filter((a) => {
                      return  a !== val && a !== state.capital
                 })
                 if(filterData.length === 0)
                  handlelevelCompleted();
                 else
                  setDisplayButtons([...filterData])
             }
             else
                setState({wrongData:true,country:val,capital:state.capital})
        }
        else{
            
            let countryExists = data.filter(function (o) {
               return o.CountryName   === val;
            });
             if(countryExists.length > 0)
             {
                setState({country:val})
             }
             else
             {
                setState({capital:val}) 
             }
        }
    } 
    return (<div className="places">{displayButtons.length ? 
             ( 
                 displayButtons.map( (value,index) => 
                    (<button 
                      key = {index}
                    className = {
                        ((state.country === value  ||  state.capital === value) && state.wrongData)? "wrong": 
                        ((state.country === value && !state.capital) || (!state.country && state.capital === value ))  ?
                        "selected" :{}
                    }
                       onClick={
                       () => {
                          add(value)
                       } 
                    }>{value}</button>)
                 )
             ):
             (<span>Congratulations!!</span>)   
    }</div>);
}