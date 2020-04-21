interface ContentTypes {
  [propName: string]: string
}

const ContentTypes: ContentTypes = {
  "json": "application/json",
  "text": "text/plain",
  "form-data": "multipart/form-data",
}

Object.freeze(ContentTypes);

export default ContentTypes;