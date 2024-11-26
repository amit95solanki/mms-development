export default function setupAxios(axios) {
  let isRefreshing = false;
  const refreshSubscribers = [];

  /**
   * Axios interceptors run before and after a request, allowing developers to modify requests and responses.
   * For more details on axios interceptors, see https://github.com/axios/axios#interceptors
   */

  axios.interceptors.request.use(
    (config) => {
      const { accessToken } = JSON.parse(localStorage.getItem('authToken')) || {};

      if (!config.baseURL) {
        config.baseURL = 'https://backend-e-commerce-amit.onrender.com/api/v1/';
      }

      config.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'client-id': process.env.REACT_APP_SSO_CLIENT_ID,
      };

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const { config, response } = error;
      const { status } = response || {};
      const { refreshToken } = JSON.parse(localStorage.getItem('authToken')) || {};

      const originalRequest = config;

      if (
        status === 401 &&
        originalRequest.url !== `${process.env.REACT_APP_API_URL}login` &&
        originalRequest.url !== `${process.env.REACT_APP_API_URL}refresh-token`
      ) {
        if (!isRefreshing) {
          isRefreshing = true;

          axios
            .post(`${process.env.REACT_APP_API_URL}refresh-token`, {
              refresh: refreshToken,
            })
            .then((response) => {
              localStorage.setItem('authToken', JSON.stringify(response.data));

              isRefreshing = false;
              onRefreshed(response.data.accessToken);
            })
            .catch(() => {
              localStorage.removeItem('authToken');
            });

          const retryOriginalRequest = new Promise((resolve) => {
            subscribeTokenRefresh((token) => {
              // Replace the expired token and retry
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axios(originalRequest));
            });
          });

          return retryOriginalRequest;
        }
      }

      return Promise.reject(error); // Ensure consistent return
    }
  );

  const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
  };

  const onRefreshed = (token) => {
    refreshSubscribers.forEach((cb) => cb(token));
  };
}
