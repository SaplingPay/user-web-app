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
    // console.log("ItemDrawer props", props)


    if (props.item) {
        return (
            <div style={{ paddingBottom: "2em" }}>
                <div>
                    <img
                        style={{ maxHeight: "60vh", width: "100%", objectFit: "cover" }}
                        src={DB_STORAGE_URL + props.item.image_url}
                        width="100%"
                    />
                </div>
                <div style={{ padding: "2vh 2vh 0 2vh ", marginBottom: "0" }}>
                    <div style={{ display: "flex" }}>
                        <h1 style={{ margin: "0" }}>{props.item.name}</h1>
                        <div style={{ marginLeft: "auto", marginTop: "0", paddingTop: "0" }}>
                            <h3 style={{ margin: "1vh 0 0 0", color: "orange" }}>€{props.item.price}</h3>
                        </div>
                    </div>
                    <p style={{ color: "gray" }}>{props.item.description}</p>

                    <h4 style={{ marginBottom: ".5em" }}>Dietary / Allergens</h4>
                    <div>
                        {props.item.dietary_restrictions?.map((tag: any) => {
                            return (
                                <Tag key={`${tag}`} color="green" style={{ margin: ".2em" }}><p style={{ margin: ".2em .3em", fontSize: "1.1em" }}>{tag}</p></Tag>
                            )

                        })}
                        {props.item.allergens?.map((tag: any) => {
                            return (
                                <Tag key={`${tag}`} color="volcano" style={{ margin: ".2em" }}><p style={{ margin: ".2em .3em", fontSize: "1.1em" }}>{tag}</p></Tag>
                            )

                        })}

                    </div>

                    <h4 style={{ marginBottom: ".5em" }}>Customizations</h4>
                    <div>
                        {props.item.customizations?.map((customization: any) => {
                            return (
                                <Tag key={customization} color="blue" style={{ margin: ".2em" }}><p style={{ margin: ".2em .3em", fontSize: "1.1em" }}>{customization}</p></Tag>
                            )
                        })}
                    </div>



                    <h4 style={{ marginBottom: ".5em" }}>Ingredients</h4>
                    {props.item.ingredients?.map((ingredient: any) => {
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