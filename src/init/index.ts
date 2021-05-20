import inputLine from './inputLine';
import ip from './ip';

export default (setIP: React.Dispatch<React.SetStateAction<string | null>>) => {
  inputLine();
  ip(setIP);
}