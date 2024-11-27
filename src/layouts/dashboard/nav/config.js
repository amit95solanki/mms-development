// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Servant Management',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Pass Management',
    path: 'pass-management',
    icon: icon('ic_notification_chat'),
  },

  {
    title: 'Warnimg',
    path: 'warning',
    icon: icon('ic_disabled'),
  },

  {
    title: 'Report',
    path: 'report',
    icon: icon('ic_blog'),
  },
  {
    title: 'Alert & Notification',
    path: 'alert-notification',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
