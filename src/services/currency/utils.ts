import path from 'path'
import { promises } from 'fs'
import { FileToken } from '../../interfaces/token'

export const getCurrencies = async (): Promise<FileToken> => {
  const content = await promises.readFile(path.resolve(__dirname,'..','..', 'data', 'currencies.json'), 'utf8')
  return JSON.parse(content)
}
