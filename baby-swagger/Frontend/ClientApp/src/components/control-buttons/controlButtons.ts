import './controlButtons.styles.css'
import { Endpoint } from '../../types.ts'
import { propertiesToObject } from '../opblock/opblock.ts'
import { renderResponse } from '../response-area/responseArea.ts'


const createControlButtons = (path: string, method: string): string => {
  return `
    <div class="control-buttons-wrapper">
      <button id="execute-button!${path}!${method}" class="control-buttons-execute">Execute</button> 
      <button class="control-buttons-clear">Clear</button> 
    </div>
  `
}

const addExecutionListener = (el: HTMLElement, endpoint: Endpoint) => {
  const requestBody = document.getElementById(`requestBody!${endpoint.path}!${endpoint.method}`) as (HTMLPreElement | undefined)
  const responseArea = document.getElementById(`responseArea!${endpoint.path}!${endpoint.method}`) as HTMLDivElement

  const executeButton = el.getElementsByClassName('control-buttons-execute')[0]
  executeButton.addEventListener('click', async (e: Event) => {
    const buttonsArea = (e.currentTarget as HTMLButtonElement).parentElement || undefined
    buttonsArea?.classList.add('control-buttons-expand')
    responseArea.classList.remove('hidden')

    const body = requestBody ? requestBody.innerHTML : null
    const parameter = endpoint.parameters &&
      document.getElementById(`param!${endpoint.path}!${endpoint.method}!${endpoint.parameters[0].name}`) as HTMLInputElement
    const response = await executeRequest(
      endpoint.path, 
      endpoint.method, (endpoint.parameters && parameter) ? {name: endpoint.parameters[0].name, value: parameter.value} : null, 
      body)
    await renderResponse(responseArea, response)
  })

  const clearButton = el.getElementsByClassName('control-buttons-clear')[0]

  clearButton.addEventListener('click', (e: Event) => {
    const buttonsArea = (e.currentTarget as HTMLButtonElement).parentElement || undefined
    buttonsArea?.classList.remove('control-buttons-expand')
    responseArea.classList.add('hidden')
  })
  if (endpoint.requestBody) {
    const props = endpoint.requestBody.properties
    clearButton.addEventListener('click', () => {
      requestBody && (requestBody.innerHTML = JSON.stringify(propertiesToObject(props), null, 2))
    })
  }

}

const executeRequest = async (
  path: string, 
  method: string, 
  parameter: {name: string, value: string} | null, 
  body: string | null): Promise<Response> => {
  const executePath = parameter ? 
    `http://localhost:5154${path}`.replace(`{${parameter.name}}`, parameter.value) :
    `http://localhost:5154${path}`
  return fetch(executePath, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body
  })
}


export { addExecutionListener }
export default createControlButtons
