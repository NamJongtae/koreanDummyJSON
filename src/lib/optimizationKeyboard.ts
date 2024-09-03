/**
 * @param {React.KeyboardEvent<HTMLElement>} params.event - 키보드 이벤트 객체입니다.
 * @param {HTMLElement | null} params.previousTarget - 이전 포커싱 대상입니다.
 * @param {HTMLElement | null} [params.nextTarget] - 다음 포커싱 대상입니다.
 */
export const optimizationTabFocus = ({
  event,
  previousTarget,
  nextTarget
}: {
  event: React.KeyboardEvent<HTMLElement>;
  previousTarget: HTMLElement | null;
  nextTarget?: HTMLElement | null;
}) => {
  if (event.shiftKey && event.keyCode === 9 && previousTarget) {
    event.preventDefault();
    console.log(previousTarget);
    previousTarget.focus();
  } else if (nextTarget && event.keyCode === 9) {
    event.preventDefault();
    nextTarget.focus();
  }
};

export const escKeyClose = ({
  event,
  closeCb
}: {
  event: React.KeyboardEvent<HTMLElement>;
  closeCb: () => void;
}) => {
  if (event.keyCode === 27) {
    closeCb();
  }
};
