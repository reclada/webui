import { useEffect, useState } from 'react';

import { getDatasourceDownloadLink } from 'src/api/dataSourceDataGateService';

export function useFileUrl(id: string, active: boolean): string {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (active) {
      getDatasourceDownloadLink(id).then(link => setUrl(link));
    }
  }, [id, active]);

  return url;
}
