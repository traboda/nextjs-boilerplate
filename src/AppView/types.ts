import {ParsedUrlQuery} from "querystring";
import {ProfileContextType} from "../utils/types";

export type PageContextChildrenProps = {
    profile?: ProfileContextType,
    setProfile?: (profile: ProfileContextType) => void,
    data: Partial<(any|object)>,
    setData: (data: Partial<(any|object)>) => void,
    query?: ParsedUrlQuery
};