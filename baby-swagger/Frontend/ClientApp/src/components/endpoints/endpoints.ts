import arrowIcon from './icon-arrow-up.svg'
import './endpoints.styles.css'

type EndpointData = {
  tags: string[]
  requestBody: {
    content: object
  }
  responses: Record<string, { description: string }>
}
type Endpoint = Record<string, EndpointData>
type Endpoints = Record<string, Endpoint>;


const createEndpoints = (endpoints: Endpoints): string[] => {
  const rawEndpointsHTML: string[] = []
  for (const path in endpoints) {
    for (const method in endpoints[path]) {
      rawEndpointsHTML.push(
        `
        <div id="route-${path}" class="route route-${method}">
          <div class="route-header">
            <button class="route-summary">
              <div class="route-summary-method route-summary-method-${method}">${method}</div>
              <span class="route-summary-path">${path}</span>
              <div class="route-summary-arrow"><img class="arrow" src=${arrowIcon} alt="arrow up"/></div>
            </button>
          </div>
        </div>
        `)
    }
  }

  return rawEndpointsHTML
}


const toggleEndpointInfo = (event: Event) => {
  const endpointHeader = event.currentTarget as HTMLDivElement
  const arrow = endpointHeader.getElementsByTagName('img')[0]
  arrow.classList.toggle("arrow-expand")
  
  console.log(endpointHeader)
}

const addEndpointListener = (endpoint: HTMLElement) => {
  const endpointHeader = endpoint.getElementsByClassName('route-header')[0];
  endpointHeader.addEventListener('click', toggleEndpointInfo)
}


export type { Endpoints }
export { addEndpointListener }
export default createEndpoints
