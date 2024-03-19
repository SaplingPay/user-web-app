'use client'
import { DownCircleOutlined, DownOutlined } from '@ant-design/icons'
import { FloatButton, Image, Space, Tag } from 'antd'
import React, { useEffect, useState } from 'react'

type Props = {
    item: any
    setVisible: any
}

const DB_STORAGE_URL = process.env.DB_STORAGE_URL

const ItemDrawer = (props: Props) => {
    console.log("ItemDrawer props", props)


    if (props.item) {
        return (
            <div style={{ paddingBottom: "2em" }}>
                <div>
                    <img
                        style={{ height: "50vh", objectFit: "cover" }}
                        src={props.item?.image_url?.includes('amazonaws.com') ? props.item.image_url : DB_STORAGE_URL + props.item.image_url}
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

                    {props.item.dietary_restrictions?.length > 0 && <h4 style={{ marginBottom: ".5em" }}>Dietary / Allergens</h4>}
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

                    {props.item.customizations?.length > 0 && <h4 style={{ marginBottom: ".5em" }}>Customizations</h4>}
                    <div>
                        {props.item.customizations?.map((customization: any) => {
                            return (
                                <Tag key={customization} color="blue" style={{ margin: ".2em" }}><p style={{ margin: ".2em .3em", fontSize: "1.1em" }}>{customization}</p></Tag>
                            )
                        })}
                    </div>


                    {props.item.ingredients?.length > 0 && <h4 style={{ marginBottom: ".5em" }}>Ingredients</h4>}
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