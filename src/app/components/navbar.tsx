import React from 'react'

type Props = {
    items: string[]
    selected: string
}

const Navbar = (props: Props) => {
    return (
        <div style={{ position: "fixed", top: "auto", right: "0", left: "0", bottom: "1.5rem", zIndex: "50", maxWidth: "max-content", margin: "auto", display: "inline-block", backgroundColor: "rgba(39, 39, 42, 0.6)", padding: ".625rem .75rem", borderRadius: "10em", backdropFilter: "blur(12px)", marginLeft: "auto", marginRight: "auto" }}>
            <div style={{ display: "flex", justifyContent: "center", textAlign: "center", fontWeight: "500" }}>
                {props.items.map((item, index) => {
                    return (
                        <a key={index} href={`/${item}`} style={{ padding: ".5rem .75rem", borderRadius: "10em", textDecoration: "none", color: props.selected === item ? "black" : "white", backgroundColor: props.selected === item ? "white" : "transparent" }}>{item}</a>
                    )
                })}
            </div>
        </div>
    )
}

export default Navbar