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
          <code><pre>http://localhost:5006/${path}</pre></code>
        </div>
        <div>
          <h4>Response headers</h4>
          <code>http://localhost:5006/${path}</code>
        </div>
    </div>`
}


export default createResponseArea
