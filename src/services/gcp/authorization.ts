import { AuthPlus } from '@googleapis/gmail'
import dotenv from 'dotenv'
import { Credentials } from 'google-auth-library'

dotenv.config()

const OAuth2 = new AuthPlus().OAuth2

const getAuthorization = async (): Promise<Credentials> => {
  const oauth2Client = new OAuth2(
    process.env.GCP_OAUTH_CLIENT_ID,
    process.env.GCP_OAUTH_SECRET_ID,
    'https://developers.google.com/oauthplayground',
  )

  oauth2Client.setCredentials({
    refresh_token: process.env.GCP_REFRESH_TOKEN,
  })

  await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject(new Error('Failed to create access token :( ' + err))
      }
      resolve(token as string)
    })
  }) as string

  return oauth2Client.credentials
}

// getAuthorization().then(console.log)
export default getAuthorization
