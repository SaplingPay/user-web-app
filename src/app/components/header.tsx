import { Button, Tag } from 'antd'
import React from 'react'

type Props = {}

const Header = (props: Props) => {
    return (
        <div style={{ width: "100%", height: "30vh", position: "relative" }}>
            <Tag
                style={{
                    position: "absolute",
                    top: "24vh",
                    left: "2vw",
                    backgroundColor: "gray",
                    color: "white",
                    padding: ".5em",
                    fontStyle: "italic",
                    borderRadius: "15px"
                }}>Ordering for Table #21</Tag>
            <img
                src="/banner1.png"
                style={{ height: "100%", width: "100%", objectFit: "cover", zIndex: "1" }}
            />

        </div>
    )
}

export default Header