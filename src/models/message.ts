export interface AttachmentContent {
  filename?: string
  attachment_id?: string
  data?: {
    base64?: string
    content?: string
  }
}

// Mudar os nomes depois, aqui está na estrutura do retorno da Google
export interface MessageContent {
  id?: string
  snippet?: string
  payload?: {
    headers?: {
      from?: string
      date?: string
    }
    body?: {
      base64?: string
      content?: string
    }
    attachment?: AttachmentContent[]
  }
}
