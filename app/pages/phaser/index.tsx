import { useEffect, useState } from "react";

const HelloPage = () => {
  const [game, setGame] = useState<Phaser.Game | null>(null)
  
  useEffect(() => {
    if (game == null) {
      (async () => {
        const Phaser = await import("phaser")
        const config: Phaser.Types.Core.GameConfig = {
          type: Phaser.AUTO,
          width: 800,
          height: 600,
          scene: {
            preload: preload,
            create: create
          }
        }
        setGame(new Phaser.Game(config))
      })()
    }
  }, [game])

  function preload(this: Phaser.Scene) {
    this.load.setBaseURL("http://localhost:3000")
    this.load.image("empty", "empty.png")
    this.load.image("black", "black_stone.png")
    this.load.image("white", "white_stone.png")
  }
  
  function create(this: Phaser.Scene, data: object) {
    this.add.image(400, 300, "test")
    const xMargin = 160;
    const yMargin = 110;
    const elementSize = 60;
    for (let i = 0; i < 8; i++) {
      const x = xMargin + elementSize * i
      for (let j = 0; j < 8; j++) {
        const y = yMargin + elementSize * j
        this.add.image(x, y, "empty")
      }
    }
  }
  
  return (
    <div>
      <h1>Hello, phaser</h1>
    </div>
  )
}

export default HelloPage
