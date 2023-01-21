import { gmail_v1 } from '@googleapis/gmail'

const getMessageText = (message: gmail_v1.Schema$Message): string => {
  let message_text_value: string

  if (message.payload?.parts?.find(
    (value) => value.mimeType === 'multipart/alternative',
  )) {
    message_text_value = message.payload?.parts?.find(
      (value) => value.mimeType === 'multipart/alternative',
    )?.parts?.find(
      (value) => value.mimeType === 'text/plain',
    )?.body?.data as string
  } else {
    message_text_value = message.payload?.parts?.find(
      (value) => value.mimeType === 'text/plain',
    )?.body?.data as string
  }

  return message_text_value
}

export default getMessageText
