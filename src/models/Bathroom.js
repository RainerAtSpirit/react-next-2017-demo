/* eslint-disable */
import { types, process, addMiddleware, destroy, decorate } from "mobx-state-tree"

import {
    delay,
    atomic,
    atomicAsync,
    undoRedoMiddleware,
    atomicAsyncAction,
    atomicAsyncPatch
} from "../middleware"
/* eslint-enable */

const Sh_t = types.model({
    type: types.literal("💩"),
    weight: 365,
    smell: 7
})

const Duck = types.model({
    type: types.literal("🦆"),
    name: "Donald"
})

const Toilet = types
    .model({
        isFlushing: false,
        pile: types.array(types.union(Sh_t, Duck)),
        processed: 0
    })
    .actions(self => {
        function weightOfPile() {
            return self.pile.filter(x => Sh_t.is(x)).reduce((sum, p) => sum + p.weight, 0)
        }

        function donate() {
            if (Duck.is(self.pile[0])) destroy(self.pile[0])
            self.pile.push({ type: "💩" })
            if (self.pile.length > 2) throw new Error("ToiletOverflowException")
        }

        const flush = process(function* flush() {
            if (self.isFlushing) return
            self.isFlushing = true
            yield delay(2000)
            self.processed += weightOfPile()
            self.pile = [{ type: "🦆" }]
            self.isFlushing = false
        })

        return {
            donate,
            flush
        }
    })

const Anchor = types.model({ x: types.number, y: types.number })

const Painting = types
    .model({
        painting: "🖼",
        anchor: types.optional(Anchor, { x: 1400, y: 30 })
    })
    .actions(self => ({
        move(x, y) {
            self.anchor = { x, y }
        }
    }))

export const Bathroom = types
    .model("Bathroom", {
        amountOfToiletPaper: 0,
        toilet: Toilet,
        painting: Painting
    })
    .actions(self => {
        // addMiddleware(self, atomicAsyncAction)

        function wipe() {
            if (self.amountOfToiletPaper <= 0) throw new Error("OutOfToiletPaperException")
            self.amountOfToiletPaper -= 1
        }

        function restock() {
            self.amountOfToiletPaper += 3
        }

        function takeA____() {
            self.toilet.donate()
            self.wipe()
            self.wipe()
            self.toilet.flush()
        }

        // const takeA____ = process(function*() {
        //     self.toilet.donate()
        //     self.wipe()
        //     self.wipe()
        //     yield self.toilet.flush()
        //     self.wipe()
        //     self.wipe()
        // })

        return {
            wipe,
            restock,
            takeA____
            // takeA____: decorate(atomicAsyncPatch, takeA____)
        }
    })
