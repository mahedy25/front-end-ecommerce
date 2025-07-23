// app/context/SearchContext.tsx
'use client'

import React, { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'

interface SearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleSearch: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    router.push(`/all-products?search=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, handleSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) throw new Error('useSearch must be used within SearchProvider')
  return context
}
