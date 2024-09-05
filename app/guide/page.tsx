import DeleteResource from "@/src/components/guide/delete-resource";
import FilterResources from "@/src/components/guide/filter-resource";
import GetResource from "@/src/components/guide/get-resource";
import GetResourcesPaging from "@/src/components/guide/get-resource-paging";
import GetResources from "@/src/components/guide/get-resources";
import GuideIntro from "@/src/components/guide/guide-intro";
import NestedResources from "@/src/components/guide/nested-resource";
import PatchResource from "@/src/components/guide/patch-resource";
import PostResource from "@/src/components/guide/post-resource";
import PutResource from "@/src/components/guide/put-resource";

export default function Guide() {
  return (
    <>
      <GuideIntro />
      <GetResource />
      <GetResources />
      <GetResourcesPaging />
      <PostResource />
      <PutResource />
      <PatchResource />
      <DeleteResource />
      <FilterResources />
      <NestedResources />
    </>
  );
}
