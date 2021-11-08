// format questions

export function formatQuestion(question, author) {
  const { id, optionOne, optionTwo } = question;
  const { name, avatarURL } = author;

  return { name, id, avatarURL, optionOne, optionTwo };
}

//   format date
export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-UK");
  return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}
