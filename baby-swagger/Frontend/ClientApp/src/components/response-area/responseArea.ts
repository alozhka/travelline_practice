import './responseArea.styles.ts.css'


const createResponseArea = (path: string) => {
  return `
    <div class="response-area-wrapper">
        <div>
        <h4>Request url </h4>
        <code>http://localhost:5006/${path}</code>
        </div>
        <div>
            <h4>Response code</h4>
            <code>http://localhost:5006/${path}</code>
        </div>
        <div>
          <h4>Response body</h4>
          <pre><code>http://localhost:5006/${path}</code></pre>
        </div>
        <div>
          <h4>Response headers</h4>
          <code>http://localhost:5006/${path}</code>
        </div>
    </div>`
}



const renderResponse = async (responseArea: HTMLDivElement, response: Response): Promise<void> => {
  const wrappers = Array.from(responseArea.getElementsByTagName('code'))
  let headers = ''
  response.headers.forEach((value: string, key: string) => {
    headers += `${key}: ${value}\n`
  })

  wrappers[0].innerText = response.url
  wrappers[1].innerText = `${response.status} ${response.statusText}`
  wrappers[2].innerText = JSON.stringify(await response.json(), null, 2)
  wrappers[3].innerText = headers
}


export { renderResponse }
export default createResponseArea
