import './controlButtons.styles.css'
import { Endpoint } from '../../types.ts'
import { propertiesToObject } from '../opblock/opblock.ts'


const createControlButtons = (path: string, method: string): string => {
  return `
    <div class="control-buttons-wrapper">
      <button id="execute-button!${path}!${method}" class="control-buttons-execute">Execute</button> 
      <button class="control-buttons-clear">Clear</button> 
    </div>
  `
}

const addExecutionListener = (el: HTMLElement, endpoint: Endpoint) => {
  const requestBody = document.getElementById(`requestBody!${endpoint.path}!${endpoint.method}`) as HTMLPreElement
  const responseArea = document.getElementById(`responseArea!${endpoint.path}!${endpoint.method}`) as HTMLDivElement
  
  const executeButton = el.getElementsByClassName('control-buttons-execute')[0]
  executeButton.addEventListener('click', (e: Event) => {
    const buttonsArea = (e.currentTarget as HTMLButtonElement).parentElement || undefined
    buttonsArea?.classList.add('control-buttons-expand')
    responseArea.classList.remove("hidden")
  })
  
  const clearButton = el.getElementsByClassName('control-buttons-clear')[0]
  
  clearButton.addEventListener('click', (e: Event) => {
    const buttonsArea = (e.currentTarget as HTMLButtonElement).parentElement || undefined
    buttonsArea?.classList.remove('control-buttons-expand')
    responseArea.classList.add("hidden")
  })
  if (endpoint.requestBody) {
    const props = endpoint.requestBody.properties
    clearButton.addEventListener('click', () => {
      requestBody.innerHTML = JSON.stringify(propertiesToObject(props), null, 2)
    })
  }
}


export {addExecutionListener }
export default createControlButtons;
