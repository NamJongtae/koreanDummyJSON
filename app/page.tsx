import HomeIntro from "@/src/components/home/home-intro";
import Resources from "@/src/components/home/resources/resources";
import TryIt from "@/src/components/home/try-it/try-it";


export default function Home() {
  return (
    <>
      <HomeIntro />
      <TryIt />
      <Resources />
    </>
  );
}
