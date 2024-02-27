'use client'
import { DownCircleOutlined, DownOutlined } from '@ant-design/icons'
import { FloatButton, Image, Space, Tag } from 'antd'
import React, { useEffect, useState } from 'react'

type Props = {
    item: any
    setVisible: any
}

const DB_STORAGE_URL = "https://pcymmfzjvqqszeimvekz.supabase.co/storage/v1/object/public/menu-assets/"

const ItemDrawer = (props: Props) => {


    if (props.item) {
        return (
            <div style={{ paddingBottom: "2em" }}>
                <div>
                    <Image
                        style={{ maxHeight: "60vh", width: "100%", objectFit: "cover" }}
                        src={DB_STORAGE_URL + props.item.image_url}
                        preview={false}
                        width="100%"
                    />
                </div>
                <div style={{ padding: "2vh 2vh 0 2vh ", marginBottom: "0" }}>
                    <div style={{ display: "flex" }}>
                        <h1 style={{ margin: "0" }}>{props.item.name}</h1>
                        <div style={{ marginLeft: "auto", marginTop: "0", paddingTop: "0" }}>
                            <h3 style={{ margin: "1vh 0 0 0", color: "orange" }}>€{parseInt(props.item.price) / 100}</h3>
                        </div>
                    </div>
                    <p style={{ color: "gray" }}>{props.item.description}</p>

                    <div>
                        {[{ name: "Vegan", color: "green" }, { name: "Vegaterian", color: "green" }, { name: "Warm", color: "volcano" }].map((tag: any) => {
                            return (
                                <Tag key={`${tag.name}-${tag.color}`} color={tag.color} style={{ margin: ".2em" }}><p style={{ margin: ".2em .3em", fontSize: "1.1em" }}>{tag.name}</p></Tag>
                            )

                        })}
                    </div>

                    <h4 style={{ marginBottom: ".5em" }}>Customizations</h4>
                    <div>
                        {[{ name: "Small" }, { name: "Medium" }, { name: "Large" }].map((customization: any) => {
                            return (
                                <Tag key={customization.name} color="blue" style={{ margin: ".2em" }}><p style={{ margin: ".2em .3em", fontSize: "1.1em" }}>{customization.name}</p></Tag>
                            )
                        })}
                    </div>

                    {/* <h4 style={{ marginBottom: ".5em" }}>Dietary Restrictions / Allergens</h4> */}

                    <h4 style={{ marginBottom: ".5em" }}>Ingredients</h4>
                    {["Astonishing",
                        "Incredible",
                        "Marvelous"].map((ingredient: any) => {
                            return (
                                <Tag key={ingredient} color="orange" style={{ margin: ".2em" }}><p style={{ margin: ".2em .3em", fontSize: "1.1em" }}>{ingredient}</p></Tag>
                            )
                        })}
                </div>

            </div>
        )

    }

}

export default ItemDrawer