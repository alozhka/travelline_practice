import "./style.css";
import createTitle from './components/title/title.ts'
import createEndpoints from './components/endpoints/endpoints.ts'

const createHtmlNode = (htmlString: string | string[]) => {
  const placeholder = document.createElement("div");
  placeholder.innerHTML = typeof htmlString === `string` ? htmlString : htmlString.join(``);

  return placeholder.childNodes;
};

const createHtml = async (): Promise<string> => {
  const swagger = await fetch('http://localhost:5154/swagger/v1/swagger.json', {
    method: 'GET'
  }).then(res => res.json())

  const rawTitleHTML: string = createTitle(swagger.info.title, swagger.info.version)
  const endpoints: string[] = createEndpoints(swagger.paths)

  return `${rawTitleHTML}${endpoints.join("\n")}`.trim().replace('\n', '')
}


(async () => {
  const appDiv = document.querySelector<HTMLDivElement>("#app");
  const node = createHtmlNode(await createHtml());
  if (appDiv && node) {
    node.forEach(el => appDiv.append(el))
  }
})();
