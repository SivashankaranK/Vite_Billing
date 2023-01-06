import axios, { AxiosError, AxiosResponse } from 'axios'
import { IApiCallProps } from '../../../types'
import { envConfig } from '../../constants'

export const apiCall = (props: IApiCallProps) => {
  const { method, path, paramsObj, dataObj } = props

  const baseURL = `${envConfig.baseUrl}:${envConfig.basePort}/`
  const url = `${envConfig.versionPath}${path}`

  return axios({
    baseURL,
    url,
    method,
    params: paramsObj,
    data: dataObj,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  })
    .then((response: AxiosResponse<any, IApiCallProps>) => {
      return response
    })
    .catch((error: AxiosError<any, IApiCallProps>) => {
      console.info('error', error)
    })
}
