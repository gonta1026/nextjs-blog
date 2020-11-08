export interface Post {
  id: string,
  date: string,
  title: string,
}

export interface postData {
  title: string,
  date: string,
  contentHtml: string
}

export type Posts = {
allPostsData: {
  id: string
  date: string
  title: string
}[]
}
