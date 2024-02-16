'use client'
import Link from "next/link";

import { useEffect, useState } from "react";
import { Button } from "antd";
import { getMenusAnon } from "@/utils/supabase/requests";


export default function Home() {
  const [menus, setMenus] = useState<any[]>([])

  useEffect(() => {
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
    loadMenus()

  }, [])

  return (
    <main style={{ display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "sans-serif", padding: "5vh" }}>
      {menus.map((item) => {
        return (
          <Link href={`/view/menu/${item.uuid}`} key={item.uuid} style={{ marginBottom: "2vh" }}>
            <Button type="primary" style={{ width: "100%", height: "8vh", fontSize: "1.25em" }}>{item.title}</Button>
          </Link>
        )
      })}
    </main>
  );
}
