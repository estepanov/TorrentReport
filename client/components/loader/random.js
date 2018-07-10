const messagesArr = [
  'That rug really tied the room together, did it not? -Walter Sobchak',
  "Hey, careful, man, there's a beverage here! -The Dude",
  'Requesting the data from the cloud. Sending it back by rain.',
  'Does this make my load look big?',
  'This is your last chance. After this, there is no turning back. You take the blue pill - the story ends, you wake up in your bed and believe whatever you want to believe. You take the red pill - you stay in Wonderland and I show you how deep the rabbit-hole goes. -Morpheus',
  'What are you trying to tell me? That I can dodge bullets? -Neo',
  "Remember... all I'm offering is the truth. Nothing more. -Morpheus",
  "I'm trying to free your mind, Neo. But I can only show you the door. You're the one that has to walk through it. -Morpheus",
  'You have to let it all go, Neo. Fear, doubt, and disbelief. Free your mind. -Morpheus',
  'Fly me to the moon and let me play among the stars. Let me see what spring is like on Jupiter and Mars. -Frank Sinatra',
  'Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me. -Michael Scott',
  'And I knew exactly what to do. But in a much more real sense, I had no idea what to do. -Michael Scott',
  "You know what they say. 'Fool me once, strike one, but fool me twice...strike three.. -Michael Scott",
  "They're in the computer? -Hansel",
  "Building the Derek Zoolander Center For Kids Who Can't Read Good And Wanna Learn To Do Other Stuff Good Too",
  "Sorry, Maury. I'm not a gymnast. -Derek Zoolander",
  "A eugoogalizor, one who speaks at funerals. Or did you think I'd be too stupid to know what a eugoogoly was? -Derek Zoolander",
];

const randomNumber = () => {
  const min = 0;
  const max = messagesArr.length - 1;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default () => messagesArr[randomNumber()];
