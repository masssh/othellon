import {createIPXHandler} from '@netlify/ipx'

export const handler = createIPXHandler({
    domains: ["3.bp.blogspot.com"],
    basePath: "/.netlify/functions/ipx/"
})
