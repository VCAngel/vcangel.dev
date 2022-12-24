import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";

interface ICounter {
  start: number;
}

export default function Counter(props: ICounter) {
  const [count, setCount] = useState(props.start);
  return (
    <div>
      <p>{count}</p>
      <Button onClick={() => setCount(count - 1)}>-1</Button>
      <Button onClick={() => setCount(count + 1)}>+1</Button>
    </div>
  );
}
