type SwaggerData = {
  endpoints: Endpoint[]
}

type Endpoint = {
  path: string
  method: 'get' | 'post' | 'put' | 'delete',
  parameters?: Array<Parameter>
  requestBody?: { 
    contentType: string,
    properties: RequestProperties //  [ { название: тип }, ... ]
  }
}

type RequestProperties = Record<string, string>

type Parameter = {
  name: string,
  required: boolean,
  schema: { 
    type: string
  }
}


export type { SwaggerData, Endpoint, Parameter, RequestProperties }
