export default function setupAxios(axios) {
  axios.interceptors.request.use(
    (config) => {
      try {
        // Retrieve and parse tokens from localStorage
        const authTokens = localStorage.getItem('authTokens');
        const parsedTokens = authTokens ? JSON.parse(authTokens) : null;

        // Extract accessToken
        const accessToken = parsedTokens?.accessToken || parsedTokens || null;

        // console.log('accessToken:', accessToken);

        // Set the default baseURL if not already set
        if (!config.baseURL) {
          config.baseURL = 'https://himalayacarpets.co.in/servant-service/v1';
        }

        // Preserve existing headers and set defaults
        config.headers = {
          ...config.headers,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };

        // Attach Authorization header if accessToken exists
        if (accessToken) {
          config.headers.Authorization = `token ${accessToken}`;
        }
      } catch (error) {
        console.error('Error setting Authorization header:', error);
      }

      return config;
    },
    (err) => Promise.reject(err)
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response } = error;
      const { status } = response || {};

      if (status === 401) {
        console.error('Unauthorized access. Please login again.');
        localStorage.removeItem('authTokens'); // Remove tokens
        window.location.href = '/login'; // Redirect to login page
      }

      return Promise.reject(error);
    }
  );
}
