import './opblock.styles.css'

type Parameter = {
  name: string,
  required: boolean,
  schema: {
    type: string
  }
}

const createOpBlock = (path: string, method: string, params: Parameter[] | undefined): string => {
  const parameters: string[] | '' = params ? params.map(p => 
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
    <button class="opBlock-button">Execute</button>
    <div class="opBlock-result"></div>
  </div>
  `
}


export type { Parameter }
export default createOpBlock
