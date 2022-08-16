const fs = require('fs');
const {entries} = require('next/dist/server/dev/on-demand-entry-handler');
const args = require('minimist')(process.argv.slice(2))

fs.readFile(args['i'], 'utf8', (err,data)=>{
  if(err) {
    console.log(err);
  }
  if(data) {
    // Remove |- lines
    let string = data.replace(/\|\-x*\n/g, '');
    
    // Split remaining lines into an array
    let lines = string.split('\n');
    let entries = [];
    
    // Process the array of lines
    lines.forEach((line)=>{
      // Split each line by column
      const rawLine = line.split(' || ')
      let formattedLine = [];
      
      // Split each column into status and detail
      for(let i=0; i<rawLine.length; i++) {
        let columnObject ={}
        if(i<1) {
          if(rawLine[i].charAt(2) === '[' && rawLine[i].charAt(rawLine[i].length-1) === ']') {
            let trimmed = rawLine[i].replace(/\| /, '');
            let uri = trimmed.replace(/ .+]/, '').replace(/\[/, '');
            let name = trimmed.replace(/\[.+ /, '').replace(/\]/, '');
            console.log(uri);
            console.log(name);
            columnObject = {
              name,
              uri
            };
          }
          else {
            columnObject = {
              name: rawLine[i].replace(/\| /, '')
            };
          }
          formattedLine.push(columnObject);
          // formattedLine.push(rawLine[i].replace(/\| /, ''));
        }
        else {
          let trimmed = rawLine[i].replace(/[{}]/g, '');
          let column = trimmed.split('|');
          let columnObject = {
            status: column[0].toLowerCase()
          };
          if(column[1]) columnObject.detail = column[1];
          formattedLine.push(columnObject);
        }
      }
      
      let entry = {};
      if(formattedLine[0]) entry.wallet = formattedLine[0];
      if(formattedLine[1]) entry.send_to_bech32 = formattedLine[1];
      if(formattedLine[2]) entry.receive_to_p2wpkh_p2wsh = formattedLine[2];
      if(formattedLine[3]) entry.send_to_bech32m = formattedLine[3];
      if(formattedLine[4]) entry.receive_to_p2tr = formattedLine[4];
      if(formattedLine[5]) entry.notes = formattedLine[5];
      entry.credit = {
        name: "",
        uri: ""
      }
      entries.push(entry);
    });
    
    fs.writeFile('../data/formatted/software-wallets.json', JSON.stringify(entries), (err2)=>{
      console.log(err2);
      return;
    });
    
    console.log('Done!');
  }
})