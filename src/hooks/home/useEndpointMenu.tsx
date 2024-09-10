import { useState } from "react";
import useDropdownMenu from "../commons/useDropDownMenu";
import { generateCodeSnippet } from "@/src/lib/generateCodeSnippet";

const ENDPOINTS = [
  "/users/1",
  "/todos/1",
  "/posts/1",
  "/comments/1",
  "/books/1",
  "/reviews/1"
];

export default function useEndpointMenu() {
  const [endpoint, setEndpoint] = useState("Endpoint");

  const {
    isOpenMenu: isOpenEndpointMenu,
    toggleMenu: toggleEndpointMenu,
    menuRef: endpointMenuRef
  } = useDropdownMenu();

  const code =
    endpoint === "Endpoint"
      ? "조회할 데이터의 Endpoint를 선택해주세요."
      : generateCodeSnippet({ fetchUrl: endpoint, method: "GET" });

  const selectEndpoint = (value: string) => {
    if (endpoint === value) return;
    setEndpoint(value);
    toggleEndpointMenu();
  };

  return {
    ENDPOINTS,
    endpoint,
    isOpenEndpointMenu,
    endpointMenuRef,
    code,
    toggleEndpointMenu,
    selectEndpoint
  };
}
