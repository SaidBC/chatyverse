import { jwtDecode } from "jwt-decode";
import { useRef } from "react";
function useDecodeToken(token) {
  const payload = useRef(jwtDecode(token));
  return payload;
}

export default useDecodeToken;
