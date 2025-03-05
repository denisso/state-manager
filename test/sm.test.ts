import { StateManager } from "../src";

type TestState = {
  count: number;
};

class TestStateManager extends StateManager<TestState> {
  public state: TestState;
  constructor(state: TestState) {
    super(state);
    this.state = this._buildRoot() as TestState;
  }
}

describe("StateManager", () => {
  it("init", () => {
    const sm = new TestStateManager({ count: 0 });
    expect(sm.state.count).toBe(0);
  });

  it("observation to the state change", () => {
    const sm = new TestStateManager({ count: 0 });
    const mockFn = jest.fn();
    sm.attach("count", mockFn);
    sm.state.count = 10;
    expect(mockFn).toHaveBeenCalledWith(10);
  });
});
