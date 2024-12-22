'use client'

import { useState } from 'react'
import { TextInput, Button, Group } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    // Placeholder for search functionality
    console.log('Searching for:', searchQuery)
    // Here you would typically call an API or perform a search operation
  }

  return (
    <Group>
        
        <TextInput
          placeholder="Search..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          style={{ flexGrow: 1 }}
        />
        <Button
         
        onClick={handleSearch} 
        >
          <IconSearch size="1rem" />
        </Button>
    </Group>
  )
}