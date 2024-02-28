import axios from 'axios'
import React, { useEffect, useState } from 'react'

type Props = {}

const PROXY = "/api/proxy?url=http://localhost:8080"

const page = (props: Props) => {
    const [menus, setMenus] = useState<any[]>([])

    useEffect(() => {
        getAllMenus()

    }, [])

    const getAllMenus = async () => {
        await axios.get(PROXY + '/menus/')
            .then((response) => {
                console.log("Menus data:");
                console.log(response.data?.data);
                // setMenu(response?.data?.data ? response.data.data[0] : null)
                // setMenuItems(response?.data?.data ? response.data.data[0].items : [])
                setMenus(response?.data?.data)
            })
            .catch((error: any) => {
                console.log("Error fetching user data:");
                console.log(error);
                const status = error.response?.status;
                const data = error.response?.data;
                console.log(status, data)
                // setCreateAccountModalVisible(true);
            });
    }

    return (
        <div>page</div>
    )
}

export default page