import axios from "axios";

export const commonApi = async (method, url, reqBody, reqHeader,) => {
    const confiq = {
        method,
        url,
        data: reqBody,
        headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
    }
    return await axios(confiq).then(result => {
        return result
    }).catch(result => {
        return result
    })

}