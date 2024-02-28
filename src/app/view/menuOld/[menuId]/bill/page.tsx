'use client'
import { Button, Divider, FloatButton, Input, Select } from 'antd'
import React from 'react'
import Link from 'next/link'
import { ArrowLeftOutlined, CreditCardOutlined } from '@ant-design/icons'

type Props = {
    params: any
}

const BillItem = () => {
    return (
        <div style={{ display: "flex", margin: "1vh 5vh", backgroundColor: "#EEEEEE", padding: ".25em 1.5em", borderRadius: "40px", fontSize: ".8em", border: "black solid 2px" }}>
            <p>Cappuccino (Large, Oat Milk)</p>
            <p style={{ marginLeft: "auto" }}>€5.3</p>
        </div>

    )
}

const BillPage = (props: Props) => {
    const menuId = props.params.menuId
    return (
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "sans-serif" }}>
            <div style={{ textAlign: "center", position: "fixed", width: "100%", height: "10vh", backgroundColor: "white", zIndex: "1" }}>
                <h2>Pay or split bill</h2>
                <Link href={`/view/menu/${menuId}/order`}><FloatButton icon={<ArrowLeftOutlined />} style={{ left: 24, top: 20 }} /></Link>
            </div>
            <div style={{ display: "flex", margin: "10vh 5vh 0 5vh", backgroundColor: "lightgray", padding: ".5em 2em", borderRadius: "40px", fontWeight: "bold", fontSize: "1.1em" }}>
                <p>Total to pay</p>
                <p style={{ marginLeft: "auto" }}>€40.1</p>
            </div>
            <div style={{ margin: "0 5vh", padding: ".5em 2em", borderRadius: "40px", fontWeight: "bold", fontSize: "1.1em", textAlign: "center" }}>
                <p>or split the bill by selecting</p>
                <p>the items you ordered:</p>
            </div>
            <div>
                <BillItem />
                <BillItem />
                <BillItem />
                <BillItem />
                <BillItem />
                <BillItem />
                <BillItem />
                <BillItem />
                <BillItem />
            </div>

            <div style={{ width: "100%", height: "32vh", backgroundColor: "white" }}></div>
            <div style={{ width: "100%", display: "flex", position: "fixed", bottom: "0", height: "30vh", backgroundColor: "white", flexDirection: "column" }}>
                <div style={{ display: "flex", paddingLeft: "10vw", paddingRight: "10vw", fontWeight: "bold", marginBottom: "0" }}>
                    <p>Add Tip</p>
                    <p style={{ marginLeft: "auto" }}>Your Total : €20</p>
                </div>
                <div style={{ display: "flex", paddingLeft: "10vw", paddingRight: "10vw", fontWeight: "bold", marginBottom: "0", marginTop: "0", height: "20%", justifyContent: "space-between", }}>
                    <Button
                        style={{ height: "100%" }}>
                        <span>5%</span>
                        <span>€1.00</span>
                    </Button>
                    <Button style={{ height: "100%" }}>
                        <span>10%</span>
                        <span>€2.00</span>
                    </Button>
                    <Button style={{ height: "100%" }}>
                        <span>15%</span>
                        <span>€3.00</span>
                    </Button>
                </div>
                {/* <Button
                style={{
                    width: "80%",
                    textAlign: "center",
                    fontSize: "1.2vh",
                    borderRadius: "10px",
                    margin: "auto auto auto auto",
                    height: "10%",
                }}
            >
                Enter custom tip
            </Button> */}
                <Input placeholder="Enter custom tip" style={{
                    width: "80%",
                    textAlign: "center",
                    fontSize: "1.2vh",
                    borderRadius: "10px",
                    margin: "auto auto auto auto",
                    height: "10%",
                }} />
                {/* <Button

                style={{
                    width: "80%",
                    textAlign: "center",
                    fontSize: "1.5vh",
                    borderRadius: "10px",
                    margin: "auto auto auto auto",
                    height: "15%",
                }}
            >
Choose Payment Method <CreditCardOutlined />
            </Button> */}
                <Select style={{
                    width: "80%",
                    textAlign: "center",
                    fontSize: "1.5vh",
                    borderRadius: "10px",
                    margin: "auto auto auto auto",
                    height: "15%",
                }} placeholder={<div>Choose Payment Method <CreditCardOutlined /></div>} options={[{ value: 'visa', label: 'Visa' }]} />
                <Button
                    type="primary"
                    style={{
                        width: "80%",
                        textAlign: "center",
                        backgroundColor: "black",
                        fontSize: "2.5vh",
                        borderRadius: "10px",
                        margin: "auto",
                        height: "20%"
                    }}
                >
                    Done
                </Button>
            </div>
        </div>
    )
}

export default BillPage