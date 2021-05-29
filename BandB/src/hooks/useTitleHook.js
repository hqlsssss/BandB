import {useLayoutEffect,useState} from 'react'
export default function useTitleHook(title) {
    
    const [state,setState] = useState()
    console.log('hhhh'+state)
    useLayoutEffect(()=>{
        document.title = title
        setState(title)
    },[title])
    return state
}