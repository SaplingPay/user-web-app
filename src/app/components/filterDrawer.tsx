'use client'
import { Button, ConfigProvider, Space, Tag } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useState } from 'react'
const { CheckableTag } = Tag;

type Props = {}

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
        <div style={{ padding: "0 2vh 0 2vh ", marginBottom: "0", display: "flex", flexDirection: "column", height: "100%" }}>
            <Title
                level={1}
                style={{ textAlign: "center", marginBottom: "0", }}>Preferences</Title>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: 'gray',
                        borderRadius: 10,
                        colorText: "gray"
                    },
                }}
            >
                <Title level={4} style={{ color: "green" }}>Plant-Based</Title>
                <Space size={[0, 8]} wrap>
                    {['Vegetarian', 'Vegan'].map((tag) => (
                        <CheckableTag
                            style={{ border: "1px solid gray", width: "9em", textAlign: "center", borderRadius: "1em" }}
                            key={tag}
                            checked={selectedTags.includes(tag)}
                            onChange={(checked) => handleChange(tag, checked)}
                        >
                            <p style={{ fontSize: "1.25em", margin: ".5em" }}>{tag}</p>
                        </CheckableTag>
                    ))}
                </Space>

                <Title level={4} style={{ color: "brown" }}>Lifecycle</Title>
                <Space size={[0, 8]} wrap>
                    {['Halal', 'Kosher', 'Pescetarian'].map((tag) => (
                        <CheckableTag
                            style={{ border: "1px solid gray", width: "9em", textAlign: "center", borderRadius: "1em" }}
                            key={tag}
                            checked={selectedTags.includes(tag)}
                            onChange={(checked) => handleChange(tag, checked)}
                        >
                            <p style={{ fontSize: "1.25em", margin: ".5em" }}>{tag}</p>
                        </CheckableTag>
                    ))}
                </Space>

                <Title level={4} style={{ color: "red" }}>I'm Avoiding</Title>
                <Space size={[0, 8]} wrap>
                    {['Gluten', 'Dairy', 'Soy', 'Spicy', 'Nuts'].map((tag) => (
                        <CheckableTag
                            style={{ border: "1px solid gray", width: "9em", textAlign: "center", borderRadius: "1em" }}
                            key={tag}
                            checked={selectedTags.includes(tag)}
                            onChange={(checked) => handleChange(tag, checked)}
                        >
                            <p style={{ fontSize: "1.25em", margin: ".5em" }}>{tag}</p>
                        </CheckableTag>
                    ))}
                </Space>
            </ConfigProvider>
        </div>
    )
}

export default FilterDrawer