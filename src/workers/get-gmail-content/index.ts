import { writeFile } from 'fs'

import stringToIsodate from '../../utils/string-to-isodate'

import getGmailContentWorker from './main'

const handler = async () => {
  const messages = await getGmailContentWorker()

  messages.map((message) => {
    let date
    if (!message.payload) {
      date = Date.now()
    } else {
      date = stringToIsodate(message.payload?.headers?.date as string) + '-' + Date.now().toString()
    }
    const path = `src/json/${date}.json`

    writeFile(path, JSON.stringify(message), 'utf8', function (err) {
      if (err) {
        console.log('An error occured while writing JSON Object to File.')
        return console.log(err)
      }
      console.log('JSON file has been saved.')
    })

    return undefined
  })
}

handler().then()
