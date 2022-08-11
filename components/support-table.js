import support from '../support.json'

export default function SupportTable() {
  return(
    <table>
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Send to Bech32m
          </th>
          <th>
            Receive to P2TR
          </th>
          <th>
            Issue Link
          </th>
          <th>
            Credit
          </th>
        </tr>
      </thead>
      <tbody>
      {support.map((s)=>(
        <tr>
          <td>
            {s.wallet.name}
          </td>
          <td>
            {s.send_bech32m}
          </td>
          <td>
            {s.receive_p2tr}
          </td>
          <td>
            <a href={s.issue_link}>Issue</a>
          </td>
          <td>
            <a href={s.credit.uri}>{s.credit.name}</a>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}