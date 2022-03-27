export type CellState = "empty" | "black" | "white"

export class Cell {
    private state: CellState
    up: Cell | null = null
    left: Cell | null = null
    right: Cell | null = null
    down: Cell | null = null

    constructor(
        state: CellState,
        up: Cell | null,
        left: Cell | null,
        right: Cell | null,
        down: Cell | null
    ) {
        this.state = state
        this.up = up
        this.left = left
        this.right = right
        this.down = down
    }

    flip() {
        if (this.state === "black") this.state = "white"
        if (this.state === "white") this.state = "black"
    }

    async canPut(state: CellState): Promise<boolean> {
        if (state === "empty") throw Error("state must be black or white")
        if (this.state !== "empty") return false
        const up = this.validateUpToDown(state)
        const left = this.validateLeftToRight(state)
        const right = this.validateRightToLeft(state)
        const down = this.validateDownToUp(state)
        return Promise.all([up, left, right, down]).then((values) => {
            return values.some((value) => value)
        })
    }

    async put(state: CellState) {
        this.state = state
        this.flipUpToDown(state)
        this.flipLeftToRight(state)
        this.flipRightToLeft(state)
        this.flipDownToUp(state)
    }

    async validateUpToDown(upState: CellState): Promise<boolean> {
        if (upState === this.state) return false
        if (this.down === null) return false
        if (this.down.state === "empty") return false
        if (this.down.state === upState) return true
        return this.down.validateUpToDown(upState)
    }

    async validateLeftToRight(leftState: CellState): Promise<boolean> {
        if (leftState === this.state) return false
        if (this.right === null) return false
        if (this.right.state === "empty") return false
        if (this.right.state === leftState) return true
        return this.right.validateLeftToRight(leftState)
    }

    async validateRightToLeft(rightState: CellState): Promise<boolean> {
        if (rightState === this.state) return false
        if (this.left === null) return false
        if (this.left.state === "empty") return false
        if (this.left.state === rightState) return true
        return this.left.validateRightToLeft(rightState)
    }

    async validateDownToUp(downState: CellState): Promise<boolean> {
        if (downState === this.state) return false
        if (this.up === null) return false
        if (this.up.state === "empty") return false
        if (this.up.state === downState) return true
        return this.up.validateDownToUp(downState)
    }

    async flipUpToDown(upState: CellState) {
        this.flip()
        this.down?.flipUpToDown(upState)
    }

    async flipLeftToRight(leftState: CellState) {
        this.flip()
        this.right?.flipLeftToRight(leftState)
    }

    async flipRightToLeft(rightState: CellState) {
        this.flip()
        this.left?.flipRightToLeft(rightState)
    }

    async flipDownToUp(downState: CellState) {
        this.flip()
        this.up?.flipDownToUp(downState)
    }
}
