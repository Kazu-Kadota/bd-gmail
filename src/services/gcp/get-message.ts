import { gmail_v1 } from '@googleapis/gmail'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const GCP_GMAIL_ENDPOINT = process.env.GCP_GMAIL_ENDPOINT
const GMAIL_ACCOUNT = process.env.GMAIL_ACCOUNT

const getMessage = async (access_token: string, message_id: string) => {
  const { data } = await axios<gmail_v1.Schema$Message>({
    method: 'GET',
    url: `${GCP_GMAIL_ENDPOINT}/users/${GMAIL_ACCOUNT}/messages/${message_id}`,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  return data
}

export default getMessage
