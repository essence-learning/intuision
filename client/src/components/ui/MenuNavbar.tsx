import {
  IconBellRinging,
  IconSchool,
  IconBook,
  IconSettings,
  IconUserCircle,
  IconLogout,
} from '@tabler/icons-react';
import classes from './MenuNavbar.module.css';
import { Link, useLocation } from 'react-router-dom';

const data = [
  { link: '/textbooks', label: 'My Books', icon: IconBook },
  { link: '/courses', label: 'Courses', icon: IconSchool },
  { link: '', label: 'Notifications', icon: IconBellRinging },
  { link: '', label: 'Settings', icon: IconSettings },
];

export function MenuNavbar() {
  const location = useLocation();

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={location.pathname === item.link || undefined}
      to={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconUserCircle className={classes.linkIcon} stroke={1.5} />
          <span>Profile</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}