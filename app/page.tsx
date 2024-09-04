import HomeIntro from "@/src/components/home/home-intro";
import TryIt from "@/src/components/home/try-it/try-it";
import Resources from "@/src/components/home/resources/resources";
import ApiEndpoints from "@/src/components/home/api-endpoints/api-endpoints";

export default function Home() {
  return (
    <>
      <HomeIntro />
      <TryIt />
      <Resources />
      <ApiEndpoints />
    </>
  );
}
