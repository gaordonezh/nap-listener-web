import type { ModalStateEnum } from './global.enum';

export type ModalStateProps<T> = null | {
  mode: ModalStateEnum;
  data?: T;
};
