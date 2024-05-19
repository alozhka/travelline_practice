import './opblock.styles.css'
import { Components, EndpointData, Schema, Parameter } from '../endpoints/endpoints.ts'


const createOpBlock = (path: string, method: string, endpoint: EndpointData, components: Components): string => {
  const parameters: string[] | '' = endpoint.parameters ? mapParamsToHTMLString(path, method, endpoint.parameters) : ''
  
  let requestBody: string = ''
  if (endpoint.requestBody) {
    const schemaRef: string = Object.values(endpoint.requestBody.content)[0].schema.$ref.split('/').pop()
    const requestSchema: Schema = components.schemas[schemaRef]
    const rawRequestBody = JSON.stringify(SchemaToObject(requestSchema, components.schemas), null, 2)
    requestBody = `
    <div class="opBlock-section-header">
      <h4 class="opBlock-title"><span>Request body:</span></h4>
    </div>
    <div class="opBlock-requestBody">
      <div role="textbox" contenteditable="true"><pre id="requestBody!${path}|${method}">${rawRequestBody}</pre></div>
    </div>`
  }
  
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
    <button class="opBlock-button">Execute</button>
    <div class="opBlock-result"></div>
  </div>
  `
}


const SchemaToObject = (schema: Schema, otherSchemas: Record<string, Schema>): Record<string, string> => {
  const obj: Record<string, string> = {}
  for (const key in schema.properties) {
    if (Object.keys(schema.properties[key])[0] !== '$ref') {
      obj[key] = key
    }
    else {
      obj[key] = schema.properties[key][0]
      otherSchemas;
    }
  }
  
  return obj
}

const mapParamsToHTMLString = (path: string, method: string, params: Parameter[]): string[] => {
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
