'use client'
import { Button, ConfigProvider, Space, Tag } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useEffect, useState } from 'react'
const { CheckableTag } = Tag;

type Props = {
    setVisible: any
    setDietaryFilter: any;
    setAllergenFilter: any;
    menu: any;
}

const FilterDrawer = (props: Props) => {

    const [selectedDietaryTags, setSelectedDietaryTags] = useState<string[]>([]);
    const [selectedAllergenTags, setSelectedAllergenTags] = useState<string[]>([]);

    const [allergenTags, setAllergenTags] = useState<string[]>([]);
    const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);

    useEffect(() => {
        console.log("FilterDrawer props:", props)
        if (props.menu.items) {
            let items = props.menu.items
            const allergens: any[] = Array.from(new Set(items.map((i: any) => i.allergens).flat().filter((i: any) => i !== null)))
            console.log("allergens:", allergens)
            setAllergenTags(allergens)

            const dietaryRestrictions: any[] = Array.from(new Set(items.map((i: any) => i.dietary_restrictions).flat().filter((i: any) => i !== null)));
            console.log("dietaryRestrictions:", dietaryRestrictions)
            setDietaryRestrictions(dietaryRestrictions)
        }

    }, [props])


    const handleDietaryFilter = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked
            ? [...selectedDietaryTags, tag]
            : selectedDietaryTags.filter((t) => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        setSelectedDietaryTags(nextSelectedTags)
        props.setDietaryFilter(nextSelectedTags);
    };

    const handleAllergenFilter = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked
            ? [...selectedAllergenTags, tag]
            : selectedAllergenTags.filter((t) => t !== tag);
        console.log('You are not interested in: ', nextSelectedTags);
        setSelectedAllergenTags(nextSelectedTags)
        props.setAllergenFilter(nextSelectedTags);
    }

    return (
        <div style={{ padding: "0 2vh 6em 2vh ", marginBottom: "0", display: "flex", flexDirection: "column", height: "100%" }}>
            <Title
                level={3}
                style={{ marginBottom: "0", marginTop: "1em", marginRight: "1.5em" }}>Add your preferences to help us customize your menu ✨ </Title>

            <Title level={4} style={{ color: "black" }} >Dietary 🍴</Title>
            <Space wrap>
                {dietaryRestrictions?.map((tag) => (
                    <CheckableTag
                        style={{ border: "1px solid gray", textAlign: "center", borderRadius: "1em" }}
                        key={tag}
                        checked={selectedDietaryTags.includes(tag)}
                        onChange={(checked) => handleDietaryFilter(tag, checked)}
                    >
                        <p style={{ fontSize: "1.25em", margin: ".5em", }}>{tag}</p>
                    </CheckableTag>
                ))}
            </Space>

            <Title level={4} style={{ color: "black" }} >Allergies 🤧</Title>
            <Space wrap>
                {allergenTags?.map((tag) => (
                    <CheckableTag
                        style={{ border: "1px solid gray", textAlign: "center", borderRadius: "1em" }}
                        key={tag}
                        checked={selectedAllergenTags.includes(tag)}
                        onChange={(checked) => handleAllergenFilter(tag, checked)}
                    >
                        <p style={{ fontSize: "1.25em", margin: ".5em", }}>{tag}</p>
                    </CheckableTag>
                ))}
            </Space>
            <Button
                type="primary"
                style={{ margin: "1.5em 0", width: "100%", backgroundColor: "black", height: "5.5vh" }}
                onClick={() => props.setVisible(false)}
            >Done</Button>
        </div>
    )
}

export default FilterDrawer