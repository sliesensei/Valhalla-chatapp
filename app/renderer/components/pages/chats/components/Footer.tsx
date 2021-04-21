import React, { SyntheticEvent } from 'react';
import { ClickAwayListener, InputBase } from "@material-ui/core";
import { Happy, Send, AddCircle, ThumbsUp } from 'react-ionicons';
import * as Emoji from 'emoji-mart';
import AllEmojiData from 'emoji-mart/data/facebook.json'
import useStyles from '../styles/footer.styles';

import 'emoji-mart/css/emoji-mart.css'
import Show from '../../../Show';

class InputString extends String {
  splice(offset: number, text: string, removeCount: number = 0) {
    let calculatedOffset = offset < 0 ? this.length + offset : offset;
    return new InputString(this.substring(0, calculatedOffset) +
      text + this.substring(calculatedOffset + removeCount));
  }
}
export default function Footer({ onSend, scrollToBottom }) {
  const classes = useStyles();
  const [message, setMessage] = React.useState<InputString>(new InputString(''));
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>();
  const pickerRef = React.useRef<HTMLDivElement>();
  const triggerPickerRef = React.useRef();

  // const { ref: inputRef, updateCaret, start, end } = useCaretPosition();

  const handleMessageInput = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(new InputString(e.target.value));
  }, [message]);

  React.useEffect(() => {
  }, [])
  const handleAddEmoji = React.useCallback((data) => {
    const { selectionStart: start, selectionEnd: end } = inputRef.current;
    inputRef.current.value = new InputString(inputRef.current.value).splice(start, data.native, end - start).toString();
    // @ts-ignore
    handleMessageInput({
      target: inputRef.current
    });
    inputRef.current.focus();
    Object.assign(inputRef.current, {
      selectionStart: start + data.native.length,
      selectionEnd: start + data.native.length
    })
  }, [message]);

  const handleEmojiPicker = React.useCallback(() => {
    console.log("handleEmojiPicker", showEmojiPicker)
    setShowEmojiPicker(!showEmojiPicker);
  }, [showEmojiPicker]);

  const handleKeyPress = React.useCallback((e) => {
    if (e?.key === 'Enter') {
      handleSendMessage();
    }
  }, []);

  const handleSendMessage = React.useCallback(() => {
    if (message.length) {
      onSend(message);
      setMessage(new InputString());
    }
    scrollToBottom();
  }, [message]);

  return (
    <div className={classes.root}>
      <div className={classes.start}>
        <AddCircle color='#0d76ff' />
      </div>
      <div className={classes.center}>
        <div className={classes.textFieldContainer}>
          <InputBase
            fullWidth
            value={message.toString()}
            className={classes.textField}
            ref={triggerPickerRef}
            inputRef={inputRef}
            inputProps={{
              onSubmit: () => { console.log('submit') },
              className: classes.textFieldInput
            }}
            onChange={handleMessageInput}
            endAdornment={
              <Happy
                // ref={triggerPickerRef}
                color='#0d76ff'
                cssClasses={classes.emojiPickerToggleButton}
                onClick={handleEmojiPicker} />}
            // onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            multiline
            rowsMax={7}
          />
          {/* <div className={classes.emojiPickerToggleButton}> */}
          {/* </div> */}
        </div>
        <Show show={showEmojiPicker}>
          <ClickAwayListener onClickAway={handleEmojiPicker}>
            <div id="picker-div" className={classes.emojiPicker} ref={pickerRef}>
              <Emoji.Picker
                showPreview={false}
                theme='dark'
                set='facebook'
                style={{
                  borderRadius: 0,
                  opacity: 0.9,
                  backdropFilter: 'blur(10px)',
                }}
                showSkinTones={false}
                onSelect={handleAddEmoji}
              />
            </div>
          </ClickAwayListener>
        </Show>
      </div>
      <div className={classes.end}>
        {message.length ? <Send
          color='#0d76ff'
          onClick={handleSendMessage}
        /> : <ThumbsUp color='#0d76ff'></ThumbsUp>}
      </div>
    </div>
  )
}