import { ref as storageRef } from "firebase/storage";
import { storage } from "@/services/firebase/firebase";

export const storageRefFromURL = (url: any) => {
  const decodedUrl = decodeURIComponent(url.split("/o/")[1].split("?")[0]);
  return storageRef(storage, decodedUrl);
};
