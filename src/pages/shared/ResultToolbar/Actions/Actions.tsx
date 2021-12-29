import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { RecladaObjectClass } from 'src/api/IRecladaObject';
import { EditDataSetModal } from 'src/pages/FilesPage/FilesTabs/DatasetsPane/shared/Modals/EditDataSetModal';
import { UploadDatasourceModal } from 'src/pages/FilesPage/FilesTabs/UploadDatasourceModal/UploadDatasourceModal';
import { ReactComponent as Delete } from 'src/resources/delete.svg';
import { ReactComponent as Pencil } from 'src/resources/pencil.svg';
import { ReactComponent as Plus } from 'src/resources/plus.svg';
import { useOpen } from 'src/utils/useOpen';

import { ToolbarContext } from '../ResultToolbar';
import style from '../ResultToolbar.module.scss';

export const Actions = observer(() => {
  const { objectClass } = useContext(ToolbarContext);

  const { isOpen: isOpenAddModal, open: openAddModal, close: closeAddModal } = useOpen();

  return (
    <div className={style.sectionContainer}>
      <button className={style.iconButton} onClick={openAddModal}>
        <Plus />
      </button>
      <button className={style.iconButton}>
        <Pencil />
      </button>
      <button className={style.iconButton}>
        <Delete />
      </button>

      {objectClass === RecladaObjectClass.DataSet ? (
        <EditDataSetModal
          handleCancel={closeAddModal}
          handleOk={closeAddModal}
          isCreationType
          opened={isOpenAddModal}
        />
      ) : (
        <UploadDatasourceModal isOpen={isOpenAddModal} onClose={closeAddModal} />
      )}
    </div>
  );
});
