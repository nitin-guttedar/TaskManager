import NetInfo from '@react-native-community/netinfo';

export function subscribeNet(cb) {
  const sub = NetInfo.addEventListener(state => {
    cb({ isConnected: !!state.isConnected });
  });
  return () => sub && sub();
}

export async function isOnline() {
  const s = await NetInfo.fetch();
  return !!s.isConnected;
}
