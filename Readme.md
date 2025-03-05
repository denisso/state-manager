# StateManager.js

A lightweight state management library with an observer pattern. Designed for React and other JavaScript applications that require efficient state updates without unnecessary re-renders.

## ✅ Features

# Features of the Lightweight Subscription System

1. 🔄 **Reactivity Without External Libraries**
   - You have created a lightweight subscription system (observer pattern) that allows components to update when the state changes without using Redux/Zustand/Recoil.
   - Components receive up-to-date data without unnecessary re-renders.

2. ⚡ **High Performance**
   - Changes are tracked at the level of individual properties, rather than through a common `useState` or `useReducer`.
   - Only subscribed components are updated, not the entire state manager.

3. 🔧 **Flexibility in Extension**
   - The abstract class `StateManager<T>` can be used for different types of states.
   - You can create specific state managers (e.g., `StateManagerPublic`) while retaining basic functionality.

4. 🔐 **Encapsulation and Data Protection**
   - `_state` is hidden, so changes can only occur through a Proxy, ensuring the notification system works correctly.

5. 🛠 **Automatic Method Binding**
   - You use `Reflect.get(target, prop, receiver)` and `Reflect.set(...)`, making the proxy universal and allowing it to work with both simple fields and methods.
   - Methods can be wrapped in an observer, which is especially useful for business logic.

6. 🎯 **Clean API for Subscription**
   - `attach` and `detach` make event subscription clear and convenient.
   - `attach("property", callback)` – minimal code for subscribing to any property.

7. 🌍 **Suitable for Global State**
   - Using `clientSingletonBuilder` makes the manager a singleton, which is convenient for global data storage.

8. 🖼️ **No Unnecessary Re-renders in React**
   - Access to state is direct through the singleton (`sm().state.property`), not through `useState` or `useReducer`.
   - Components do not re-render when the state changes unless they are subscribed via `attach`.
   - Unlike `useState`, only specific fields are tracked, not the entire state object.
   - You can manage updates more granularly than in Redux, where changes in the store often lead to re-rendering of the entire subscribed component.


## 🚀 Installation

You can install it using npm:

```sh
npm install @mr_dramm/state-manager
```

or with yarn:

```sh
yarn add @mr_dramm/state-manager
```

## 📖 Usage

### Creating a State Manager

```ts
import { StateManager } from "@mr_dramm/state-manager";

type State = {
  count: number;
};

class CounterStateManager extends StateManager<State> {
  public state: State;
  constructor(state: State) {
    super(state);
    this.state = this._buildRoot() as State;
  }
}

const sm = new CounterStateManager({ count: 0 });

sm.attach("count", (value) => {
  console.log("Count changed to:", value);
});

sm.state.count = 5; // Logs: "Count changed to: 5"
```

### Using StateManager in React

```tsx
import sm from "@/StateManager";

const CounterComponent = () => {
  React.useEffect(() => {
    const handler = (count: number) => {
      console.log("Count updated:", count);
    };

    sm().attach("count", handler);
    return () => sm().detach("count", handler);
  }, []);

  return <button onClick={() => sm().state.count++}>Increment</button>;
};
```



## 🛠️ Development

Clone the repository:

```sh
git clone https://github.com/your-username/state-manager.git
cd state-manager
npm install
```

Run tests:

```sh
npm test
```

## 📄 License

MIT License © 2025 Denis Kurochkin
