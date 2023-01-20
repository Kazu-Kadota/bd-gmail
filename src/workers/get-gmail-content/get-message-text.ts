import { gmail_v1 } from '@googleapis/gmail'

const getMessageText = (message: gmail_v1.Schema$Message): string | undefined => {
  let message_text_value: string | undefined

  const message_text = message.payload?.parts?.find(
    (value) => value.mimeType === 'text/plain',
  )?.body?.data

  // console.log('Message: Payload parts get message text')
  // console.log(message.payload?.parts)

  // console.log('Message: message_text')
  // console.log(message_text)

  if (!message_text) {
    message_text_value = undefined
  } else {
    message_text_value = message_text as string
  }

  return message_text_value
}

export default getMessageText
