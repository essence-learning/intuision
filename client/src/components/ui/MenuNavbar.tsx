import { useState } from 'react';
import {
  IconBellRinging,
  IconSchool,
  IconBook,
  IconSettings,
  IconUserCircle,
  IconLogout,
} from '@tabler/icons-react';
import classes from './MenuNavbar.module.css';

const data = [
  { link: '', label: 'Notifications', icon: IconBellRinging },
  { link: '', label: 'Courses', icon: IconSchool },
  { link: '', label: 'Textbooks', icon: IconBook },
  { link: '', label: 'Settings', icon: IconSettings },
];

export function MenuNavbar() {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
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