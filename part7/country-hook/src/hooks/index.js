import React, { useState, useEffect } from 'react'

import axios from 'axios'

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

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    if (!name) return null
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((res) => setCountry({ found: true, ...res.data }))
      .catch(() => setCountry({ found: false }))
  }, [name])

  return country
}
