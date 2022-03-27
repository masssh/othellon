import { Cell, CellState } from "./Cell"

export class Board {
    MAX_ROW = 8
    MAX_COL = 8
    game!: Phaser.Game

    cells: Cell[][] = []
    black_candidates: boolean[][] = []
    white_candidates: boolean[][] = []

    constructor() {
        if (this.MAX_ROW % 2 === 1) throw Error("MAX_ROW must be even number")
        if (this.MAX_COL % 2 === 1) throw Error("MAX_COL must be even number")
        // instantiate game instance
        this.initializeGame()
        // initialize arrays
        for (let i = 0; i < this.MAX_ROW; i++) {
            this.cells.push([])
            this.black_candidates.push([])
            this.white_candidates.push([])
            for (let j = 0; j < this.MAX_COL; j++) {
                this.cells[i].push(new Cell("empty", null, null, null, null))
                this.black_candidates[i].push(false)
                this.white_candidates[i].push(false)
            }
        }
        // set cell references
        for (let i = 0; i < this.MAX_ROW; i++) {
            for (let j = 0; j < this.MAX_COL; j++) {
                if (i - 1 >= 0) this.cells[i][j].up = this.cells[i - 1][j]
                if (j - 1 >= 0) this.cells[i][j].left = this.cells[i][j - 1]
                if (j + 1 < this.MAX_COL) this.cells[i][j].right = this.cells[i][j + 1]
                if (i + 1 < this.MAX_ROW) this.cells[i][j].down = this.cells[i + 1][j]
            }
        }
        // set initial stones
        this.put("black", (this.MAX_ROW / 2) - 1, (this.MAX_COL / 2) - 1)
        this.put("white", (this.MAX_ROW / 2) - 1, this.MAX_COL / 2)
        this.put("black", this.MAX_ROW / 2,( this.MAX_COL / 2) - 1)
        this.put("white", this.MAX_ROW / 2, this.MAX_COL / 2)
        this.updateCandidates()

    }

    async initializeGame() {
        const Phaser = await import("phaser")
        const config: Phaser.Types.Core.GameConfig = {
              type: Phaser.AUTO,
              width: 800,
              height: 600,
              scene: {
                preload: this.preload(),
                create: this.create()
              }
          }
          this.game = new Phaser.Game(config)
      }

    preload() {
        return function preload(this: Phaser.Scene) {
            this.load.setBaseURL("http://localhost:3000")
            this.load.image("empty", "empty.png")
            this.load.image("black", "black_stone.png")
            this.load.image("white", "white_stone.png")
        }
    }

    create() {
        return function(this: Phaser.Scene, data: object) {
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
            this.add.group
        }
    }

    async put(state: CellState, row: number, col: number) {
        if (row < 0 || row >= this.MAX_ROW) throw Error("invalid row")
        if (col < 0 || col >= this.MAX_COL) throw Error("invalid col")
        if (!this.cells[row][col] === null) return 
        this.cells[row][col].put(state)
        await this.updateCandidates()
    }

    async updateCandidates() {
        for (let i = 0; i < this.MAX_ROW; i++) {
            for (let j = 0; j < this.MAX_COL; j++) {
                this.black_candidates[i][j] = await this.cells[i][j].canPut("black")
                this.white_candidates[i][j] = await this.cells[i][j].canPut("white")
            }
        }
    } 
}
