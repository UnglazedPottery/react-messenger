//Info: custom hook that works like useState but stores everything in local storage so that 
// data persists after a page refresh

import { useEffect, useState } from 'react'

const PREFIX = 'whatsapp-clone-'

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key

    //get the data from local storage
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey)

        if (jsonValue != null) return JSON.parse(jsonValue)

        //would it ever even get to this part if jsonValue is null?
        if (typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    })

    //save the new/changed data to local storage
    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]
}
