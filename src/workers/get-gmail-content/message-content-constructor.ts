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

  const from = verifyMessageFrom(message)

  const date = verifyMessageDate(message)

  const text_encoded = getMessageText(message)

  const text_decoded = decodeMessageText(text_encoded)

  const message_content_object: MessageContent = {
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

  return message_content_object
}

export default messageContentConstructor
