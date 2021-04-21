import { useRouter } from "next/router";
import ReactRoundedImage from 'react-rounded-image';
import useStyles from '../styles/sidebar.styles';
import Discussion from "../types/Discussion";
import moment from 'moment';
import Message from "../types/Message";

export default function SideBar({ discussions }: {
  discussions: Discussion[]
}) {
  const router = useRouter();
  const classes = useStyles();
  const { chatId } = router.query;

  const getLast = (discussion: Discussion) => {
    const message = discussion.messages[discussion.messages.length - 1];
    const sender = discussion.participants.find((participant) => message.sender === participant._id)
    const time = moment.duration(message.date.toString());
    console.log(time)
    console.log(`${message.date.getDay()} ${message.date.toTimeString()}`);
    return {
      sender: sender.name,
      message: message.content,
      time: message.date.toDateString() === new Date().toDateString()
        ? `${message.date.getHours()}:${message.date.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`
        : `${message.date.getDay()} ${message.date.getMonth()}`
    }
  }

  return (
    <div className={classes.root}>
      {discussions.map((discussion) => (
        <div
          key={`conversation-${discussion._id}`}
          onClick={() => {
            router.push(`/chats/${discussion._id}`);
            console.log('pushed', discussion._id);
          }}
          className={chatId === discussion._id ? classes.rowSelected : classes.row}>
          <div className={classes.rowImage}>
            <img
              className={classes.image}
              src="https://i.pinimg.com/564x/51/f6/fb/51f6fb256629fc755b8870c801092942.jpg"
              alt='avatar'
            />
          </div>
          <h4 className={classes.rowName}>
            {discussion.name}
          </h4>
          <div className={classes.rowPreview}>
            <div className={classes.rowPreviewSender}>
              {`${getLast(discussion).sender}: `}
            </div>
            <div className={classes.rowPreviewMessage}>
              {` ${getLast(discussion).message}`}
            </div>
            <div className={classes.rowPreviewTime}>
              {`${getLast(discussion).time}`}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}