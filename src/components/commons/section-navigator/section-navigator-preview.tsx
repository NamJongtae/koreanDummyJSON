interface IProps {
  sectionIds: string[];
  activeSectionId: string | null;
  enterNavigator: () => void;
  handleClickSection: (sectionId: string) => void;
}

export default function SectionNavigatorPreview({
  sectionIds,
  activeSectionId,
  enterNavigator,
  handleClickSection
}: IProps) {
  return (
    <ul
      className={`w-full bg-white cursor-pointer`}
      onMouseEnter={enterNavigator}
    >
      {sectionIds.map((id) => {
        const encodedId = encodeURI(id);
        const isActive = activeSectionId === decodeURI(encodedId);

        return (
          <li
            className={`transition-colors text-left group-hover:bg-blue-600 w-4 h-1 mb-4 rounded-sm ${
              isActive ? "bg-blue-600" : "bg-gray-300"
            }`}
            key={id}
            onClick={() => handleClickSection(id)}
          >
            <span className={`hidden`}>{id.replaceAll("-", " ")}</span>
          </li>
        );
      })}
    </ul>
  );
}
