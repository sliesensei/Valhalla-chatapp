import { Grid } from '@material-ui/core';
import { mboxParser } from 'mbox-to-json';
import Show from '../../../Show';
import useStyles from '../styles/messagesSection.styles'
import Message from '../types/Message';

export interface MessageSectionProps {
  className: string,
  chatList: Array<Message>
}

export default function MessageSection({ chatList, className }: MessageSectionProps) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      {chatList.map((message, index) => (
        <Grid item xs={12} className={className} key={`message-${message._id}`}>
          <div>
            {message.content.split('\n').map((line, lineindex, arr) => (
              <p className={classes.p} key={`line-${index}-${lineindex}`}>
                {line}
                <Show show={index !== arr.length - 1 && line.length}> <br /></Show>
              </p>
            ))}
          </div>
        </Grid>
      ))}
    </Grid>
  )
}