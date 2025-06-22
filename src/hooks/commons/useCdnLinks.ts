import { useState, useEffect } from "react";

const PACKAGE_NAME = "korean-dummy-json-fetcher";

const createCdnLinks = (version: string) => ({
  jsdelivr: `<script src="https://cdn.jsdelivr.net/npm/${PACKAGE_NAME}@${version}/dist/index.min.js"></script>`,
  unpkg: `<script src="https://unpkg.com/${PACKAGE_NAME}@${version}/dist/index.min.js"></script>`
});

export const useCdnLinks = () => {
  const fallbackVersion = "1.0.6";

  const [cdnLinks, setCdnLinks] = useState(() =>
    createCdnLinks(fallbackVersion)
  );

  useEffect(() => {
    const getLatestVersion = async () => {
      try {
        const res = await fetch(
          `https://registry.npmjs.org/${PACKAGE_NAME}/latest`
        );
        if (!res.ok) return;

        const data = await res.json();
        const version = data.version;
        if (version) {
          setCdnLinks(createCdnLinks(version));
        }
      } catch (error) {
        console.error(
          `Failed to fetch latest version for ${PACKAGE_NAME}:`,
          error
        );
      }
    };

    getLatestVersion();
  }, []);

  return cdnLinks;
};
