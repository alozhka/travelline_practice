import "./style.css";
import createEndpoints, { addEndpointListener } from './components/endpoints/endpoints.ts'
import { SwaggerData } from './types.ts'
import { addExecutionListener } from './components/control-buttons/controlButtons.ts'

const createHtmlNode = (htmlString: string | string[]) => {
  const placeholder = document.createElement("div");
  placeholder.innerHTML = typeof htmlString === `string` ? htmlString : htmlString.join(``);

  return placeholder.childNodes;
};

const createHtml = async (): Promise<string> => {
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
  const endpoints: string[] = createEndpoints(swagger.endpoints)
  
  return endpoints.join("\n").trim().replace('\n', '')
}


(async () => {
  const appDiv = document.querySelector<HTMLDivElement>("#app");
  const node: NodeListOf<ChildNode> = createHtmlNode(await createHtml());
  if (appDiv && node) {
    node.forEach(el => { 
      appDiv.append(el)
      addEndpointListener(el as HTMLElement)
      addExecutionListener(el as HTMLElement)
    })
  }
})();
