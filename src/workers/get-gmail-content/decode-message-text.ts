import base64ToText from '../../utils/base64-text'

const decodeMessageText = (text_encoded: string | undefined): string | undefined => {
  let text_decoded: string | undefined
  if (!text_encoded) {
    text_decoded = undefined
  } else {
    text_decoded = base64ToText(text_encoded)
  }

  return text_decoded
}

export default decodeMessageText
