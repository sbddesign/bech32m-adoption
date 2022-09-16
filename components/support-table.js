import support from '../data/formatted/support.json'
import {CheckIcon, CrossIcon, InfoIcon, QuestionIcon, SendIcon, ReceiveIcon, AlertIcon, WalletIcon} from '@bitcoin-design/bitcoin-icons-react/filled';
import {UserIcon} from '@heroicons/react/solid';
import parse from 'html-react-parser';

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
  
  const sortTableData = (support) => {
    let sorted = support.sort((a,b) => {
      let a1 = a.wallet.name.toLowerCase()
      let b1 = b.wallet.name.toLowerCase()
      return a1 < b1 ? -1 : a1 > b1 ? 1 : 0
    })
    return sorted
  }
  
  let sorted = sortTableData(support)
  
  return(
    <div className="w-full overflow-x-scroll md:overflow-x-auto py-4">
      <table className="support w-full mx-auto text-xs 2xl:text-base">
        <thead className="font-display relative z-50">
          <tr>
            <th className="bg-white font-normal p-2 p-2 min-w-[160px] max-w-[240px] text-left">
              <WalletIcon className="w-4 h-4 md:w-6 md:h-6 block md:inline" aria-hidden="true" /> Name
            </th>
            <th className="bg-white font-normal p-2 min-w-[160px] max-w-[180px]">
              <SendIcon className="w-4 h-4 md:w-6 md:h-6 mx-auto md:inline" aria-hidden="true" /> Send to Bech32m
            </th>
            <th className="bg-white font-normal p-2 p-2 min-w-[160px] max-w-[180px]">
              <ReceiveIcon className="w-4 h-4 md:w-6 md:h-6 mx-auto md:inline" aria-hidden="true" /> Receive to P2TR
            </th>
            <th className="bg-white font-normal p-2 min-w-[80px] max-w-[100px]">
              <AlertIcon className="w-4 h-4 md:w-6 md:h-6 mx-auto md:inline" aria-hidden="true" /> Issue Link
            </th>
            <th className="bg-white font-normal p-2 min-w-[148px] max-w-[200px]">
              <UserIcon className="w-4 h-4 md:w-6 md:h-6 mx-auto md:inline" aria-hidden="true" /> Credit
            </th>
            <th className="bg-white font-normal p-2 min-w-[148px]">
              <InfoIcon className="w-4 h-4 md:w-6 md:h-6 mx-auto md:inline" aria-hidden="true" /> Notes
            </th>
          </tr>
        </thead>
        <tbody>
        {sorted.map((s, key)=>(
          <tr key={key} className="even:bg-gray-50">
            <td className="font-bold min-w-[160px] max-w-[240px]">
              {s.wallet.uri ? <a href={s.wallet.uri}>{s.wallet.name}</a> : s.wallet.name}
            </td>
            <td className={"status-" + s.send_to_bech32m.status + " min-w-[160px] max-w-[180px]"}>
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
            <td className="min-w-[160px] max-w-[180px]">
              <div className="flex justify-center items-center w-full h-full">
                {selectIcon(s.receive_to_p2tr.status)}
                <span className="sr-only">
                  {s.receive_to_p2tr.status.substring(0,1).toUpperCase() + s.receive_to_p2tr.status.substring(1).toLowerCase()}
                </span>
              </div>
            </td>
            <td className="min-w-[80px] max-w-[100px]">
              {s.issue_link ? <a href={s.issue_link}>Issue</a> : '' }
            </td>
            <td className="min-w-[148px] max-w-[200px]">
              <a href={s.credit.uri}>{s.credit.name}</a>
            </td>
            <td className="max-w-[200px] text-left">
              {s.notes && s.notes.status ? parse(s.notes.status) : ''}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}