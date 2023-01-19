import { gmail_v1 } from '@googleapis/gmail'

const verifyMessageFrom = (message: gmail_v1.Schema$Message): string | undefined => {
  let message_from_value: string | undefined

  const message_from = message.payload?.headers?.find((value) => value.name === 'From')
  if (!message_from) {
    message_from_value = undefined
  } else {
    message_from_value = message_from?.value as string
  }

  return message_from_value
}

export default verifyMessageFrom
