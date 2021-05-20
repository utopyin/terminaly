import publicIp from 'public-ip';

export default function(setIP: React.Dispatch<React.SetStateAction<string | null>>) {
  (async () => {try {setIP(await publicIp.v4())} catch{}})();
}