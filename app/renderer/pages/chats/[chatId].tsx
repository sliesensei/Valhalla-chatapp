import React from 'react';
import useStyles from '../../components/pages/chats/styles/layout.styles';
import Discussion from '../../components/pages/chats/components/Discussion';
import { useRouter } from 'next/router';
import Fake from '../../components/pages/chats/fakedata/discussions';
import SideBar from '../../components/pages/chats/components/Sidebar';
import Show from '../../components/Show';

export default function Chat() {
  const router = useRouter();
  const classes = useStyles();
  const { chatId } = router.query;
  console.log('render', chatId);
  const discussion = Fake.find((each) => each._id === chatId)
  console.log(discussion);

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <SideBar discussions={Fake}></SideBar>
      </div>
      <div className={classes.main}>
        <Discussion discussion={Fake.find((each) => each._id === chatId)} />
      </div>
    </div>
  )
}

