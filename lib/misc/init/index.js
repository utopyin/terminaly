/// <reference lib="es2017.object"/>
import inputLine from './inputLine';
import ip from './ip';
import commandHandling from './commandHandler';
export default (setIP, keywords, id, natives, commandHandler, nativeHandler, commands) => {
    ip(setIP);
    commandHandling(natives, commandHandler, nativeHandler, commands, keywords);
    inputLine(keywords, id);
};
//# sourceMappingURL=index.js.map