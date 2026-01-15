import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

function uploadFile(file) {
  const storageRef = ref(storage, `models/${Date.now()}-${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload progress:", progress);
    },
    (error) => console.error("Upload failed:", error),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        console.log("File URL:", url);
      });
    }
  );
}
