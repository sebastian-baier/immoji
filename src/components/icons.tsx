import {
  mdiApple,
  mdiArrowLeft,
  mdiArrowRight,
  mdiClose,
  mdiCogOutline,
  mdiFacebook,
  mdiGarage,
  mdiGarageAlert,
  mdiGarageOpen,
  mdiGithub,
  mdiGoogle,
  mdiHomeAccount,
  mdiHomeAlert,
  mdiHomeClock,
  mdiLogin,
  mdiLogout,
  mdiMenu,
  mdiOfficeBuilding,
  mdiOfficeBuildingCog,
  mdiOfficeBuildingRemove,
  mdiPlus,
  mdiViewDashboardVariant,
} from '@mdi/js';
import Icon from '@mdi/react';
import { IconProps } from '@mdi/react/dist/IconProps';

export const Icons = {
  settings: (props: Omit<IconProps, 'path'>) => <Icon size={1} path={mdiCogOutline} {...props} />,
  logout: (props: Omit<IconProps, 'path'>) => <Icon size={1} path={mdiLogout} {...props} />,
  login: (props: Omit<IconProps, 'path'>) => <Icon size={1} path={mdiLogin} {...props} />,
  dashboard: (props: Omit<IconProps, 'path'>) => (
    <Icon size={1} path={mdiViewDashboardVariant} {...props} />
  ),
  arrowLeftRight: (props: Omit<IconProps, 'path'>) => (
    <Icon size={1} path={mdiArrowRight} {...props} />
  ),
  menu: (props: Omit<IconProps, 'path'>) => <Icon size={1} path={mdiMenu} {...props} />,
  plus: (props: Omit<IconProps, 'path'>) => <Icon size={1} path={mdiPlus} {...props} />,
  close: (props: Omit<IconProps, 'path'>) => <Icon size={1} path={mdiClose} {...props} />,
  garage: (props: Omit<IconProps, 'path'>) => <Icon size={1} path={mdiGarage} {...props} />,
  garageOpen: (props: Omit<IconProps, 'path'>) => <Icon size={1} path={mdiGarageOpen} {...props} />,
  garageAlert: (props: Omit<IconProps, 'path'>) => (
    <Icon size={1} path={mdiGarageAlert} {...props} />
  ),
  home: (props: Omit<IconProps, 'path'>) => <Icon size={1} path={mdiHomeAccount} {...props} />,
  homeAlert: (props: Omit<IconProps, 'path'>) => <Icon size={1} path={mdiHomeAlert} {...props} />,
  homeClock: (props: Omit<IconProps, 'path'>) => <Icon size={1} path={mdiHomeClock} {...props} />,
  apartment: (props: Omit<IconProps, 'path'>) => (
    <Icon size={1} path={mdiOfficeBuilding} {...props} />
  ),
  apartmentCog: (props: Omit<IconProps, 'path'>) => (
    <Icon size={1} path={mdiOfficeBuildingCog} {...props} />
  ),
  apartmentRemove: (props: Omit<IconProps, 'path'>) => (
    <Icon size={1} path={mdiOfficeBuildingRemove} {...props} />
  ),
  github: (props: Omit<IconProps, 'path'>) => <Icon size={1} path={mdiGithub} {...props} />,
  google: (props: Omit<IconProps, 'path'>) => <Icon size={1} path={mdiGoogle} {...props} />,
  facebook: (props: Omit<IconProps, 'path'>) => <Icon size={1} path={mdiFacebook} {...props} />,
  apple: (props: Omit<IconProps, 'path'>) => <Icon size={1} path={mdiApple} {...props} />,
};
