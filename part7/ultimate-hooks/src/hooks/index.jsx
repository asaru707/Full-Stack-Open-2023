import axios from 'axios'
import { useEffect, useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then((res) => {
      setResources(res.data)
    })
  }, [])

  const create = async (resource) => {
    const res = await axios.post(baseUrl, resource)
    setResources(resources.concat(res.data))
    return res.data
  }

  const service = {
    create,
  }

  return [resources, service]
}
