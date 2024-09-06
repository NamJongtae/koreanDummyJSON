interface IProps {
  sectionIds: string[];
  activeSectionId: string | null;
  navigatorRef: React.MutableRefObject<HTMLUListElement | null>;
  leaveNavigator: () => void;
  handleClickSection: (sectionId: string) => void;
}

export default function SectionNavigatorExpanded({
  sectionIds,
  activeSectionId,
  navigatorRef,
  leaveNavigator,
  handleClickSection
}: IProps) {
  return (
    <ul
      className="px-5 py-5 border animate-steeperSlideLeft shadow-md w-full bg-white rounded-md cursor-pointer max-h-[300px] overflow-auto"
      ref={navigatorRef}
      onMouseLeave={leaveNavigator}
    >
      {sectionIds.map((id) => {
        const encodedId = encodeURI(id);
        const isActive = activeSectionId === decodeURI(encodedId);

        return (
          <li
            className={`transition-colors text-left group-hover:bg-blue-600 w-full mb-4 last:mb-0 rounded-sm relative flex pl-3 items-center before:absolute before:w-[3px] before:h-4 before:left-0 before:rounded-sm before:betterhover:hover:bg-opacity-50  ${isActive ? "before:bg-blue-600" : "before:bg-gray-300"}`}
            key={id}
            onClick={() => handleClickSection(id)}
          >
            <span
              className={`text-sm ${isActive ? "text-blue-600" : "text-black"} betterhover:hover:text-opacity-50`}
            >
              {id.replaceAll("-", " ")}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
