'use client'
import { DownCircleOutlined, DownOutlined, HeartFilled, HeartOutlined, HeartTwoTone } from '@ant-design/icons'
import { FloatButton, Image, Space, Tag } from 'antd'
import React, { useEffect, useState } from 'react'

type Props = {
}

const DB_STORAGE_URL = process.env.DB_STORAGE_URL

const FavDrawer = (props: Props) => {
    return (
        <div style={{ paddingTop: "0" }}>
            <h1 style={{ textAlign: "center" }}>Favorites</h1>

            <div>
                {Array(3).fill(0).map((_, i) => {
                    return (
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "0", marginBottom: "1em", backgroundColor: "#eaeaea" }}>
                            <div style={{ display: "flex" }}>
                                <img
                                    style={{ height: "14vh", objectFit: "cover" }}
                                    src={"/img3.png"}
                                    width="140vw"
                                />
                                <div style={{ padding: "0 1em", width: "100%", margin: "1em auto auto auto" }}>
                                    <h2 style={{ margin: "0" }}>Menu Item</h2>
                                    <h3 style={{ color: "orange", margin: "0" }}>€10.01</h3>
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", margin: "2em 2em auto 1em" }}>
                                <HeartFilled style={{ fontSize: "2em", color: "red" }} />
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )

}

export default FavDrawer