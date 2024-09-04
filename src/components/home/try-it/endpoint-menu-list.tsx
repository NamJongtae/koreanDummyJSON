import useKeyboardFocusMenu from "@/src/hooks/commons/useKeyboardFocusMenu";
import { escKeyClose } from "@/src/lib/optimizationKeyboard";

interface IProps {
  ENDPOINTS: string[];
  selectEndpoint: (value: string) => void;
  toggleEndpointMenu: () => void;
  endpointMenuRef: React.MutableRefObject<HTMLUListElement | null>;
}

export default function EndpointMenuList({
  ENDPOINTS,
  selectEndpoint,
  toggleEndpointMenu,
  endpointMenuRef
}: IProps) {
  const { setMenuListRef, handlMenuFocusOnTab } = useKeyboardFocusMenu({
    menuItems: ENDPOINTS
  });

  return (
    <>
      <ul
        className="absolute z-10 left-0 mt-10 w-[135px] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-x-hidden overflow-y-auto p-1 max-h-[230px] scrollbar-hide animate-entering"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        ref={endpointMenuRef}
        onKeyDown={(e) =>
          escKeyClose({ event: e, closeCb: toggleEndpointMenu })
        }
      >
        {ENDPOINTS.map((endpoint, index) => (
          <li key={endpoint}>
            <button
              onClick={() => selectEndpoint(endpoint)}
              onKeyDown={(e) => handlMenuFocusOnTab(e, index)}
              ref={
                setMenuListRef(
                  index
                ) as React.MutableRefObject<HTMLButtonElement | null>
              }
              className="text-gray-700 block px-3 py-2 text-sm w-full text-left rounded-md betterhover:hover:bg-gray-200 transition-colors duration-150 ease-in-out focus:outline-none focus:text-blue-400"
            >
              {endpoint}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
