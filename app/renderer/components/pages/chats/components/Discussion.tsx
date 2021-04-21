import React, { RefObject } from 'react';
import uniqid from 'uniqid';

import useStyles from '../styles/discussion.styles';
import MessageSection from './MessageSection';
import Header from './Header';
import Footer from './Footer';
import Discussion from '../types/Discussion';
import Message from '../types/Message';
import { useRouter } from 'next/router';

export interface DiscussionProps {
  discussion: Discussion
};


export default function MainDiscussion({ discussion }: DiscussionProps) {
  const router = useRouter();
  const classes = useStyles();
  const bottomRef = React.createRef<HTMLDivElement>();
  const mainRef = React.createRef<HTMLDivElement>();
  const footerRef = React.createRef<HTMLDivElement>();

  const handleSendMessage = React.useCallback((message) => {
    console.log('parent send message');
    discussion.messages.push({
      _id: uniqid('message-'),
      contentType: 'text',
      content: message,
      sender: '1',
      reply: undefined
    });
    // refreshDisplay();
  }, []);

  const chats = React.useMemo(() => {
    console.log('recompute bitch')
    const mainArray: Array<{ chatList: Array<Message>, className: string }> = [];
    let previous = undefined;
    let arr = [];
    for (let message of (discussion?.messages ?? [])) {
      if (message.sender === discussion.me._id && previous !== discussion.me._id) {
        if (arr.length) {
          mainArray.push({
            className: classes.messageLeft,
            chatList: arr
          })
          arr = [];
        }
      } else if (message.sender !== discussion.me._id && previous === discussion.me._id) {
        if (arr.length) {
          mainArray.push({
            className: classes.messageRight,
            chatList: arr,
          });
          arr = [];
        }
      }
      previous = message.sender;
      arr.push(message);
    }

    if (arr.length) {
      mainArray.push({
        className: previous === discussion.me._id ? classes.messageRight : classes.messageLeft,
        chatList: arr
      })
    }

    return mainArray;

  }, [discussion, router]);

  const scrollToBottom = React.useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [bottomRef]);

  React.useEffect(() => {
    scrollToBottom();
    mainRef.current.addEventListener('resize', () => { console.log('here'); scrollToBottom() });
    footerRef.current.addEventListener('resize', () => { console.log('here'); scrollToBottom() });
    var objDiv = document.getElementById("chat-container");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Header name={discussion.name} />
      </div>
      <div className={classes.main} ref={mainRef}>
        <div id="chat-container" className={classes.messageList}>
          {chats.map((sectionProps, index) => (
            <MessageSection key={index} {...sectionProps} />
          ))}
        </div>
        <div id="dummy-scroll-div" ref={bottomRef} />
      </div>
      <div ref={footerRef} className={classes.footer}>
        <Footer onSend={handleSendMessage} scrollToBottom={scrollToBottom} />
      </div>
    </div>
  )

}