//import axios from 'axios';

interface SwaggerSchema {
  swagger: string;
  info: { title: string; version: string };
  paths: { [key: string]: Path };
  definitions: { [key: string]: Definition };
}

interface Path {
  [method: string]: Method;
}

interface Method {
  summary: string;
  parameters?: Parameter[];
  responses: { [statusCode: string]: Response };
}

interface Parameter {
  name: string;
  in: string;
  required: boolean;
  type?: string;
  schema: Schema;
}

interface Response {
  description: string;
  schema?: Schema;
}

interface Schema {
  $ref?: string;
  type?: string;
  properties?: { [key: string]: Schema };
}

interface Definition {
  type: string;
  properties: { [key: string]: Schema };
  required?: string[];
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('swagger.json')
    .then(res => res.json())
    .then(obj => {
    const swaggerData = obj as SwaggerSchema;
    renderUI(swaggerData);
  });
});

function renderUI(swaggerData: SwaggerSchema) {
  const app = document.getElementById('app');
  if (!app) return;

  for (const [path, methods] of Object.entries(swaggerData.paths)) {
    for (const [method, details] of Object.entries(methods)) {
      const endpointDiv = document.createElement('div');
      endpointDiv.classList.add('endpoint');

      const title = document.createElement('h2');
      title.innerText = `${method.toUpperCase()} ${path}`;
      endpointDiv.appendChild(title);

      if (details.parameters) {
        const paramsDiv = document.createElement('div');
        paramsDiv.classList.add('parameters');

        const paramsTitle = document.createElement('h3');
        paramsTitle.innerText = 'Parameters:';
        paramsDiv.appendChild(paramsTitle);

        for (const param of details.parameters) {
          const paramDiv = document.createElement('div');
          paramDiv.classList.add('parameter');
          paramDiv.innerText = `${param.name} (${param.in}) - ${param.required ? 'required' : 'optional'}`;
          paramsDiv.appendChild(paramDiv);
        }

        endpointDiv.appendChild(paramsDiv);
      }

      if (details.parameters) {
        const requestBodyTemplate = createRequestBodyTemplate(details.parameters, swaggerData.definitions);
        if (requestBodyTemplate) {
          const requestBodyDiv = document.createElement('div');
          requestBodyDiv.classList.add('request-body');
          requestBodyDiv.innerText = JSON.stringify(requestBodyTemplate, null, 2);
          endpointDiv.appendChild(requestBodyDiv);
        }
      }

      const responseDiv = document.createElement('div');
      responseDiv.classList.add('response');

      const responseTitle = document.createElement('h3');
      responseTitle.innerText = 'Response:';
      responseDiv.appendChild(responseTitle);

      for (const [statusCode, response] of Object.entries(details.responses)) {
        const responseItem = document.createElement('div');
        responseItem.classList.add('response-item');
        responseItem.innerText = `${statusCode}: ${response.description}`;
        responseDiv.appendChild(responseItem);
      }

      endpointDiv.appendChild(responseDiv);

      const executeButton = document.createElement('button');
      executeButton.innerText = 'Execute';
      executeButton.onclick = () => executeRequest(method, path, details.parameters, swaggerData.definitions);
      endpointDiv.appendChild(executeButton);

      app.appendChild(endpointDiv);
    }
  }
}

function createRequestBodyTemplate(parameters: Parameter[], definitions: { [key: string]: Definition }): object | null {
  const bodyParam = parameters.find(param => param.in === 'body');
  if (!bodyParam || !bodyParam.schema) return null;

  const ref = bodyParam.schema.$ref;
  if (!ref) return null;

  const definitionName = ref.split('/').pop();
  const definition = definitions[definitionName!];

  if (!definition) return null;

  const template: any = {};
  for (const [key, value] of Object.entries(definition.properties)) {
    template[key] = getDefaultValue(value);
  }
  return template;
}

function getDefaultValue(schema: Schema): unknown {
  const obj: Record<string, unknown> = {};
  
  switch (schema.type) {
    case 'string':
      return 'string';
    case 'integer':
      return 0;
    case 'boolean':
      return false;
    case 'array':
      return [];
    case 'object':
      if (schema.properties) {
        for (const [key, value] of Object.entries(schema.properties)) {
          obj[key] = getDefaultValue(value);
        }
      }
      return obj;
    default:
      return null;
  }
}

function executeRequest(method: string, path: string, parameters: Parameter[] | undefined, definitions: { [key: string]: Definition }) {
  const url = `https://api.example.com${path}`;
  const config: unknown = { method: method.toUpperCase(), url };

  if (parameters) {
    const bodyParam = parameters.find(param => param.in === 'body');
    if (bodyParam && bodyParam.schema) {
      const requestBody = createRequestBodyTemplate(parameters, definitions);
      // @ts-expect-error just test
      config.data = requestBody;
    }
  }
/*
  axios(config)
    .then(response => {
      console.log('Response:', response.data);
      alert(JSON.stringify(response.data, null, 2));
    })
    .catch(error => {
      console.error('Error:', error);
      alert(`Error: ${error}`);
    });*/
}
