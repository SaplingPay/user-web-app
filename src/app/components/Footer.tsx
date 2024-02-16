import React from 'react'
import { Button, Card, Image } from "antd";

type Props = {}

const Footer = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div style={{ width: "100%", display: "flex", position: "fixed", bottom: "0", height: "8vh", backgroundColor: "white" }}>
            <Button
                type="primary"
                style={{
                    width: "80%",
                    textAlign: "center",
                    backgroundColor: "black",
                    fontSize: "2.5vh",
                    borderRadius: "10px",
                    margin: "auto",
                    height: "75%"
                }}
            >
                {children}
            </Button>
        </div>
    )
}

export default Footer