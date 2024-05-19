import "./style.css";
import createEndpoints, { addEndpointListener } from './components/endpoints/endpoints.ts'

const createHtmlNode = (htmlString: string | string[]) => {
  const placeholder = document.createElement("div");
  placeholder.innerHTML = typeof htmlString === `string` ? htmlString : htmlString.join(``);

  return placeholder.childNodes;
};

const createHtml = async (): Promise<string> => {
  const swagger = await fetch('http://localhost:5154/swagger/v1/swagger.json', {
    method: 'GET'
  }).then(res => res.json())

  const endpoints: string[] = createEndpoints(swagger.paths, swagger.components)

  return endpoints.join("\n").trim().replace('\n', '')
}


(async () => {
  const appDiv = document.querySelector<HTMLDivElement>("#app");
  const node: NodeListOf<ChildNode> = createHtmlNode(await createHtml());
  if (appDiv && node) {
    node.forEach(el => { 
      appDiv.append(el)
      addEndpointListener(el as HTMLElement)
    })
  }
})();
