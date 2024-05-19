import arrowIcon from './icon-arrow-up.svg'
import './endpoints.styles.css'
import createOpBlock from '../opblock/opblock.ts'

type EndpointData = {
  tags: string[],
  parameters: Parameter[] | undefined
  requestBody?: {
    content: object
  }
}

type Parameter = {
  name: string,
  required: boolean,
  schema: {
    type: string
  }
}

type Schema = {
  properties: Record<string, string>,
  type?: {
    properties: Record<string, {
      minLength?: number
      type: string,
      $ref: string
    }>,
  },
  enum?: Record<number | 'type', number | string>,
  
}
type Components = {
  schemas: Record<string, Schema>
}

type Endpoint = Record<string, EndpointData>
type Endpoints = Record<string, Endpoint>;


const createEndpoints = (endpoints: Endpoints, components: Components): string[] => {
  const rawEndpointsHTML: string[] = []
  for (const path in endpoints) {
    for (const [method, endpoint] of Object.entries(endpoints[path])) {
      const opBlock: string = createOpBlock(path, method, endpoint, components)
      
      rawEndpointsHTML.push(
        `
        <div id="route-${path}" class="route route-${method}">
          <div class="route-header">
            <div class="route-summary">
              <div class="route-summary-method route-summary-method-${method}">${method}</div>
              <span class="route-summary-path">${path}</span>
              <div class="route-summary-arrow"><img class="arrow" src=${arrowIcon} alt="arrow up"/></div>
            </div>
          </div>
          ${opBlock}
        </div>
        `)
    }
  }

  return rawEndpointsHTML
}


const toggleEndpointInfo = (event: Event) => {
  const endpointHeader = event.currentTarget as HTMLDivElement
  const arrow = endpointHeader.getElementsByTagName('img')[0]
  const opBlock = (endpointHeader.parentNode as HTMLElement).getElementsByClassName('opBlock')[0]
  arrow.classList.toggle("arrow-expand")
  opBlock.classList.toggle("hidden")
}

const addEndpointListener = (endpoint: HTMLElement) => {
  const endpointHeader = endpoint.getElementsByClassName('route-header')[0];
  endpointHeader.addEventListener('click', toggleEndpointInfo)
}


export type { EndpointData, Schema, Components, Parameter }
export { addEndpointListener }
export default createEndpoints
