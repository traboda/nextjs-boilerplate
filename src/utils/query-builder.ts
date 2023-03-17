import { ParsedUrlQuery } from 'querystring';

import { Fetch } from './types';

type buildQueryFromFetchesFunctionType = (
  fetches: Fetch[],
  ssrQuery?: ParsedUrlQuery | null
) => {
  query: string,
  variables: {
    [key: string]: string
  }
};

const buildQueryFromFetches: buildQueryFromFetchesFunctionType = (fetches, ssrQuery = null) => {
  const varDefinitions = <string[]>[];
  const queryStrings = <string[]>[];
  const varData = <{
    [key: string]: string
  }>{};

  if(fetches?.length > 0) {
    fetches.forEach((f) => {
      if(f?.variables && f.variables?.length > 0) {
        f?.variables.forEach((v) => {

          varDefinitions.push(`$${v.key}: ${v.type}${v?.required ? '!' : ''}`);

          let vari;
          if(ssrQuery && v?.queryAttr) {
            vari = ssrQuery[v.queryAttr];
          } else if(v?.value) {
            vari = v.value;
          }
          if(vari) {
            if(typeof vari === 'object')
              varData[v.key] = vari[0];
            else varData[v.key] = vari;
          }
        });
      }
      queryStrings.push(f.query);
    });
  }

  let query = 'query ';

  if(varDefinitions?.length > 0) {
    query += '(';
    query += `${varDefinitions.join(', ')}`;
    query += ')';
  }

  query += '{';
  query += `${queryStrings.join(' ')}`;
  query += '}';

  return {
    query,
    variables: varData,
  };

};

export default buildQueryFromFetches;