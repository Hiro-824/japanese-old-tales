import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Tale = defineDocumentType(() => ({
  name: 'Tale',
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (tale) => `/tales/${tale._raw.flattenedPath}` },
  },
}))

export default makeSource({ contentDirPath: 'tales', documentTypes: [Tale] })