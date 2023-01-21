import fs from 'fs'

const base64ToPdf = (
  base64Data: string,
  namefile: string,
  message_id: string,
) => {
  fs.mkdir(`src/assets/pdfs/${message_id}`, { recursive: true }, () => {})
  const path: string = `src/assets/pdfs/${message_id}/${Date.now().toString() + '-' + namefile}`

  fs.writeFile(path, base64Data, 'base64', function () {})
}

export default base64ToPdf
