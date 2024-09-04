import { escKeyClose } from "@/src/lib/optimizationKeyboard";
import EndpointMenuList from "./endpoint-menu-list";

interface IProps {
  ENDPOINTS: string[];
  endpoint: string;
  selectEndpoint: (value: string) => void;
  isOpenEndpointMenu: boolean;
  toggleEndpointMenu: () => void;
  endpointMenuRef: React.MutableRefObject<HTMLUListElement | null>;
}

export default function EndpointMenu({
  ENDPOINTS,
  endpoint,
  selectEndpoint,
  isOpenEndpointMenu,
  toggleEndpointMenu,
  endpointMenuRef
}: IProps) {
  return (
    <div className="relative flex gap-5">
      <button
        onClick={toggleEndpointMenu}
        type="button"
        className="inline-flex w-full max-w-[135px] justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 betterhover:hover:bg-gray-50 line-clamp-1"
        id="menu-button"
        onKeyDown={(e) =>
          escKeyClose({ event: e, closeCb: toggleEndpointMenu })
        }
        aria-expanded="true"
        aria-haspopup="true"
      >
        <span className="w-full">{endpoint}</span>
        <svg
          className={`-mr-1 h-5 w-5 text-gray-400 transition-all ${
            isOpenEndpointMenu ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpenEndpointMenu && (
        <EndpointMenuList
          ENDPOINTS={ENDPOINTS}
          selectEndpoint={selectEndpoint}
          endpointMenuRef={endpointMenuRef}
          toggleEndpointMenu={toggleEndpointMenu}
        />
      )}
    </div>
  );
}
