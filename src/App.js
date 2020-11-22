import React, { useState, useEffect } from 'react'

import './App.scss'

import Header from './components/Header'
import Editor from './components/Editor'
import SaveToLocalStorage from './customHooks/SaveToLocalStorage'

const App = () => {
  const [html, setHtml] = SaveToLocalStorage('html', '')
  const [css, setCss] = SaveToLocalStorage('css', '')
  const [javascript, setJavascript] = SaveToLocalStorage('javascript', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${javascript}</script>
      </html>
    `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, javascript])

  const backgroundStorage = localStorage.getItem('backgroundColor')
  const layoutStyle = localStorage.getItem('layoutStyle')

  return (
    <div
      className={`App ${layoutStyle}`}
      style={{ backgroundColor: `${backgroundStorage}` }}
    >
      <Header />
      <div className='main-wrapper'>
        <div className='code-boxes'>
          <Editor
            language='xml'
            displayName='HTML'
            value={html}
            onChange={setHtml}
          />
          <Editor
            language='css'
            displayName='CSS'
            value={css}
            onChange={setCss}
          />
          <Editor
            language='javascript'
            displayName='JAVASCRIPT'
            value={javascript}
            onChange={setJavascript}
          />
        </div>
        <div className='output'>
          <iframe
            frameBorder='0'
            title='output'
            sandbox='allow-scripts'
            width='100%'
            height='100%'
            srcDoc={srcDoc}
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default App
