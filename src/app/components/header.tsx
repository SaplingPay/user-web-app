import { Menu } from '@/models/models'
import { getMenuAnon } from '@/utils/supabase/requests'
import { InfoCircleFilled, InfoCircleOutlined } from '@ant-design/icons'
import { Spin, Tag, FloatButton } from 'antd'
import React, { useEffect, useState } from 'react'
import { BlurhashImage } from './blurhashImage'

type Props = {
    menu: any
}
const DB_STORAGE_URL = process.env.DB_STORAGE_URL

const Header = (props: Props) => {
    return (
        <div style={{ width: "100%", height: "30vh", position: "relative" }}>
            {props.menu ? <BlurhashImage
                src={props.menu.banner_url ? props.menu.banner_url.includes('amazonaws.com') ? props.menu.banner_url : DB_STORAGE_URL + props.menu.banner_url : "/banner1.png"}
                style={{ height: "100%", width: "100%", objectFit: "cover", zIndex: "1" }}
                blurhash={props.menu.blurhash}
            /> : ""}

        </div>
    )
}

export default Header