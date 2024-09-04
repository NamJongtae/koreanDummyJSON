import useFetch from "@/src/hooks/commons/useFetch";
import useEndpointMenu from "@/src/hooks/home/useEndpointMenu";
import EndpointMenu from "./endpoint-menu";
import CodeSnippet from "../../commons/fetch-section/code-snippet";
import FetchButton from "../../commons/fetch-section/fetch-button";
import CopyBtn from "../../commons/fetch-section/copy-btn";
import FetchResult from "../../commons/fetch-section/fetch-result";

export default function PlayCode() {
  const {
    ENDPOINTS,
    endpoint,
    code,
    isOpenEndpointMenu,
    endpointMenuRef,
    toggleEndpointMenu,
    selectEndpoint
  } = useEndpointMenu();

  const { data, isLoading, fetchData } = useFetch();

  return (
    <>
      <EndpointMenu
        ENDPOINTS={ENDPOINTS}
        endpoint={endpoint}
        selectEndpoint={selectEndpoint}
        isOpenEndpointMenu={isOpenEndpointMenu}
        toggleEndpointMenu={toggleEndpointMenu}
        endpointMenuRef={endpointMenuRef}
      />

      <CodeSnippet code={code} />

      <FetchButton
        fetchData={() => {
          if (endpoint === "Endpoint") {
            alert("Endpoint를 선택해주세요.");
            return;
          }
          fetchData(`/api${endpoint}`);
        }}
      />

      <CopyBtn target={code} />

      <FetchResult data={data} isLoading={isLoading} />
    </>
  );
}
