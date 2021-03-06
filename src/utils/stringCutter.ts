// Message length limit for twitch is 500 symbols
export const cutString = (str): string => {
  if (str.length < 460) { return str; }
  // Function firstly cut off the last part of message with "Read more ->",
  const readMorePart = str.slice(str.length - 16);
  // Then reduce message length to 400
  const shortString = str.slice(0, 440);
  // delete last word (in case of it's a piece of word)
  const words = shortString.split(' ');
  words.pop();
  // Returned string is short message with '... Read more ->' in the end
  return `${words.join(' ')}... ${readMorePart}`;
};
