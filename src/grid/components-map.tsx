import React from 'react';
import { NavLink } from 'react-router-dom';

import { ObjectContent } from 'src/pages/FilesPage/FilesTabs/ObjectPane/ObjectContent';
import { ObjectTable } from 'src/pages/FilesPage/FilesTabs/ObjectPane/ObjectTable/ObjectTable';
import { SearchResultSidebar } from 'src/pages/SearchResultPage/SearchResultSidebar/SearchResultSidebar';
import { DisplayingSettings } from 'src/pages/shared/ResultToolbar/DisplayingSettings/DisplayingSettings';
import { ResultToolbar } from 'src/pages/shared/ResultToolbar/ResultToolbar';
import { Pagination } from 'src/shared/Pagination/Pagination';

import { Box } from './Box/Box';
import { Button } from './Button/Button';
import { Categories } from './Categories/Categories';
import { Dropdown } from './Dropdown/Dropdown';
import { Fallback } from './Fallback/Fallback';
import { Icon } from './Icon/Icon';
import { IconButton } from './IconButton/IconButton';
import { Image } from './Image/Image';
import { Marker } from './Marker/Marker';
import { Menu } from './Menu/Menu';
import { Router } from './Router/Router';
import { Select } from './Select/Select';
import { Switch } from './Switch/Switch';
import { Tag } from './Tag/Tag';
import { Text } from './Text/Text';

export type GridComponentType<P = Record<string, unknown>> = React.ComponentType<P>;

export type GridComponentsRepository = {
  [componentKey: string]: GridComponentType<any>;
};

export const BaseComponentsMap = {
  // COMMON
  Button: Button,
  IconButton: IconButton,
  Marker: Marker,
  Tag: Tag,
  Box: Box,
  Text: Text,
  Icon: Icon,
  Dropdown: Dropdown,
  Select: Select,
  Image: Image,
  Menu: Menu,
  MenuItem: Menu.Item,
  MenuDivider: Menu.Divider,

  // OBJECT DISPLAY
  ObjectContent: ObjectContent,
  Toolbar: ResultToolbar,
  ObjectTable: ObjectTable,
  Pagination: Pagination,
  DisplayingSettings: DisplayingSettings,

  // LAYOUT
  Sidebar: SearchResultSidebar,

  // HEADER
  Categories: Categories,

  // NAVIGATION
  Router: Router,
  NavLink: NavLink,

  // Utils
  Switch: Switch,

  Fallback: Fallback,
};
