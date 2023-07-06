const BackendURL =
  process.env.NEXT_PUBLIC_DEV_MODE === 'true'
    ? process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL
    : process.env.NEXT_PUBLIC_BACKEND_URL;

export default BackendURL;
