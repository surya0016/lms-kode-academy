import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { CircleDollarSign, File, LayoutDashboard, ListCheck } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import { Combobox } from "@/components/ui/combobox";
import CategoryForm from "./_components/CategoryForm";
import { getEnabledCategories } from "trace_events";
import PriceForm from "./_components/PriceForm";
import Attachment from "./_components/AttachmentForm";
import ChaptersForm from "./_components/ChaptersForm";
import Banner from "@/components/banner";
import Actions from "./_components/Actions";

const CourseIdPage = async ({
  params
}:{
  params: {courseId: string}
}) => {
  const { userId } = auth();

  if (!userId){
    return redirect("/")
  }

  const course = await db.course.findUnique({
    where:{
      id: params.courseId,
      userId
    },
    include:{
      chapters:{
        orderBy:{
          position:"asc"
        }
      },
      attachments:{
        orderBy:{
          createdAt:"desc"
        }
      }
    }
  })

  const categories = await db.category.findMany({
    orderBy:{
      name:"asc",
    },
  })

  if(!course) return redirect("/");

  const requiredFields = [
    course.title,
    course.description,
    course.categoryId,
    course.imageUrl,
    course.price,
    course.chapters.some(chapter => chapter.isPublished)
  ]

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${totalFields})`

  const isComplete = requiredFields.every(Boolean);
  
  return ( 
    <>{!course.isPublished && (
      <Banner
        label="This course is unpublished. It will not be visible to the students"
      />
    )}
      <div className="p-6 ">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold">
              Course Setup
            </h1>
            <span className="text-sm dark:text-zinc-100 text-zinc-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard}/>
              <h2 className="text-xl font-semibold">
                Customize your course
              </h2>
            </div>
              <TitleForm
                initialData={course}
                courseId={course.id}
              />
              <DescriptionForm
                initialData={course}
                courseId={course.id}  
              />
              <ImageForm
                initialData={course}
                courseId={course.id}
              />
              <CategoryForm
                initialData={course}
                courseId={course.id}
                options={categories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
              />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListCheck}/>
                <h2 className="text-xl font-semibold">
                  Course Chapters
                </h2>
              </div>
              <div>
                <ChaptersForm
                  initialData={course}
                  courseId={course.id}  
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign}/>
                <h2 className="text-xl font-semibold">
                  Sell you course
                </h2>
              </div>
              <PriceForm
                initialData={course}
                courseId={course.id}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File}/>
                <h2 className="text-xl font-semibold">
                  Resources & Attachments
                </h2>
              </div>
              <Attachment
                initialData={course}
                courseId={course.id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
   );
}
 
export default CourseIdPage;