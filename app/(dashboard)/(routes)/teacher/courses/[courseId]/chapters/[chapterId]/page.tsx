import { auth } from "@clerk/nextjs/server"

const ChapterIdPage = async({
  params
}:{
  params: {
    courseId:string,
    chapterId:string
  }
}) => {
  const {userId} = auth()
  return (
    <div>ChapterIdPage</div>
  )
}

export default ChapterIdPage