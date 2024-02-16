import { Button, Divider, FloatButton, Image } from 'antd'
import React from 'react'
import Footer from '../components/Footer'
import Link from 'next/link'
import { ArrowLeftOutlined } from '@ant-design/icons'

type Props = {}

const OrderItem = () => {
    return (
        <div>
            <div style={{ display: "flex" }}>
                <Link href="/items/1">
                    <Image
                        src="/img3.png"
                        preview={false}
                        style={{ height: "25vw", width: "25vw" }}
                    />
                </Link>
                <div style={{ paddingLeft: "2vw", width: "100%", paddingRight: "2vw" }}>
                    <Link href="/items/1" style={{ textDecoration: "none", color: "black" }}>
                        <h3 style={{ marginBottom: "0" }}>Cappuccino</h3>
                        <h5 style={{ marginTop: ".25em", marginBottom: ".5", fontWeight: "normal", color: "gray" }}>Large, oat milk (+€0.5)</h5>
                    </Link>
                    <div style={{ display: "flex" }}>
                        <p style={{ margin: "0" }}>€16</p>
                        <div style={{ display: "flex", marginLeft: "auto" }}>
                            <Button> - </Button>
                            <p style={{ marginLeft: "1em", marginRight: "1em", marginTop: "auto", marginBottom: "auto" }}> 1 </p>
                            <Button> + </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Divider style={{ marginTop: "1em", marginBottom: "1em" }} />
        </div>

    )
}
const OrderFooter = () => {
    return (
        <div style={{ width: "100%", display: "flex", position: "fixed", bottom: "0", height: "20vh", backgroundColor: "white", flexDirection: "column" }}>
            <div style={{ display: "flex", paddingLeft: "5vw", paddingRight: "5vw", fontWeight: "bold", marginBottom: "0" }}>
                <p>Total:</p>
                <p style={{ marginLeft: "auto" }}>€40.1</p>
            </div>

            <Link
                href="/"
                style={{
                    width: "80%",
                    textAlign: "center",
                    fontSize: "2vh",
                    borderRadius: "10px",
                    margin: "0 auto auto auto",
                    height: "30%",
                }}>
                <Button
                    style={{ width: "100%", height: "100%", fontSize: "2vh", }}
                >
                    Add more items
                </Button>
            </Link>
            <Link
                href="/bill"
                style={{
                    width: "80%",
                    textAlign: "center",
                    backgroundColor: "black",
                    borderRadius: "10px",
                    margin: "auto",
                    height: "30%"

                }}>
                <Button
                    type="primary"
                    style={{ width: "100%", height: "100%", fontSize: "2vh", }}
                >
                    Place Order
                </Button>
            </Link>
        </div>
    )
}
const OrderPage = (props: Props) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "sans-serif" }}>
            <div style={{ textAlign: "center", position: "fixed", width: "100%", height: "10vh", backgroundColor: "white", zIndex: "1" }}>
                <h2>Order for Table #21</h2>
                <Link href="/"><FloatButton icon={<ArrowLeftOutlined />} style={{ left: 24, top: 20 }} /></Link>
            </div>
            <div style={{ marginTop: "10vh" }}>
                <OrderItem />
                <OrderItem />
                <OrderItem />
                <OrderItem />
                <OrderItem />
                <OrderItem />
                <OrderItem />
                <OrderItem />
            </div>

            <div style={{ width: "100%", height: "18vh", backgroundColor: "white" }}></div>
            <OrderFooter />
        </div>
    )
}

export default OrderPage