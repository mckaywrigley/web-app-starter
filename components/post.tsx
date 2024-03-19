import { FC } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface PostProps {
  content: string
}

export const Post: FC<PostProps> = ({ content }) => {
  return (
    <Markdown
      className="prose dark:prose-invert max-w-[500px]"
      remarkPlugins={[remarkGfm]}
      components={{
        h1({ children }) {
          return <h1 className="mb-0 mt-6 md:mt-8">{children}</h1>
        },
        p({ children }) {
          return <p className="mb-0 mt-3 md:mt-4">{children}</p>
        },
        ul({ children }) {
          return <ul className="m-0 pl-3 md:pl-4">{children}</ul>
        }
      }}
    >
      {content}
    </Markdown>
  )
}
