import prismadb from "@/lib/prismadb";
import TagForm from "./components/tagForm";

const TagPage = async({
  params
}: {
  params: { tagId: string, galleryId: string}
}) => {
  let tag;
  if (params.tagId == 'new') {
    tag = null;
  } else {
    tag = await prismadb.tag.findUnique({
      where: {
        id: params.tagId
      }
    });
  }
  
  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TagForm initialData={tag} />
      </div>
    </div>
  );
}

export default TagPage