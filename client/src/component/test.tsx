'use client'
import { ActionIcon } from "@mantine/core"
import { IconBrandYoutube } from "@tabler/icons-react"
import { useState } from "react"

const Test = () => {
    const [state, setState] = useState("")
    const handleClicktest = () => {
        setState("hello")
    }
    return (
        <div>
            <ActionIcon size="lg" color="gray" variant="subtle"
                onClick={() => {
                    handleClicktest()
                }}
            >
                <IconBrandYoutube style={{}} stroke={1.5} />
                {state}
            </ActionIcon>
        </div>
    )
}
export default Test;