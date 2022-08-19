import support from '../data/formatted/all.json'
import {CheckIcon, CrossIcon, InfoIcon, QuestionIcon, SendIcon, ReceiveIcon} from '@bitcoin-design/bitcoin-icons-react/filled';

export default function SupportTable() {
  const selectIcon = (status, classes) => {
    classes = classes ? classes : "w-6 h-6 inline"
    
    switch(status) {
      case 'yes':
        return <CheckIcon className={classes} aria-hidden="true" />
        break
      case 'no':
        return <CrossIcon className={classes} aria-hidden="true" />
        break
      case 'unknown':
        return <QuestionIcon className={classes} aria-hidden="true" />
        break
      case 'evaluating':
        return <QuestionIcon className={classes} aria-hidden="true" />
        break
      case 'planned':
        return <InfoIcon className={classes} aria-hidden="true" />
    }
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
      <table className="w-full mx-auto text-xs 3xl:text-base">
        <thead className="font-display">
          <tr>
            <th className="font-normal border border-slate-400 p-2 p-2 min-w-[148px] text-left">
              Name
            </th>
            <th className="font-normal border border-slate-400 p-2 min-w-[60px]">
              <SendIcon className="w-4 h-4 md:w-6 md:h-6 mx-auto md:inline" aria-hidden="true" /> Send to Bech32m
            </th>
            <th className="font-normal border border-slate-400 p-2 p-2 min-w-[60px]">
              <ReceiveIcon className="w-4 h-4 md:w-6 md:h-6 mx-auto md:inline" aria-hidden="true" /> Receive to P2TR
            </th>
            <th className="font-normal border border-slate-400 p-2 min-w-[80px]">
              Issue Link
            </th>
            <th className="font-normal border border-slate-400 p-2 min-w-[148px]">
              Credit
            </th>
            <th className="font-normal border border-slate-400 p-2 min-w-[148px] max-w-[200px]">
              Notes
            </th>
          </tr>
        </thead>
        <tbody>
        {sorted.map((s, key)=>(
          <tr key={key}>
            <td className="border border-slate-400 font-bold p-2">
              {s.wallet.uri ? <a href={s.wallet.uri}>{s.wallet.name}</a> : s.wallet.name}
            </td>
            <td className={"status-" + s.send_to_bech32m.status + " border border-slate-400 p-2 text-center"}>
              <div className="flex justify-center items-center align-center w-full h-full flex-wrap mb-1">
                {selectIcon(s.send_to_bech32m.status)}
                <p className="font-bold text-left">
                  {s.send_to_bech32m.status.substring(0,1).toUpperCase() + s.send_to_bech32m.status.substring(1).toLowerCase()}
                </p>
              </div>
                <p className="basis-1/1">
                  {s.send_to_bech32m.detail}
                </p>
            </td>
            <td className={"status-" + s.receive_to_p2tr.status + " border border-slate-400 p-2 text-center"}>
              <div className="flex justify-center items-center w-full h-full">
                {selectIcon(s.receive_to_p2tr.status)}
                <span>
                  {s.receive_to_p2tr.status.substring(0,1).toUpperCase() + s.receive_to_p2tr.status.substring(1).toLowerCase()}
                </span>
              </div>
            </td>
            <td className="border border-slate-400 p-2 text-center">
              <a href={s.issue_link}>Issue</a>
            </td>
            <td className="border border-slate-400 p-2 text-center">
              <a href={s.credit.uri}>{s.credit.name}</a>
            </td>
            <td className="border border-slate-400 p-2 text-center max-w-[200px] overflow-hidden">
              {s.notes && s.notes.status ? s.notes.status : ''}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}