import { ProfileContextType } from './PageContext/context';

type FetchVariable = {
  key: string,
  value?: string,
  queryAttr?: string,
  type: string,
  required?: boolean
};

export type Fetch = {
  query: string,
  variables?: FetchVariable[],
  key: string,
};


export type PageBasicData = {
  profile: ProfileContextType
  meta: {
    theme: {
      primary: string
      primaryTextColor: string
      secondary: string
      secondaryTextColor: string
      color: string
      background: string
      backgroundDark: string
    }
  }
};