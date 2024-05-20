import './opblock.styles.css'
import { Endpoint, Parameter, RequestProperties } from '../../types.ts'
import createControlButtons from '../control-buttons/controlButtons.ts'


const createOpBlock = (endpoint: Endpoint): string => {
  const parameters: string[] | '' = endpoint.parameters ?
    mapParamsToHTMLStrings(endpoint.path, endpoint.method, endpoint.parameters) : ''

  let requestBody: string = ''
  if (endpoint.requestBody) {
    const rawRequestBody = JSON.stringify(PropertiesToObject(endpoint.requestBody.properties), null, 2)
    requestBody = `
    <div class="opBlock-section-header">
      <h4 class="opBlock-title"><span>Request body:</span></h4>
    </div>
    <div class="opBlock-requestBody">
      <div role="textbox" contenteditable="true">
        <pre id="requestBody!${endpoint.path}|${endpoint.method}">${rawRequestBody}</pre>
      </div>
    </div>`
  }
  
  const controlButtons: string = createControlButtons(endpoint.path, endpoint.method)
  
  return `
  <div class="opBlock hidden">
    <div class="opBlock-section">
      <div class="opBlock-section-header">
          <h4 class="opBlock-title"><span>Parameters:</span></h4>
      </div>
      <div class="opBlock-parameters">
            ${parameters}
      </div>
    </div>
    ${requestBody}
    ${controlButtons}
    <div class="opBlock-result"></div>
  </div>
  `
}


const PropertiesToObject = (props: RequestProperties): object => {
  const obj: RequestProperties = {}
  for (const [key, value] of Object.entries(props)) {
    obj[key] = value
  }

  return obj
}

const mapParamsToHTMLStrings = (path: string, method: string, params: Parameter[]): string[] => {
  return params.map(p =>
    `
    <div class="opBlock-parameter">
      <div>
        <div class="opBlock-parameter__title">${p.name}  <span class="${p.required && 'required'}">*</span></div>
        <div class="opBlock-parameter__type">${p.schema.type}</div>
      </div>
      <div>      
        <input id="param!${path}!${method}" class="opBlock-parameter__input" placeholder="${p.name}"/>
      </div>
    </div>
  `)
}

export default createOpBlock
