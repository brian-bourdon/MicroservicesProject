import axios from 'axios'
import {setCookie} from './util'

export function Connection(email, pwd, setIsLoading, setSuccess, history, setConnected) {
    setIsLoading(true)
    axios.get('http://localhost:4000/user/'+email)
    .then(res => {
      if(res.data.length === 1 && res.data[0].pwd === pwd) {
        for (const key in res.data[0]) {
            console.log("okkk")
            if(key !== "pwd" && key !== "__v") setCookie(key, res.data[0][key], 1)
          }
          //setSuccess(true)
          setIsLoading(false)
          setConnected(true)
          history.push("/")
      }
      else{
        console.log("ok")
        setIsLoading(false)
        setSuccess(false)
        //setConnected(false)
      }
    }).catch(e => {
      setSuccess(false)
      setIsLoading(false)
      setConnected(false)
    })
  }