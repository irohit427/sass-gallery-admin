'use client';

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns, TagColumn } from "./tagColumns";
import { ApiList } from "@/components/ui/apiList";
import { DataTable } from "@/components/ui/datatable";

interface TagClientProps {
  data: TagColumn[];
}

const TagClient: React.FC<TagClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title={`Tags (${data.length})`}
          description="Manage tags for your gallery"
        />
        <Button onClick={() => router.push(`/${params.galleryId}/tags/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Tags" />
      <Separator />
      <ApiList entityName="tags" entityIdName="tagId" />
    </>
  )
}

export default TagClient