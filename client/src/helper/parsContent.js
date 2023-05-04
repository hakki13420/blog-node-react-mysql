
// function to remove the p tag in the post content
export const getContentText = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent
}
