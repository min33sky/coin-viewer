import { atom } from 'recoil';

export const isDarkAtom = atom({
  key: 'coin_viewer_dark_mode',
  default: false,
  effects: [
    ({ onSet, node, setSelf }) => {
      //? 기존 설정값이 있을 경우
      const isCached = localStorage.getItem(node.key);
      if (isCached) {
        setSelf(JSON.parse(isCached));
      }

      //? 상태가 변경될 때 처리
      onSet((newValue) => {
        localStorage.setItem(node.key, JSON.stringify(newValue));
      });
    },
  ],
});
