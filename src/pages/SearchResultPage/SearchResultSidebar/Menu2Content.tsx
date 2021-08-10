import React from 'react';

import { routes } from '../../routes';

export const Menu2Content = {
  items: [
    {
      name: 'Data sets',
      link: routes.datasets,
      icon: (
        <svg
          fill="none"
          height="17"
          viewBox="0 0 16 17"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.77778 8.5C1.77778 8.76358 2.18756 9.22253 3.13778 9.67305C4.368 10.2558 6.11289 10.6053 8 10.6053C9.88711 10.6053 11.632 10.2558 12.8622 9.67305C13.8124 9.22253 14.2222 8.76358 14.2222 8.5V6.67179C12.7556 7.53074 10.5129 8.07895 8 8.07895C5.48711 8.07895 3.24444 7.5299 1.77778 6.67179V8.5ZM14.2222 10.8823C12.7556 11.7413 10.5129 12.2895 8 12.2895C5.48711 12.2895 3.24444 11.7404 1.77778 10.8823V12.7105C1.77778 12.9741 2.18756 13.4331 3.13778 13.8836C4.368 14.4663 6.11289 14.8158 8 14.8158C9.88711 14.8158 11.632 14.4663 12.8622 13.8836C13.8124 13.4331 14.2222 12.9741 14.2222 12.7105V10.8823ZM0 12.7105V4.28947C0 2.19684 3.58222 0.5 8 0.5C12.4178 0.5 16 2.19684 16 4.28947V12.7105C16 14.8032 12.4178 16.5 8 16.5C3.58222 16.5 0 14.8032 0 12.7105ZM8 6.39474C9.88711 6.39474 11.632 6.04526 12.8622 5.46253C13.8124 5.012 14.2222 4.55305 14.2222 4.28947C14.2222 4.02589 13.8124 3.56695 12.8622 3.11642C11.632 2.53368 9.88711 2.18421 8 2.18421C6.11289 2.18421 4.368 2.53368 3.13778 3.11642C2.18756 3.56695 1.77778 4.02589 1.77778 4.28947C1.77778 4.55305 2.18756 5.012 3.13778 5.46253C4.368 6.04526 6.11289 6.39474 8 6.39474Z"
            fill="#D3E9F5"
          />
        </svg>
      ),
      divider: false,
    },
    {
      name: 'Data sources',
      link: routes.datasources,
      icon: (
        <svg
          fill="none"
          height="17"
          viewBox="0 0 16 17"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.20115 7.92887H5.22772C6.72017 7.92887 7.42887 7.22017 7.42887 5.70271V2.71782C7.42887 1.20036 6.72017 0.5 5.22772 0.5H2.20115C0.708702 0.5 0 1.20036 0 2.71782V5.70271C0 7.22017 0.708702 7.92887 2.20115 7.92887ZM10.7723 7.92887H13.7989C15.2913 7.92887 16 7.22017 16 5.70271V2.71782C16 1.20036 15.2913 0.5 13.7989 0.5H10.7723C9.27983 0.5 8.57113 1.20036 8.57113 2.71782V5.70271C8.57113 7.22017 9.27983 7.92887 10.7723 7.92887ZM2.20115 6.15294C1.90099 6.15294 1.76759 6.01954 1.76759 5.71105V2.70948C1.76759 2.40933 1.90099 2.26759 2.20115 2.26759H5.22772C5.51954 2.26759 5.66128 2.40933 5.66128 2.70948V5.71105C5.66128 6.01954 5.51954 6.15294 5.22772 6.15294H2.20115ZM10.7723 6.15294C10.4805 6.15294 10.3387 6.01954 10.3387 5.71105V2.70948C10.3387 2.40933 10.4805 2.26759 10.7723 2.26759H13.7989C14.099 2.26759 14.2324 2.40933 14.2324 2.70948V5.71105C14.2324 6.01954 14.099 6.15294 13.7989 6.15294H10.7723ZM2.20115 16.5H5.22772C6.72017 16.5 7.42887 15.7913 7.42887 14.2822V11.289C7.42887 9.77149 6.72017 9.07113 5.22772 9.07113H2.20115C0.708702 9.07113 0 9.77149 0 11.289V14.2822C0 15.7913 0.708702 16.5 2.20115 16.5ZM10.7723 16.5H13.7989C15.2913 16.5 16 15.7913 16 14.2822V11.289C16 9.77149 15.2913 9.07113 13.7989 9.07113H10.7723C9.27983 9.07113 8.57113 9.77149 8.57113 11.289V14.2822C8.57113 15.7913 9.27983 16.5 10.7723 16.5ZM2.20115 14.7241C1.90099 14.7241 1.76759 14.5907 1.76759 14.2905V11.2806C1.76759 10.9805 1.90099 10.8387 2.20115 10.8387H5.22772C5.51954 10.8387 5.66128 10.9805 5.66128 11.2806V14.2905C5.66128 14.5907 5.51954 14.7241 5.22772 14.7241H2.20115ZM10.7723 14.7241C10.4805 14.7241 10.3387 14.5907 10.3387 14.2905V11.2806C10.3387 10.9805 10.4805 10.8387 10.7723 10.8387H13.7989C14.099 10.8387 14.2324 10.9805 14.2324 11.2806V14.2905C14.2324 14.5907 14.099 14.7241 13.7989 14.7241H10.7723Z"
            fill="#D3E9F5"
          />
        </svg>
      ),
      divider: false,
    },

    {
      name: 'Assets',
      link: routes.assets,
      icon: (
        <svg
          fill="none"
          height="17"
          viewBox="0 0 16 17"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.20115 7.92887H5.22772C6.72017 7.92887 7.42887 7.22017 7.42887 5.70271V2.71782C7.42887 1.20036 6.72017 0.5 5.22772 0.5H2.20115C0.708702 0.5 0 1.20036 0 2.71782V5.70271C0 7.22017 0.708702 7.92887 2.20115 7.92887ZM10.7723 7.92887H13.7989C15.2913 7.92887 16 7.22017 16 5.70271V2.71782C16 1.20036 15.2913 0.5 13.7989 0.5H10.7723C9.27983 0.5 8.57113 1.20036 8.57113 2.71782V5.70271C8.57113 7.22017 9.27983 7.92887 10.7723 7.92887ZM2.20115 6.15294C1.90099 6.15294 1.76759 6.01954 1.76759 5.71105V2.70948C1.76759 2.40933 1.90099 2.26759 2.20115 2.26759H5.22772C5.51954 2.26759 5.66128 2.40933 5.66128 2.70948V5.71105C5.66128 6.01954 5.51954 6.15294 5.22772 6.15294H2.20115ZM10.7723 6.15294C10.4805 6.15294 10.3387 6.01954 10.3387 5.71105V2.70948C10.3387 2.40933 10.4805 2.26759 10.7723 2.26759H13.7989C14.099 2.26759 14.2324 2.40933 14.2324 2.70948V5.71105C14.2324 6.01954 14.099 6.15294 13.7989 6.15294H10.7723ZM2.20115 16.5H5.22772C6.72017 16.5 7.42887 15.7913 7.42887 14.2822V11.289C7.42887 9.77149 6.72017 9.07113 5.22772 9.07113H2.20115C0.708702 9.07113 0 9.77149 0 11.289V14.2822C0 15.7913 0.708702 16.5 2.20115 16.5ZM10.7723 16.5H13.7989C15.2913 16.5 16 15.7913 16 14.2822V11.289C16 9.77149 15.2913 9.07113 13.7989 9.07113H10.7723C9.27983 9.07113 8.57113 9.77149 8.57113 11.289V14.2822C8.57113 15.7913 9.27983 16.5 10.7723 16.5ZM2.20115 14.7241C1.90099 14.7241 1.76759 14.5907 1.76759 14.2905V11.2806C1.76759 10.9805 1.90099 10.8387 2.20115 10.8387H5.22772C5.51954 10.8387 5.66128 10.9805 5.66128 11.2806V14.2905C5.66128 14.5907 5.51954 14.7241 5.22772 14.7241H2.20115ZM10.7723 14.7241C10.4805 14.7241 10.3387 14.5907 10.3387 14.2905V11.2806C10.3387 10.9805 10.4805 10.8387 10.7723 10.8387H13.7989C14.099 10.8387 14.2324 10.9805 14.2324 11.2806V14.2905C14.2324 14.5907 14.099 14.7241 13.7989 14.7241H10.7723Z"
            fill="#D3E9F5"
          />
        </svg>
      ),
      divider: false,
    },

    {
      name: 'Available to me',
      link: routes.available,
      icon: (
        <svg
          fill="none"
          height="19"
          viewBox="0 0 19 19"
          width="19"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.6476 8.45529C15.122 8.25024 16.2575 6.99808 16.2602 5.48254C16.2602 3.98888 15.1597 2.74948 13.7167 2.51526M15.5928 11.964C17.0212 12.1745 18.0185 12.6703 18.0185 13.691C18.0185 14.3936 17.5489 14.8493 16.79 15.1345M7.30093 12.3966C10.6982 12.3966 13.6019 12.906 13.6019 14.941C13.6019 16.976 10.7175 17.5 7.30093 17.5C3.90274 17.5 1 16.9951 1 14.9592C1 12.9233 3.8834 12.3966 7.30093 12.3966ZM7.30076 9.49233C5.07029 9.49233 3.26161 7.7034 3.26161 5.49616C3.26161 3.28893 5.07029 1.5 7.30076 1.5C9.53031 1.5 11.339 3.28893 11.339 5.49616C11.3473 7.69519 9.55149 9.48413 7.32931 9.49233H7.30076Z"
            stroke="#D3E9F5"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
          />
        </svg>
      ),
      divider: true,
    },

    {
      name: 'Item',
      link: '/',
      icon: (
        <svg
          fill="none"
          height="19"
          viewBox="0 0 19 19"
          width="19"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.6476 8.45529C15.122 8.25024 16.2575 6.99808 16.2602 5.48254C16.2602 3.98888 15.1597 2.74948 13.7167 2.51526M15.5928 11.964C17.0212 12.1745 18.0185 12.6703 18.0185 13.691C18.0185 14.3936 17.5489 14.8493 16.79 15.1345M7.30093 12.3966C10.6982 12.3966 13.6019 12.906 13.6019 14.941C13.6019 16.976 10.7175 17.5 7.30093 17.5C3.90274 17.5 1 16.9951 1 14.9592C1 12.9233 3.8834 12.3966 7.30093 12.3966ZM7.30076 9.49233C5.07029 9.49233 3.26161 7.7034 3.26161 5.49616C3.26161 3.28893 5.07029 1.5 7.30076 1.5C9.53031 1.5 11.339 3.28893 11.339 5.49616C11.3473 7.69519 9.55149 9.48413 7.32931 9.49233H7.30076Z"
            stroke="#D3E9F5"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
          />
        </svg>
      ),
      divider: true,
    },
  ],
};
