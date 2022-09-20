import support from '../data/formatted/support.json'
import {CheckIcon, CrossIcon, InfoIcon, QuestionIcon, SendIcon, ReceiveIcon, AlertIcon, WalletIcon} from '@bitcoin-design/bitcoin-icons-react/filled';
import {UserIcon, ListBulletIcon} from '@heroicons/react/24/outline'
import parse from 'html-react-parser';
import React from 'react';

export default function SupportTable() {
  const selectIcon = (status, classes) => {
    classes = classes ? classes : "w-6 h-6 inline"
    let icon
    
    switch(status) {
      case 'yes':
        icon = <CheckIcon className={classes + " status-yes"} aria-hidden="true" />
        break
      case 'no':
        icon = <CrossIcon className={classes} aria-hidden="true" />
        break
      case 'unknown':
        icon = <QuestionIcon className={classes} aria-hidden="true" />
        break
      case 'evaluating':
        icon = <QuestionIcon className={classes} aria-hidden="true" />
        break
      case 'planned':
        icon = <InfoIcon className={classes} aria-hidden="true" />
        break
    }
    
    return <div className={"icon status-" + status}>{icon}</div>
  }
  
  const sortTableData = () => {
    
    let sorted = support.sort((a,b) => {
      let a1 = a.wallet.name.toLowerCase()
      let b1 = b.wallet.name.toLowerCase()
      return a1 < b1 ? -1 : a1 > b1 ? 1 : 0
    })
    
    if(activeFilter === 'senders') sorted = sorted.filter(object => object.send_to_bech32m.status === "yes")
    else if(activeFilter === 'non-senders') sorted = sorted.filter(object => object.send_to_bech32m.status !== "yes")
    
    setSorted(sorted)
    return sorted
  }
  
  const [sorted, setSorted] = React.useState([])
  
  const [activeFilter, setActiveFilter] = React.useState('all')
  
  React.useEffect(()=>{
    sortTableData()
  }, [activeFilter])
  
  const filtersMenu = [
    {
      slug: "all",
      label: "All",
      icon: <ListBulletIcon className="w-6 h-6" />
    },
    {
      slug: "senders",
      label: "Supports sending",
      icon: <CheckIcon className="w-6 h-6" />
    },
    {
      slug: "non-senders",
      label: "Does not support sending",
      icon: <CrossIcon className="w-6 h-6" />
    }
  ]
  
  const handleFilterChange = (e) => {
    if(e.target.value) setActiveFilter(e.target.value)
  }
  
  return(
    <div className="w-full overflow-x-scroll md:overflow-x-auto py-4">
      
      <div className="flex flex-col space-y-4 text-sm md:space-y-0 md:flex-row lg:text-base items-center justify-center md:space-x-4 mx-auto mb-4">
        <label for="filters" className="font-bold">Filters</label>
        <ul className="justify-center flex-col space-y-4 flex md:space-y-0 md:flex-row md:space-x-8" id="filters">
          {filtersMenu.map((filter, key) => (
            <li className={((activeFilter === filter.slug) ? 'active ' : '') + 'flex flex-row space-x-2 cursor-pointer border border-slate-500 p-2 rounded overflow-hidden relative items-center'}>
              {filter.icon}
              <input type="radio" name="filters" id={'filter-' + filter.slug} value={filter.slug}
                     onChange={handleFilterChange}
                     className="cursor-pointer absolute left-0 top-0 w-full h-full opacity-0" />
              <label htmlFor={'filter-' + filter.slug} className="cursor-pointer">{filter.label}</label>
            </li>
          ))}
        </ul>
      </div>
      
      <table className="support w-full max-w-[1500px] mx-auto text-xs 2xl:text-base">
        <thead className="font-display relative z-50">
          <tr>
            <th className="min-w-[160px] lg:w-[200px] xl:w-[300px] 2xl:w-[400px] bg-white font-normal p-2 p-2 text-left">
              <WalletIcon className="w-4 h-4 md:w-6 md:h-6 block md:inline" aria-hidden="true" /> Name
            </th>
            <th className="min-w-[160px] lg:w-[160px] 2xl:w-[200px] bg-white font-normal p-2">
              <SendIcon className="w-4 h-4 md:w-6 md:h-6 mx-auto md:inline" aria-hidden="true" /> Send to Bech32m
            </th>
            <th className="min-w-[120px] lg:w-[180px] 2xl:w-[220px] bg-white font-normal p-2">
              <AlertIcon className="w-4 h-4 md:w-6 md:h-6 mx-auto md:inline" aria-hidden="true" /> Issue Link
            </th>
            <th className="min-w-[148px] lg:w-[180px] 2xl:w-[220px] bg-white font-normal p-2">
              <UserIcon className="w-4 h-4 md:w-6 md:h-6 mx-auto md:inline" aria-hidden="true" /> Credit
            </th>
            <th className="min-w-[200px] bg-white font-normal p-2">
              <InfoIcon className="w-4 h-4 md:w-6 md:h-6 mx-auto md:inline" aria-hidden="true" /> Notes
            </th>
          </tr>
        </thead>
        <tbody>
        {sorted.map((s, key)=>(
          <tr key={key} className="even:bg-gray-50">
            <td className="min-w-[160px] lg:w-[200px] xl:w-[300px] 2xl:w-[400px] font-bold">
              {s.wallet.uri ? <a href={s.wallet.uri}>{s.wallet.name}</a> : s.wallet.name}
            </td>
            <td className={"min-w-[160px] lg:w-[160px] 2xl:w-[200px] status-" + s.send_to_bech32m.status}>
              <div className="flex justify-center items-center align-center w-full h-full flex-wrap mb-1">
                {selectIcon(s.send_to_bech32m.status)}
                <p className="font-bold text-left sr-only">
                  {s.send_to_bech32m.status.substring(0,1).toUpperCase() + s.send_to_bech32m.status.substring(1).toLowerCase()}
                </p>
              </div>
                <p className="basis-1/1 hidden">
                  {s.send_to_bech32m.detail}
                </p>
            </td>
            <td className="min-w-[120px] lg:w-[180px] 2xl:w-[220px]">
              {s.issue_link ? <a href={s.issue_link}>Issue</a> : '' }
            </td>
            <td className="min-w-[148px] lg:w-[180px] 2xl:w-[220px]">
              <a href={s.credit.uri}>{s.credit.name}</a>
            </td>
            <td className="min-w-[200px] text-left">
              {s.notes && s.notes.status ? parse(s.notes.status) : ''}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}