import React from 'react';
import useStyles from '../../components/pages/chats/styles/layout.styles';
import Fake from '../../components/pages/chats/fakedata/discussions';
import SideBar from '../../components/pages/chats/components/Sidebar';
import Discussion from '../../components/pages/chats/components/Discussion';

export default function Chat() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <SideBar discussions={Fake}></SideBar>
      </div>
      <div className={classes.main}>
        {/* <Discussion /> */}
      </div>
    </div>
  )
}

