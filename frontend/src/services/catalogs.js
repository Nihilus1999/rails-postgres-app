import index from "@/configs/axios/index";

export const getPersonTypes = async () => {
  const response = await index.get("person_types");
  return response.data;
};

export const getDocumentTypes = async () => {
  const response = await index.get("document_types");
  return response.data;
};