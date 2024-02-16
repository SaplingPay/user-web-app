import { DownCircleOutlined } from '@ant-design/icons'
import React from 'react'

type Props = {
    menuId: any
}

const RestaurantInfo = (props: Props) => {
    return (
        <div style={{ display: "flex", padding: "1vh", height: "8vh" }}>
            <div>
                <h1 style={{ marginBottom: "0", marginTop: "0" }}>Locals</h1>
                <div className="stars">⭐️⭐️⭐️⭐️⭐️</div>
            </div>
            <div style={{ marginLeft: "auto", marginBottom: "auto", marginTop: "5px", textAlign: "right", paddingRight: "2vh", display: "flex" }}>
                <DownCircleOutlined />
                <div className="location" style={{ marginLeft: "1vw" }}>De Pijp</div>
            </div>
        </div>
    )
}

export default RestaurantInfo