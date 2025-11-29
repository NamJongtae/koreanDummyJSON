import QuoteIcon from "./quote-icon";
import HomeIntroLinks from "./home-intro-links";
import HomeIntroDescription from "./home-intro-description";
import ApiRequestCount from "./api-request-count";

export default function HomeIntroContent() {
  return (
    <div className="relative px-5 py-6 sm:px-10 sm:py-8 md:px-14 md:py-10 border-8 border-double">
      <QuoteIcon position="top" />
      <HomeIntroDescription />
      <QuoteIcon position="bottom" />

      <div className="flex flex-wrap gap-6 justify-between items-center">
       
        <HomeIntroLinks />
      </div>
    </div>
  );
}
