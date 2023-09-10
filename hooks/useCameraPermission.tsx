import { useEffect, useState } from "react";
import { Camera } from "expo-camera";

const useCameraPermission = () => {
  const [hasPermission, setHasPermission] = useState(null);

  const getPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    getPermission();
  }, []);

  return hasPermission;
};

export default useCameraPermission;
