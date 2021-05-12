export const getCoin = async (): Promise<any> => fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
  .then(async res => res.json())
  .catch(() => {
    return new Error('Falha na requisição')
  })
