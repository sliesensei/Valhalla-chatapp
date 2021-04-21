import { LoremIpsum } from "lorem-ipsum";
import uniqid from 'uniqid';
import Discussion from "../types/Discussion";
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const discussions: Array<Discussion> = [
  {
    _id: 'conv-1',
    "name": "Toto",
    me: {
      name: "Maastrich",
      _id: '1'
    },
    "participants": [
      {
        name: "Participant 1",
        _id: '2',
      },
      {
        name: "Maastrich",
        _id: '1'
      }
    ],
    "messages": [
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(3),
        sender: '2',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(4),
        sender: '1',
        reply: '123'
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(3),
        sender: '2',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(4),
        sender: '1',
        reply: '123'
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(5),
        sender: '2',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(5),
        sender: '2',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(5),
        sender: '2',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(5),
        sender: '1',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(5),
        sender: '1',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(5),
        sender: '2',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(4),
        sender: '1',
        reply: '123'
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(3),
        sender: '2',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(4),
        sender: '1',
        reply: '123'
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(3),
        sender: '2',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(4),
        sender: '1',
        reply: '123'
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(3),
        sender: '2',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(4),
        sender: '1',
        reply: '123'
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(3),
        sender: '2',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(4),
        sender: '1',
        reply: '123'
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(3),
        sender: '2',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(4),
        sender: '1',
        reply: '123'
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(3),
        sender: '2',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(1),
        sender: '1',
        reply: '123'
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(4),
        sender: '1',
        reply: '123'
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(1),
        sender: '1',
        reply: '123'
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(3),
        sender: '2',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(4),
        sender: '1',
        reply: '123'
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(3),
        sender: '2',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(4),
        sender: '1',
        reply: '123'
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(3),
        sender: '2',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(4),
        sender: '1',
        reply: '123'
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(3),
        sender: '2',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(4),
        sender: '1',
        reply: '123'
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(3),
        sender: '2',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(4),
        sender: '1',
        reply: '123'
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(3),
        sender: '2',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(1),
        sender: '1',
        reply: '123'
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(2),
        sender: '2',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(6),
        sender: '1',
        reply: '123',
        date: new Date()
      }
    ]
  },
  {
    _id: 'conv-2',
    "name": "Conversation 2",
    me: {
      name: "Participant 2",
      _id: '1'
    },
    "participants": [
      {
        name: "Participant 1",
        _id: '2',
      },
      {
        name: "Participant 2",
        _id: '1'
      }
    ],
    "messages": [
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(3),
        sender: '2',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(1),
        sender: '1',
        reply: '123'
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(2),
        sender: '2',
      },
      {
        _id: uniqid(),
        contentType: 'text',
        content: lorem.generateSentences(6),
        sender: '1',
        reply: '123',
        date: new Date()
      }
    ]
  }
];

export default discussions;