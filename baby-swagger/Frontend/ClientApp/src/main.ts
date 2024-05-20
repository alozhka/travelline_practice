import "./style.css";
import createEndpoints, { addEndpointListener } from './components/endpoints/endpoints.ts'
import { SwaggerData } from './types.ts'
import { addExecutionListener } from './components/control-buttons/controlButtons.ts'

const createHtmlNode = (htmlString: string | string[]) => {
  const placeholder = document.createElement("div");
  placeholder.innerHTML = typeof htmlString === `string` ? htmlString : htmlString.join(``);

  return placeholder.childNodes;
};

const swagger: SwaggerData = {
  endpoints: [
    {
      path: '/Users',
      method: 'get'
    },
    {
      path: '/Users',
      method: 'post',
      requestBody: {
        contentType: 'application/json',
        properties: {
          firstName: 'string',
          lastName: 'string',
          email: 'string',
          role: 'int'
        }
      }
    },
    {
      path: '/Users/{id}',
      method: 'get',
      parameters: [
        {
          name: 'id',
          required: true,
          schema: {
            type: 'int'
          }
        }
      ]
    },
    {
      path: '/Users/{id}',
      method: 'put',
      parameters: [
        {
          name: 'id',
          required: true,
          schema: {
            type: 'int'
          }
        }
      ],
      requestBody: {
        contentType: 'application/json',
        properties: {
          firstName: 'string',
          lastName: 'string',
          role: 'number'
        }
      }
    },
    {
      path: '/Users/{id}',
      method: 'delete',
      parameters: [
        {
          name: 'id',
          required: true,
          schema: {
            type: 'int'
          }
        }
      ]
    },
    {
      path: '/Users/get-by-email/{email}',
      method: 'get',
      parameters: [
        {
          name: 'email',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ]
    }
  ]
}


const createHtml = async (): Promise<string> => {
  const endpoints: string[] = createEndpoints(swagger.endpoints)
  
  return endpoints.join("\n").trim().replace('\n', '')
}


(async () => {
  const appDiv = document.querySelector<HTMLDivElement>("#app");
  const node: NodeListOf<ChildNode> = createHtmlNode(await createHtml());
  if (appDiv && node) {
    node.forEach(el => { 
      appDiv.append(el)
      const method = (el as HTMLElement).attributes.getNamedItem('method')?.nodeValue
      const path = (el as HTMLElement).attributes.getNamedItem('path')?.nodeValue
      
      const endpoint = swagger.endpoints.filter(e => e.path === path && e.method === method)[0]
      addEndpointListener(el as HTMLElement)
      addExecutionListener(el as HTMLElement, endpoint)
    })
  }
})();
