import './opblock.styles.css'
import { Components, EndpointData, Schema } from '../endpoints/endpoints.ts'


const createOpBlock = (path: string, method: string, endpoint: EndpointData, components: Components): string => {
  const parameters: string[] | '' = endpoint.parameters ? endpoint.parameters.map(p => 
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
  `) : ''
  
  let requestBody: Record<string, string> = {} 
  if (endpoint.requestBody) {
    const schemaRef: string = Object.values(endpoint.requestBody.content)[0].schema.$ref
    const requestSchema: Schema = components.schemas[schemaRef]
    requestBody = SchemaToObject(requestSchema, components.schemas)
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
      <div class="opBlock-parameters">
            ${requestBody}
      </div>
    </div>
    <button class="opBlock-button">Execute</button>
    <div class="opBlock-result"></div>
  </div>
  `
}


const SchemaToObject = (schema: Schema, otherShemas: Record<string, Schema>): Record<string, string> => {
  const obj: Record<string, string> = {}
  for (const key in schema.properties) {
    if (Object.keys(schema.properties[key])[0] !== '$ref') {
      obj[key] = key
    }
    else {
      obj[key] = schema.properties[key][0]
    }
  }
  
  return obj
}
  

export default createOpBlock
