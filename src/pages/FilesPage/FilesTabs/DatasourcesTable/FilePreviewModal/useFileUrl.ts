import { useEffect, useState } from 'react';

import { getDatasourceDownloadLink } from 'src/api/dataSourceDataGateService';

export function useFileUrl(id: string): string {
  const [url, setUrl] = useState('');

  useEffect(() => {
    getDatasourceDownloadLink(id).then(link => setUrl(link));
  }, [id]);

  return url;
}
