'use client'

import { useState } from 'react'
import { TextInput, Button, Group, InputLabel } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

export function SearchBar({search, setSearch}:any) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    // Placeholder for search functionality
    setSearch(searchQuery)
    // Here you would typically call an API or perform a search operation
  }

  return (
    <Group
        gap={0}
        style={{
            width: '80%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
        <InputLabel
        style={{
            fontSize: '1.2rem',
            color: 'white',
            marginRight: '2%'
        }}
            fw={600}
        >
            Tìm kiếm
        </InputLabel>
        <TextInput
          placeholder="Search service..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          style={{ flexGrow: 1 }}
        />
        <Button
        style={{
            backgroundColor: 'white',
        }}
        onClick={handleSearch} 
        >
          <IconSearch
          style={{
            color: 'gray',
            borderRadius: '0px'
          }} 
          size="1rem" />
        </Button>
    </Group>
  )
}