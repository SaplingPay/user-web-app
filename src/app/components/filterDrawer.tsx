'use client'
import { Button, ConfigProvider, Space, Tag } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useState } from 'react'
const { CheckableTag } = Tag;

type Props = {
    setVisible: any
}

const FilterDrawer = (props: Props) => {

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        setSelectedTags(nextSelectedTags);
    };

    return (
        <div style={{ padding: "0 3vh 0 3vh ", marginBottom: "0", display: "flex", flexDirection: "column", height: "100%" }}>
            <Title
                level={3}
                style={{ marginBottom: "0", marginTop: "2em", marginRight: "1.5em" }}>Add your preferences to help us customize your menu ✨ </Title>

            <Title level={4} style={{ color: "black" }} >Dietary 🍴</Title>
            <Space wrap>
                {['Vegetarian', 'Vegan', 'Halal', 'Kosher', 'Pescetarian', 'Gluten-free'].map((tag) => (
                    <CheckableTag
                        style={{ border: "1px solid gray", textAlign: "center", borderRadius: "1em" }}
                        key={tag}
                        checked={selectedTags.includes(tag)}
                        onChange={(checked) => handleChange(tag, checked)}
                    >
                        <p style={{ fontSize: "1.25em", margin: ".5em", }}>{tag}</p>
                    </CheckableTag>
                ))}
            </Space>

            <Title level={4} style={{ color: "black" }} >Allergies 🤧</Title>
            <Space wrap>
                {["Lactose", "Shellfish", "Eggs", "Soy", "Nuts", "Wheat"].map((tag) => (
                    <CheckableTag
                        style={{ border: "1px solid gray", textAlign: "center", borderRadius: "1em" }}
                        key={tag}
                        checked={selectedTags.includes(tag)}
                        onChange={(checked) => handleChange(tag, checked)}
                    >
                        <p style={{ fontSize: "1.25em", margin: ".5em", }}>{tag}</p>
                    </CheckableTag>
                ))}
            </Space>
            <Button
                type="primary"
                style={{ margin: "2em 0", width: "100%", backgroundColor: "black", height: "3em" }}
                onClick={() => props.setVisible(false)}
            >Done</Button>
        </div>
    )
}

export default FilterDrawer