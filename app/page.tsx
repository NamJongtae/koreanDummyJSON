import HomeIntro from "@/src/components/home/home-intro/home-intro";
import TryIt from "@/src/components/home/try-it/try-it";
import Resources from "@/src/components/home/resources/resources";
import ApiEndpoints from "@/src/components/home/api-endpoints/api-endpoints";
import StartGuide from "@/src/components/home/start-guide";

export default function Home() {
  return (
    <>
      <HomeIntro />
      <TryIt />
      <Resources />
      <ApiEndpoints />
      <StartGuide />
    </>
  );
}
