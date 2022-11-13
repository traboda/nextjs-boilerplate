import { ParsedUrlQuery } from 'querystring';

import { FetcherQuery } from './types';


const build_query_from_fetches = (fetches: FetcherQuery[], ssrQuery: ParsedUrlQuery = null) => {
    const varTypes = [];
    const varData = {};
    const queryBody = [];

    if(fetches?.length > 0) {
        fetches.forEach((f) => {
            if(f.variables?.length > 0) {
                f.variables.forEach((v) => {
                    varTypes.push(`$${v.key}: ${v.type}${v?.required ? '!' : ''}`);
                    let vari;
                    if(ssrQuery && v?.queryAttr) {
                        vari  = ssrQuery[v.queryAttr];
                    } else if(v?.value) {
                        vari = v.value;
                    }
                    if(vari){
                        if(typeof vari === 'object')
                            varData[v.key] = vari[0];
                        else varData[v.key] = vari;
                    }
                });
            }
            queryBody.push(f.query);
        });
    }

    let query = 'query ';
    if(varTypes?.length > 0){
        query += '(';
        query += `${varTypes.join(', ')}`;
        query += ')';
    }
    query += '{';
    query += `${queryBody.join(' ')}`;
    query += '}';

    return {
        query,
        variables: varData
    };

};

export default build_query_from_fetches;