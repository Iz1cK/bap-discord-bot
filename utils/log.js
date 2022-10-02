const timestamp = () =>
  `[${new Date().toLocaleString("en-US", { timeZone: "Asia/Jerusalem" })}]`;
const log = (...args) => console.log(timestamp(), ...args);
export default log;
