import React from 'react'
import axios from 'axios'
import 'normalize.css/normalize.css'
import '../styles/App.css'

class App extends React.Component {
  componentDidMount() {
    axios.get("/api/example").then(resp => {
      console.log(resp.data)
    })
  }

  render() {
    return (
      <h1>Hello World</h1>
    )
  }
}

export default App