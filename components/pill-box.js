import support from '../data/formatted/support.json'
import React from 'react';

export default function PillBox(props) {
  const sortTableData = () => {
    let sorted = support.sort((a,b) => {
      let a1 = a.wallet.name.toLowerCase()
      let b1 = b.wallet.name.toLowerCase()
      return a1 < b1 ? -1 : a1 > b1 ? 1 : 0
    })
    
    if(props.metric === 'bech32m_sends_yes') sorted = sorted.filter(object => object.send_to_bech32m.status === "yes")
    else if(props.metric === 'bech32m_sends_no') {
      sorted = sorted.filter(object => object.send_to_bech32m.status !== "yes")
      setBgColor('bg-red')
      setFgColor('bg-red-light')
    }
    
    setSorted(sorted)
    return sorted
  }
  
  const [sorted, setSorted] = React.useState([])
  
  const [bgColor, setBgColor] = React.useState('bg-green')

  const [fgColor, setFgColor] = React.useState('bg-green-light')
  
  const [activeFilter, setActiveFilter] = React.useState(props.metric)
  
  React.useEffect(()=>{
    sortTableData()
  }, [activeFilter])
  
  return(
    <div className={bgColor + " rounded-xl p-2 md:p-4"}>
      <ul className="flex flex-row flex-wrap">
        {sorted.map((s, key)=>(
          <li className={fgColor + " text-sm p-2 m-1 md:m-2 rounded-xl"}>
            {s.wallet.uri ? <a href={s.wallet.uri}>{s.wallet.name}</a> : s.wallet.name}
          </li>
        ))}
      </ul>
    </div>
  )
}