import path from 'path'
import fs from 'fs/promises'

const getTokens = async (): Promise<string[]> => {
  const content = await fs.readFile(path.resolve(__dirname, 'data', 'tokens.json'))
  return JSON.parse(content.toString('utf-8'))
}

export const isValidToken = async (token: string): Promise<boolean> => {
  const tokens = await getTokens()
  return tokens.some(value => value === token)
}

export const gerarToken = (): string => `${Math.random().toString(36).slice(-10)}${Math.random().toString(36).slice(-6)}`

export const saveToken = async (dados: string[], token: string, fileName = 'token.json'): Promise<boolean> => {
  let isSuccess = false
  dados.push(token)
  await fs.writeFile(path.resolve(__dirname, 'data', fileName), JSON.stringify(dados))
    .then(() => {
      isSuccess = true
    })
    .catch(() => {
      isSuccess = false
    })
  return isSuccess
}
