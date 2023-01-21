import { writeFile } from 'fs'

import getGmailContentWorker from './main'

const handler = async () => {
  const messages = await getGmailContentWorker()

  messages.map((message) => {
    let filename
    if (!message.payload) {
      filename = Date.now()
    } else {
      filename = message.id + '-' + (Date.now()).toString()
    }
    const path = `src/json/${filename}.json`

    writeFile(path, JSON.stringify(message), 'utf8', function () {})

    return undefined
  })
}

handler().then()
