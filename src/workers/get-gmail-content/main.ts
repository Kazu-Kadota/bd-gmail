import { gmail_v1 } from '@googleapis/gmail'

import { MessageContent } from 'src/models/message'

import getAuthorization from '../../services/gcp/authorization'
import listMessages from '../../services/gcp/list-messages'

import messageContentConstructor from './message-content-constructor'

const message_list: gmail_v1.Schema$Message[] = []
const message_content: MessageContent[] = []
const message_content_error = []

const getGmailContentWorker = async (): Promise<MessageContent[]> => {
  let page_token: string | null | undefined

  let credentials = await getAuthorization()

  do {
    if (credentials.expiry_date && credentials.expiry_date + 60000 < Date.now()) {
      credentials = await getAuthorization()
    }

    if (!credentials.access_token) {
      continue
    }

    const { messages, nextPageToken } = await listMessages(credentials.access_token, page_token)

    messages?.map((message_object): void => {
      message_list.push(message_object)

      return undefined
    })

    page_token = nextPageToken
  } while (page_token !== '14728852835494825608')

  for (const message_object of message_list) {
    if (credentials.expiry_date && credentials.expiry_date + 60000 < Date.now()) {
      credentials = await getAuthorization()
    }

    try {
      const message = await messageContentConstructor(credentials.access_token, message_object.id)

      message_content.push(message)
    } catch (e) {
      message_content_error.push(e)
    }
  }

  return message_content
}

getGmailContentWorker().then(console.log)
