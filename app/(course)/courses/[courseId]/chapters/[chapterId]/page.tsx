import { getChapter } from "@/actions/get-chapters"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { File } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { Preview } from "@/components/Preview"
import Banner from "@/components/banner"

import CourseProgressButton from "./_components/CourseProgressButton"
import CourseEnrollButton from "./_components/CourseEnrollButton"
import VideoPlayer from "./_components/VideoPlayer"

const ChapterIdPage = async({
  params
}:{
  params:{ courseId: string, chapterId: string}
}) => {
  const { userId } = auth()

  if(!userId){
    return redirect("/")
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase
  }  = await getChapter({
    userId,
    courseId: params.courseId,
    chapterId: params.chapterId,
  })

  if(!chapter || !course){
    return redirect("/")
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return ( 
    <div className="">
      {userProgress?.isCompleted && (
        <Banner
          variant="success"
          label="You already completed this chapter."
        />
      )}
      {isLocked && (
        <Banner
          variant='warning'
          // label="Gareeb pehele course lele fir yaha aana"
          label="You need to purchase this course to watch this chapter"
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="flex flex-col md:flex-row items-center justify-between p-4">
            <h2 className="text-2xl font-semibold mb-2 md:mb-0">
              {chapter.title}
            </h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton 
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <div className="">
            <Preview
              value={chapter.description!}
            />
          </div>
          {!!attachments.length && (
            <>
              <Separator/>
              <div className="p-4">
                <span className="text-xl mb-2 font-semibold">
                  Attachments
                </span>
                {attachments.map((attachment)=>(
                  <>
                    <a 
                      href={attachment.url}
                      key={attachment.id}
                      target="_blank"
                      className="flex items-center mb-2 p-4 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                    >
                      <File />
                      <p className="line-clamp-1">
                        {attachment.name}
                      </p>
                    </a>
                  </>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
 
export default ChapterIdPage;