import inputLine from './inputLine';
import ip from './ip';
import commandHandling from './commandHandler';
export default (setIP, keywords, id, natives, commandHandler, commands) => {
    ip(setIP);
    commandHandling(natives, commandHandler, commands, keywords);
    inputLine(keywords, id);
};
//# sourceMappingURL=index.js.map