import React from 'react'
import { Button, Card, Image } from "antd";
import Link from 'next/link';
const gridStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: 0,
};


type Props = {
    testAmount: number
}

const DishGallery = (props: Props) => {
    return (
        <div>
            <Card>
                {
                    new Array(props.testAmount).fill(null).map((_, i) => {
                        return (
                            <Card.Grid key={i} style={gridStyle} hoverable={false}>
                                <Link href="/items/1">
                                    <Image
                                        src="/img3.png"
                                        preview={false}
                                    />
                                </Link>
                            </Card.Grid>
                        )

                    })
                }
            </Card>
            <div style={{ width: "100%", height: "8vh", backgroundColor: "white" }}></div>
        </div>
    )
}

export default DishGallery