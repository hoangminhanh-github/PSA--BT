export interface ILoginParams {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ILoginValidation {
  email: string;
  password: string;
}

export interface ISignUpParams {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  // phone?: number;
  gender?: string;
  region?: string | number;
  state?: string | number;
}
export interface IGenderParams {
  label: string;
  value: string;
}
export interface ILocationParams {
  id: string | number;
  name: string;
  pid: number | string;
}
export interface ditcum {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}
