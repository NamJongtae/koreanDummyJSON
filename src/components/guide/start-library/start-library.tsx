import PackageInstallCommand from "./package-install-command";
import CDN from "./cdn";
import ESMExample from "./esm-example";
import LibraryDescription from "./library-description";
import LibraryLink from "./Library-link";

export default function StartLibrary() {
  return (
    <section id="라이브러리로-빠르게-시작하기" className="pt-20 px-4">
      <h2 className="section-title mb-4">
        korean-dummy-json-fetcher로 빠르게 시작하기
      </h2>

      <LibraryDescription />

      <PackageInstallCommand manager="npm" />
      <PackageInstallCommand manager="yarn" />
      <PackageInstallCommand manager="pnpm" />

      <CDN />

      <ESMExample />

      <LibraryLink />
    </section>
  );
}
