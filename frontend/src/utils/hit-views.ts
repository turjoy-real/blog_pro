import qs from "qs";
import { getStrapiURL } from "./api-helpers";

export function hitView(path: string, urlParamsObject = {}, options = {}) {
  const mergedOptions = {
    next: { revalidate: 60 },
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  // Trigger API call

  fetch(requestUrl, mergedOptions)
    .then(() => {})
    .catch((e) => console.log(e));
}
