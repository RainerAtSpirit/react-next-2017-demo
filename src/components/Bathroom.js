import React from "react"
import { observer } from "mobx-react"

import "./Bathroom.css"

import { Emoji } from "./Emoji"
import { Painting } from "./Painting"
import { Pos } from "./Pos"
import { Buttons } from "./Buttons"
import { ToiletPaper } from "./ToiletPaper"
import { Toilet } from "./Toilet"

export const Bathroom = ({ bathroom }) => (
    <section className="Bathroom">
        <BathroomIcon />
        <FlushingIcon visible={bathroom.toilet.isFlushing} />
        <ToiletPaper bathroom={bathroom} />
        {bathroom.isRelaxing && <RelaxIcon />}
        <Toilet toilet={bathroom.toilet} />
        <Report toilet={bathroom.toilet} />
        <Painting painting={bathroom.painting} />
        <Buttons bathroom={bathroom} />
    </section>
)

const FlushingIcon = ({ visible }) =>
    visible ? (
        <Pos top={20} left={200}>
            <Emoji.flushing size={10} />
        </Pos>
    ) : null

const BathroomIcon = () => (
    <Pos top={20} left={30}>
        <Emoji.bathroom size={10} />
    </Pos>
)

const RelaxIcon = () => (
    <Pos top={300} left={150}>
        <Emoji.game size={30} className="wobble" />
    </Pos>
)

const Report = observer(({ toilet }) => (
    <Pos top={600} left={1300}>
        <span className="processed1">
            Flushed<br />
        </span>
        <span className="processed2">{toilet.processed}</span>
        <span className="processed3">{" gr."}</span>
    </Pos>
))

export default observer(Bathroom)
