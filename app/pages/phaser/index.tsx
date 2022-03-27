import { useCallback, useEffect, useState } from "react";

import { Board } from "./Board";


const HelloPage = () => {
  const [board, setBoard] = useState<Board | null>(null)

  const render = useCallback(async () => {
    if (board == null) {
      setBoard(new Board())
    }
  }, [board])

  useEffect(() => {
    render()
  }, [render])

  return (
    <div>
      <h1>Hello, phaser</h1>
    </div>
  )
}

export default HelloPage
