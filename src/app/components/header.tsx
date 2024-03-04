import { Menu } from '@/models/models'
import { getMenuAnon } from '@/utils/supabase/requests'
import { InfoCircleFilled, InfoCircleOutlined } from '@ant-design/icons'
import { Spin, Tag, FloatButton } from 'antd'
import React, { useEffect, useState } from 'react'

type Props = {
    menu: any
}
const DB_STORAGE_URL = process.env.DB_STORAGE_URL

const Header = (props: Props) => {
    return (
        <div style={{ width: "100%", height: "30vh", position: "relative" }}>
            {props.menu ? <img
                src={props.menu.banner_url ? DB_STORAGE_URL + props.menu.banner_url : "/banner1.png"}
                style={{ height: "100%", width: "100%", objectFit: "cover", zIndex: "1" }}
            /> : ""}

        </div>
    )
}

export default Header