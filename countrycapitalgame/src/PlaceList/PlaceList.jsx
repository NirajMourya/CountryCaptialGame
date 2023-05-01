import React,{useState,useEffect} from "react";

export default function PlaceList({ data }) {
    const [state,setState] = useState({
        "country":"",
        "capital":"",
        "wrongData":false,
    })
    const [displayButtons,setDisplayButtons] = useState([])

    useEffect(() =>{
       shuffleData(data)
    },[])

    const shuffleData = (dataArray) =>{
         let tempArray = []
        Object.keys(dataArray).map((key) =>{
             console.log(key);
             tempArray.push(key)
             tempArray.push(dataArray[key])
         })
        tempArray.sort(() => Math.random() - 0.5)
         setDisplayButtons([...tempArray])
    }
    const add = (val) => 
    {
        var filterData = [];
        if(state.country && state.country != val && !state.wrongData)
        {
             if(data[state.country] === val )
             {
                setState({wrongData:false})
                filterData = displayButtons.filter((a) => {
                      return  a !== val && a !== state.country
                })
                setDisplayButtons([...filterData])
             } 
             else
                setState({wrongData:true,country:state.country,capital:val})
        }
        else if(state.capital && state.capital != val && !state.wrongData)
        {
             if(data[val] === state.capital )
             {  
                 setState({wrongData:false})
                 filterData = displayButtons.filter((a) => {
                      return  a !== val && a !== state.capital
                 })
                 setDisplayButtons([...filterData])
             }
             else
                setState({wrongData:true,country:val,capital:state.capital})
        }
        else{
             if(val in data)
             {
                setState({country:val})
             }
             else
             {
                setState({capital:val}) 
             }
        }
    } 
    return (<div>{displayButtons.length ? 
             ( 
                 displayButtons.map( (value) => 
                    (<button 
                    style = {
                        ((state.country === value  ||  state.capital === value) && state.wrongData)? {backgroundColor: "#ff0000"}: 
                        ((state.country === value && !state.capital) || (!state.country && state.capital === value ))  ?
                        {backgroundColor: "#0000ff"} :{}
                    }
                       onClick={
                       () => {
                          add(value)
                       } 
                    }>{value}</button>)
                 )
             ):
             (<span>Congratulations</span>)   
    }</div>);
}