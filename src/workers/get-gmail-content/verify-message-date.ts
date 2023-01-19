import { gmail_v1 } from '@googleapis/gmail'

const verifyMessageDate = (message: gmail_v1.Schema$Message): string | undefined => {
  let message_date_value: string | undefined

  const message_date = message.payload?.headers?.find((value) => value.name === 'Date')

  if (!message_date) {
    message_date_value = undefined
  } else {
    const date = new Date(message_date?.value as string)
    date.setHours(date.getHours() - 3)

    message_date_value = date.toISOString()
  }

  return message_date_value
}

export default verifyMessageDate
