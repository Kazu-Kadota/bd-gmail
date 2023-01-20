import { MessageContent } from 'src/models/message'

import getMessage from '../../services/gcp/get-message'

import decodeMessageText from './decode-message-text'
import getMessageText from './get-message-text'
import verifyMessageDate from './verify-message-date'
import verifyMessageFrom from './verify-message-from'

const messageContentConstructor = async (
  access_token: string | null | undefined,
  message_id: string | null | undefined,
): Promise<MessageContent> => {
  if (!access_token || !message_id) {
    return {
      id: message_id as string | undefined,
    }
  }

  const message = await getMessage(access_token, message_id)

  if (message.labelIds?.find((value) => value === 'CATEGORY_PERSONAL')) {
    // console.log('Message: Payload')
    // console.log(message.payload)

    const from = verifyMessageFrom(message)

    const date = verifyMessageDate(message)

    const text_encoded = getMessageText(message)

    // console.log('Message: Text encoded')
    // console.log(text_encoded)

    const text_decoded = decodeMessageText(text_encoded)

    return {
      id: message.id as string,
      snippet: message.snippet as string,
      payload: {
        headers: {
          from,
          date,
        },
        body: {
          base64: text_encoded,
          content: text_decoded,
        },
      },
    }
  }

  return {
    id: message.id as string,
    description: 'It is not category personal email',
  }
}

export default messageContentConstructor
