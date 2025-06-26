import {
  optimizationTabFocus,
  escKeyClose
} from "../../lib/optimizationKeyboard";

describe("optimizationTabFocus", () => {
  it("shift+Tab이면 previousTarget.focus와 preventDefault가 호출된다", () => {
    const focus = jest.fn();
    const preventDefault = jest.fn();
    const event = { shiftKey: true, keyCode: 9, preventDefault } as unknown as React.KeyboardEvent<HTMLElement>;
    optimizationTabFocus({
      event,
      previousTarget: { focus } as unknown as HTMLElement
    });
    expect(preventDefault).toHaveBeenCalled();
    expect(focus).toHaveBeenCalled();
  });

  it("Tab + nextTarget 있으면 nextTarget.focus와 preventDefault가 호출된다", () => {
    const focus = jest.fn();
    const preventDefault = jest.fn();
    const event = { shiftKey: false, keyCode: 9, preventDefault } as unknown as React.KeyboardEvent<HTMLElement>;
    optimizationTabFocus({
      event,
      previousTarget: null,
      nextTarget: { focus } as unknown as HTMLElement
    });
    expect(preventDefault).toHaveBeenCalled();
    expect(focus).toHaveBeenCalled();
  });

  it("Tab + nextTarget 없으면 아무것도 호출되지 않는다", () => {
    const preventDefault = jest.fn();
    const event = { shiftKey: false, keyCode: 9, preventDefault } as unknown as React.KeyboardEvent<HTMLElement>;
    optimizationTabFocus({ event, previousTarget: null });
    expect(preventDefault).not.toHaveBeenCalled();
  });

  it("다른 키를 누르면 아무것도 호출되지 않는다", () => {
    const preventDefault = jest.fn();
    const focus = jest.fn();
    const event = { shiftKey: false, keyCode: 13, preventDefault } as unknown as React.KeyboardEvent<HTMLElement>;
    optimizationTabFocus({
      event,
      previousTarget: { focus } as unknown as HTMLElement
    });
    expect(preventDefault).not.toHaveBeenCalled();
    expect(focus).not.toHaveBeenCalled();
  });
});

describe("escKeyClose", () => {
  it("keyCode 27(ESC)이면 closeCb가 호출된다", () => {
    const closeCb = jest.fn();
    const event = { keyCode: 27 } as React.KeyboardEvent<HTMLElement>;
    escKeyClose({ event, closeCb });
    expect(closeCb).toHaveBeenCalled();
  });

  it("ESC가 아니면 closeCb가 호출되지 않는다", () => {
    const closeCb = jest.fn();
    const event = { keyCode: 13 } as React.KeyboardEvent<HTMLElement>;
    escKeyClose({ event, closeCb });
    expect(closeCb).not.toHaveBeenCalled();
  });
});
