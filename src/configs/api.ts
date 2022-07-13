import { APIHost } from '../utils/constants'

enum APIService {
  auth,
  protected,
  public,
  product,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/auth`
  } else if (service === APIService.protected) {
    return `${APIHost}/protected`
  } else if (service === APIService.public) {
    return `${APIHost}`
  }

  return ''
}

export const API_PATHS = {
  signIn: 'https://api.gearfocus.div4.pgtest.co/api/authentication/login',
  signUp: `${getBaseUrl(APIService.auth)}/register`,
  userProfile: `${getBaseUrl(APIService.public)}/user`,
  getLocation: `${getBaseUrl(APIService.public)}/location`,
}
