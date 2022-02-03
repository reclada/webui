import { ReactComponent as AccountIcon } from 'src/resources/account.svg';
import { ReactComponent as ArrowDownIcon } from 'src/resources/arrow-down.svg';
import { ReactComponent as ArrowLeftIcon } from 'src/resources/arrow-left.svg';
import { ReactComponent as BuildingIcon } from 'src/resources/building.svg';
import { ReactComponent as TileIcon } from 'src/resources/card-view.svg';
import { ReactComponent as CardViewIcon } from 'src/resources/card-view.svg';
import { ReactComponent as DeleteIcon } from 'src/resources/delete.svg';
import { ReactComponent as FilterIcon } from 'src/resources/filter.svg';
import { ReactComponent as ChemistryIcon } from 'src/resources/formula.svg';
import { ReactComponent as GlobalIcon } from 'src/resources/global.svg';
import { ReactComponent as ListViewIcon } from 'src/resources/list-view.svg';
import { ReactComponent as MathIcon } from 'src/resources/math.svg';
import { ReactComponent as NotificationsIcon } from 'src/resources/notifications.svg';
import { ReactComponent as EditIcon } from 'src/resources/pencil.svg';
import { ReactComponent as AddIcon } from 'src/resources/plus.svg';
import { ReactComponent as RedoIcon } from 'src/resources/redo.svg';
import { ReactComponent as SearchIcon } from 'src/resources/search.svg';
import { ReactComponent as SettingsFilledIcon } from 'src/resources/settings-filled.svg';
import { ReactComponent as SettingsIcon } from 'src/resources/settings.svg';
import { ReactComponent as SortIcon } from 'src/resources/sort.svg';
import { ReactComponent as TableViewIcon } from 'src/resources/table-view.svg';
import { ReactComponent as UndoIcon } from 'src/resources/undo.svg';

export const iconLibrary: Record<
  string,
  React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >
> = {
  global: GlobalIcon,
  search: SearchIcon,
  tile: TileIcon,
  chemistry: ChemistryIcon,
  building: BuildingIcon,
  math: MathIcon,
  account: AccountIcon,
  settings: SettingsIcon,
  filter: FilterIcon,
  sort: SortIcon,
  notifications: NotificationsIcon,
  add: AddIcon,
  edit: EditIcon,
  delete: DeleteIcon,
  undo: UndoIcon,
  redo: RedoIcon,
  'settings-filled': SettingsFilledIcon,
  'arrow-left': ArrowLeftIcon,
  'arrow-down': ArrowDownIcon,
  'card-view': CardViewIcon,
  'list-view': ListViewIcon,
  'table-view': TableViewIcon,
};
