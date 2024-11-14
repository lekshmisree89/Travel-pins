'use client'

import { useState } from 'react'
import { Plus, Edit2, Check, X, Utensils, Book, LogOut } from 'lucide-react'

//TODO: add the dish list component
//export default function DishList()
//handle add country
//handle edit country
//handle delete country
//handle save country


export function DishListComponent() {
    const [userCountries, setUserCountries] = useState(initialUserCountries)
    const [editingCountry, setEditingCountry] = useState(null)
    const [isAddingCountry, setIsAddingCountry] = useState(false)
  
    const handleAddCountry = (country) => {
      const defaultNote = countriesData.find(c => c.id === country.id)?.defaultNote || ''
      setUserCountries([...userCountries, { ...country, dishes: [], notes: defaultNote }])
      setIsAddingCountry(false)
    }
  
    const handleEditCountry = (country) => {
      setEditingCountry(country)
    }
  
    const handleSaveCountry = (editedCountry) => {
      setUserCountries(userCountries.map(c => c.id === editedCountry.id ? editedCountry : c))
      setEditingCountry(null)
    }
  
    return (
        //maybe need Lekshmi's NAV
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-800">DishList</span>
                <Button variant="ghost" className="ml-8">Explore</Button>
              </div>
              <div className="flex items-center">
                <Button variant="ghost">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </nav>
  
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">My Countries</h1>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    onClick={() => setIsAddingCountry(true)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Country
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add a New Country</DialogTitle>
                  </DialogHeader>
                  <AddCountryForm countries={countriesData} onAdd={handleAddCountry} />
                </DialogContent>
              </Dialog>
            </div>
  
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {userCountries.map(country => (
                <CountryCard
                  key={country.id}
                  country={country}
                  isEditing={editingCountry?.id === country.id}
                  onEdit={() => handleEditCountry(country)}
                  onSave={handleSaveCountry}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }



//todo: country card component

//todo: addcountryform slash button




