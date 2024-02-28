'use client'
import Link from "next/link";

import { useEffect, useState } from "react";
import { Button, Card } from "antd";
import { getMenusAnon } from "@/utils/supabase/requests";
import axios from "axios";
import Title from "antd/es/typography/Title";

// const PROXY = "/api/proxy?url=" + process.env.PROXY_URL //const PROXY = "/api/proxy?url=http://localhost:8080"

const DB_STORAGE_URL = "https://pcymmfzjvqqszeimvekz.supabase.co/storage/v1/object/public/menu-assets/"

export default function Home() {
  const PROXY = "/api/proxy?url=" + "https://server-go.fly.dev"
  console.log("PROXY", PROXY)
  const [menus, setMenus] = useState<any[]>([])
  const [menusV2, setMenusV2] = useState<any[]>([])

  useEffect(() => {
    // V1
    loadMenus()

    // V2
    getAllMenus()

  }, [])

  const getAllMenus = async () => {
    await axios.get(PROXY + '/menus/')
      .then((response) => {
        console.log("Menus data:");
        console.log(response.data?.data);
        // setMenu(response?.data?.data ? response.data.data[0] : null)
        // setMenuItems(response?.data?.data ? response.data.data[0].items : [])
        setMenusV2(response?.data?.data.filter((item: any) => !item.archived))
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
  const loadMenus = async () => {
    const menus = getMenusAnon()
    menus
      .then(res => {
        if (res instanceof Array) {
          setMenus(res)
        }
        console.log(res)
      })
  }

  const gridStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: 0,
    height: '35vw'
  };



  const useWidth = () => {
    const [width, setWidth] = useState(0)
    const handleResize = () => setWidth(window.innerWidth)
    useEffect(() => {
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return width
  }

  const size = useWidth();



  return (size <= 800 ?
    <main style={{ display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "sans-serif", padding: "0" }}>

      {/* <h1 style={{ fontSize: "2em", marginBottom: "3vh" }}>V2</h1> */}
      <Card>
        {menusV2.map((item: any) => {
          return (
            <Card.Grid key={item.id} style={gridStyle} hoverable={false}>
              <Link href={`/view/menu/${item.id}`} key={item.id} style={{ marginBottom: "2vh" }}>
                <img
                  src={DB_STORAGE_URL + item.banner_url}
                  height={'100%'}
                  width={'100%'}
                  style={{ objectFit: "cover" }}
                />
              </Link>
            </Card.Grid>
          )
        })}
      </Card>

      {/* <h1 style={{ fontSize: "2em", marginBottom: "3vh" }}>V1</h1>
      {menus.map((item) => {
        return (
          <Link href={`/view/menuOld/${item.uuid}`} key={item.uuid} style={{ marginBottom: "2vh" }}>
            <Button type="primary" style={{ width: "100%", height: "8vh", fontSize: "1.25em" }}>{item.title}</Button>
          </Link>
        )
      })} */}


      {/* {menusV2.map((item) => {
        return (
          <Link href={`/view/menuV2/${item.id}`} key={item.id} style={{ marginBottom: "2vh" }}>
            <Button type="primary" style={{ width: "100%", height: "8vh", fontSize: "1.25em" }}>{item.name}</Button>
          </Link>
        )
      })} */}

    </main>
    : <div style={{ textAlign: "center", padding: "5em" }}>
      <Title level={2}>Please use a mobile device to view this page.</Title>
    </div>);
}
