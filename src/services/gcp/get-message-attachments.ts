import { gmail_v1 } from '@googleapis/gmail'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const GCP_GMAIL_ENDPOINT = process.env.GCP_GMAIL_ENDPOINT
const GMAIL_ACCOUNT = process.env.GMAIL_ACCOUNT

const getMessageAttachments = async (
  access_token: string,
  message_id: string,
  attachment_id: string,
): Promise<string> => {
  const { data } = await axios<gmail_v1.Schema$MessagePartBody>({
    method: 'GET',
    url: `${GCP_GMAIL_ENDPOINT}/users/${GMAIL_ACCOUNT}/messages/${message_id}/attachments/${attachment_id}`,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  return data.data as string
}

export default getMessageAttachments
