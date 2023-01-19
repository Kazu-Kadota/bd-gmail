import { gmail_v1 } from '@googleapis/gmail'
import axios from 'axios'
import dotenv from 'dotenv'

// import getAuthorization from './authorization'

dotenv.config()

const GCP_GMAIL_ENDPOINT = process.env.GCP_GMAIL_ENDPOINT
const GMAIL_ACCOUNT = process.env.GMAIL_ACCOUNT

const listMessages = async (access_token: string, nextPageToken: string | null | undefined): Promise<gmail_v1.Schema$ListMessagesResponse> => {
  // const access_token = await getAuthorization()

  let url = `${GCP_GMAIL_ENDPOINT}/users/${GMAIL_ACCOUNT}/messages`

  if (nextPageToken) {
    url = `${GCP_GMAIL_ENDPOINT}/users/${GMAIL_ACCOUNT}/messages?pageToken=${nextPageToken}`
  }

  const { data } = await axios<gmail_v1.Schema$ListMessagesResponse>({
    method: 'GET',
    url,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  return data
}

export default listMessages
