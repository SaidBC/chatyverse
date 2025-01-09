const SERVER_URL = import.meta.env.VITE_SERVER_API_URL;

const friendRequestHandle = async function (path, token, setShowAlert) {
  const requestUrl = SERVER_URL + path;
  try {
    const res = await fetch(requestUrl, {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    if (res.status !== 200)
      return setShowAlert({
        isPopped: true,
        variant: "error",
        title: "Failed",
        content: data.error.message,
      });
    if (!data.success)
      return setShowAlert({
        isPopped: true,
        variant: "error",
        title: "Failed",
        content: data.error.message,
      });
    setShowAlert({
      isPopped: true,
      variant: "success",
      title: "Success",
      content: data.data,
    });
  } catch (error) {
    return setShowAlert({
      isPopped: true,
      variant: "error",
      title: "Failed",
      content: error.message,
    });
  }
};
export default friendRequestHandle;
