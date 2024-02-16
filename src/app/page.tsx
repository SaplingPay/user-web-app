'use client'
import Header from "./components/header";
import RestaurantInfo from "./components/restaurantInfo";
import MenuCategories from "./components/menuCategories";
import Footer from "./components/Footer";
import Link from "next/link";
import { createClient } from '@supabase/supabase-js'

import { useEffect, useState } from "react";


export default function Home() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  const fetchData = async (supabase: any) => {
    // const { data, error } = await supabase
    //   .from('Menus')
    //   .select()

    // console.log(data)


    let { data, error1 } = await supabase
      .from('MenuItems')
      .select('')


    console.log(data[0])

  }
  useEffect(() => {

    // const supabase = createClient<Database>(
    //   process.env.NEXT_PUBLIC_SUPABASE_URL,
    //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    // )
    console.log(supabase)
    fetchData(supabase)

    return () => {

    }
  }, [])


  return (
    <main style={{ display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "sans-serif" }}>
      <Header />
      <RestaurantInfo />
      <MenuCategories />
      <Link href="/order"><Footer>View order</Footer></Link>
    </main>
  );
}
