import { gmail_v1 } from '@googleapis/gmail'

import { AttachmentContent } from 'src/models/message'

import getMessageAttachments from '../../services/gcp/get-message-attachments'
import base64ToPdf from '../../utils/base64-pdf'

const getMessageAttachmentAdapter = async (access_token: string, message: gmail_v1.Schema$Message): Promise<AttachmentContent[] | undefined> => {
  const payload_parts: gmail_v1.Schema$MessagePart[] | undefined = message.payload?.parts

  if (!payload_parts) {
    return undefined
  }

  const attachments: AttachmentContent[] = []

  for (const part of payload_parts) {
    if (part.mimeType === 'application/pdf') {
      const attachment_constructor: AttachmentContent = {
        attachment_id: part.body?.attachmentId as string | undefined,
        filename: part.filename as string | undefined,
        data: {
          base64: part.body?.data as string | undefined,
        },
      }

      const data = await getMessageAttachments(
        access_token,
        message.id as string,
       attachment_constructor.attachment_id as string,
      )

      const filename = part.filename?.replace(/ /g, '_')

      base64ToPdf(data as string, filename as string, message.id as string)

      attachments.push(attachment_constructor)
    }
  }

  return attachments
}

export default getMessageAttachmentAdapter
