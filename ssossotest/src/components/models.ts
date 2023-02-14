export interface Cards {
  image: string,
  title: string,
  desc: string,
  tag: string
}

export interface ContentModel {
  id: number,
  question: string | [string[]] | any,
  answer: [] | string | any
}

export interface MBTIContentModel extends ContentModel {
  type: string,
  result: number
}
