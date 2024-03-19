'use client'
import Link from "next/link";

import { useEffect, useState } from "react";
import { Button, Card } from "antd";
import { getMenusAnon } from "@/utils/supabase/requests";
import axios from "axios";
import Title from "antd/es/typography/Title";
import { headers } from "next/headers";
import Navbar from "./components/navbar"

export default function Home() {
  const PROXY = "/api/proxy?request="
  const DB_STORAGE_URL = process.env.DB_STORAGE_URL

  const [menus, setMenus] = useState<any[]>([])

  useEffect(() => {
    // V2
    getAllMenus()


  }, [])

  const getAllMenus = async () => {
    await axios.get(PROXY + '/menus/')
      .then((response) => {
        setMenus(response?.data?.data.filter((item: any) => !item.archived))
      })
      .catch((error: any) => {
        console.log("Error fetching user data:");
        console.log(error);
        const status = error.response?.status;
        const data = error.response?.data;
        console.log(status, data)
      });
  }

  const gridStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: 0,
    width: "10em",
    height: "10em",
    position: "relative",
    margin: "0 0 1em 1em",
    flexWrap: "wrap",
    marginBottom: "8vh"
  };

  const useWidth = () => {
    const [width, setWidth] = useState(0)
    const handleResize = () => setWidth(window.innerWidth)
    useEffect(() => {
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])
    return width
  }

  const size = useWidth();

  return (size <= 800 ?
    <main style={{}}>
      <Title level={2} style={{ textAlign: "left", margin: ".5em 0 0 .5em", padding: "0" }}>Sapling</Title>
      <Title level={4} style={{ textAlign: "left", margin: "0 0 1em .75em", padding: "0" }}>Popular in Amsterdam</Title>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {menus.map((item: any) => {
          return (
            <div key={item.id} style={gridStyle}>
              <Link href={`/view/menu/${item.id}`} key={item.id}>
                <img
                  src={item?.banner_url?.includes('amazonaws.com') ? item.banner_url : DB_STORAGE_URL + item.banner_url}
                  height={'100%'}
                  width={'100%'}
                  style={{ objectFit: "cover" }}
                />
                <Title level={5} style={{ textAlign: "left", margin: "0", padding: "0" }}>{item.name}</Title>
                {/* <h1 style={{ color: "white", lineHeight: "20px", position: "absolute", height: "100%", top: "1.5em", left: "0", right: "0", backgroundColor: "rgba(255, 255, 255, 0)", padding: "0", margin: "0", fontSize: "1.5em" }}>{item.name}</h1> */}
              </Link>
            </div>
          )
        })}
      </div>

      {/* <Navbar items={["Home", "Saved", "Feeling lucky"]} selected="Home" /> */}
    </main >
    : <div style={{ textAlign: "center", padding: "5em" }}>
      <Title level={2}>Please use a mobile device to view this page.</Title>
    </div>);
}
