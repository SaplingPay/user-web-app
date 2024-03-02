import { Menu } from '@/models/models'
import { getMenuAnon } from '@/utils/supabase/requests'
import { InfoCircleFilled, InfoCircleOutlined } from '@ant-design/icons'
import { Spin, Tag, FloatButton } from 'antd'
import React, { useEffect, useState } from 'react'
import { BlurhashImage } from './BlurhashImage'

type Props = {
    menu: any
}
const DEFAULT_URL = "https://pcymmfzjvqqszeimvekz.supabase.co/storage/v1/object/public/menu-assets/"

const Header = (props: Props) => {
    return (
        <div style={{ width: "100%", height: "30vh", position: "relative" }}>
            {props.menu ? <BlurhashImage
                src={props.menu.banner_url ? DEFAULT_URL + props.menu.banner_url : "/banner1.png"}
                style={{ height: "100%", width: "100%", objectFit: "cover", zIndex: "1" }}
                blurhash={props.menu.blurhash}
            /> : ""}

        </div>
    )
}

export default Header