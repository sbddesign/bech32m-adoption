import support from '../support.json'
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
      case 'planned':
        return <InfoIcon className={classes} aria-hidden="true" />
    }
  }
  
  return(
    <div className="w-full overflow-x-scroll md:overflow-x-auto py-4">
      <table className="w-full mx-auto text-xs lg:text-base">
        <thead className="font-display">
          <tr>
            <th className="font-normal border border-slate-400 p-2 p-2 min-w-[148px] text-left">
              Name
            </th>
            <th className="font-normal border border-slate-400 p-2 min-w-[100px]">
              <SendIcon className="w-4 h-4 md:w-6 md:h-6 mx-auto md:inline" aria-hidden="true" /> Send to Bech32m
            </th>
            <th className="font-normal border border-slate-400 p-2 p-2 min-w-[100px]">
              <ReceiveIcon className="w-4 h-4 md:w-6 md:h-6 mx-auto md:inline" aria-hidden="true" /> Receive to P2TR
            </th>
            <th className="font-normal border border-slate-400 p-2 min-w-[80px]">
              Issue Link
            </th>
            <th className="font-normal border border-slate-400 p-2 min-w-[148px]">
              Credit
            </th>
          </tr>
        </thead>
        <tbody>
        {support.map((s, key)=>(
          <tr key={key}>
            <td className="border border-slate-400 p-2">
              {s.wallet.name}
            </td>
            <td className={"status-" + s.send_bech32m + " border border-slate-400 p-2 text-center"}>
              <div className="flex justify-center items-center w-full h-full">
                {selectIcon(s.send_bech32m)}
                <span>
                  {s.send_bech32m.substring(0,1).toUpperCase() + s.send_bech32m.substring(1).toLowerCase()}
                </span>
              </div>
            </td>
            <td className={"status-" + s.receive_p2tr + " border border-slate-400 p-2 text-center"}>
              <div className="flex justify-center items-center w-full h-full">
                {selectIcon(s.receive_p2tr)}
                <span>
                  {s.receive_p2tr.substring(0,1).toUpperCase() + s.receive_p2tr.substring(1).toLowerCase()}
                </span>
              </div>
            </td>
            <td className="border border-slate-400 p-2 text-center">
              <a href={s.issue_link}>Issue</a>
            </td>
            <td className="border border-slate-400 p-2 text-center">
              <a href={s.credit.uri}>{s.credit.name}</a>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}