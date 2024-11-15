import { useState } from 'react'
import { Plus, Edit2, Check, X, Utensils, Book, LogOut, Trash2 } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Textarea } from '../components/ui/textarea'
import { Checkbox } from '../components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../components/ui/alert-dialog"

type Dish = string;

interface Country {
  id: number;
  name: string;
  dishes: Dish[];
  flag: string;
  defaultNote: string;
}

interface UserCountry extends Country {
  notes: string;
}

const countriesData: Country[] = [
  { id: 1, name: 'Italy', dishes: ['Pizza', 'Pasta', 'Gelato'], flag: '🇮🇹', defaultNote: 'Non sono ancora stato in Italia' },
  { id: 2, name: 'Japan', dishes: ['Sushi', 'Ramen', 'Tempura'], flag: '🇯🇵', defaultNote: '私はまだ日本に行ったことがありません' },
  { id: 3, name: 'Mexico', dishes: ['Tacos', 'Guacamole', 'Enchiladas'], flag: '🇲🇽', defaultNote: 'Todavía no he estado en México' },
]

const initialUserCountries: UserCountry[] = [
  { id: 1, name: 'Italy', dishes: ['Pizza', 'Pasta'], notes: 'Love the cuisine!', flag: '🇮🇹', defaultNote: '' },
]

export function DishListComponent() {
  const [userCountries, setUserCountries] = useState<UserCountry[]>(initialUserCountries)
  const [editingCountry, setEditingCountry] = useState<UserCountry | null>(null)

  const handleAddCountry = (country: Country) => {
    const defaultNote = countriesData.find(c => c.id === country.id)?.defaultNote || ''
    setUserCountries([...userCountries, { ...country, dishes: [], notes: defaultNote }])
  }

  const handleEditCountry = (country: UserCountry) => {
    setEditingCountry(country)
  }

  const handleSaveCountry = (editedCountry: UserCountry) => {
    setUserCountries(userCountries.map(c => c.id === editedCountry.id ? editedCountry : c))
    setEditingCountry(null)
  }

  const handleDeleteCountry = (countryId: number) => {
    setUserCountries(userCountries.filter(c => c.id !== countryId))
    setEditingCountry(null)
  }

  return (
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
                onDelete={handleDeleteCountry}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

interface CountryCardProps {
  country: UserCountry;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (editedCountry: UserCountry) => void;
  onDelete: (countryId: number) => void;
}

function CountryCard({ country, isEditing, onEdit, onSave, onDelete }: CountryCardProps) {
  const [editedCountry, setEditedCountry] = useState<UserCountry>(country)

  const handleToggleDish = (dish: Dish) => {
    const updatedDishes = editedCountry.dishes.includes(dish)
      ? editedCountry.dishes.filter(d => d !== dish)
      : [...editedCountry.dishes, dish]
    setEditedCountry({ ...editedCountry, dishes: updatedDishes })
  }

  const handleSave = () => {
    onSave(editedCountry)
  }

  const allDishes = countriesData.find(c => c.id === country.id)?.dishes || []

  if (isEditing) {
    return (
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <CardHeader className="bg-primary/10 flex flex-row items-center justify-between p-4">
          <CardTitle className="text-2xl font-bold">{country.flag} {country.name}</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => {
              setEditedCountry(country);
              onEdit();
            }}>
              <X className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Check className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the country and all its associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(country.id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
            <h3 className="font-semibold flex items-center">
              <Utensils className="mr-2 h-4 w-4" /> Dishes
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Menu</TableHead>
                  <TableHead>Eaten</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allDishes.map(dish => (
                  <TableRow key={dish}>
                    <TableCell>{dish}</TableCell>
                    <TableCell>
                      <Checkbox
                        id={`${country.id}-${dish}`}
                        checked={editedCountry.dishes.includes(dish)}
                        onCheckedChange={() => handleToggleDish(dish)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold flex items-center mb-2">
              <Book className="mr-2 h-4 w-4" /> Field Notes
            </h3>
            <Textarea
              placeholder="Add your field notes here..."
              value={editedCountry.notes}
              onChange={(e) => setEditedCountry({ ...editedCountry, notes: e.target.value })}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="bg-primary/10 flex flex-row items-center justify-between p-4">
        <CardTitle className="text-2xl font-bold">{country.flag} {country.name}</CardTitle>
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold flex items-center mb-2">
            <Utensils className="mr-2 h-4 w-4" /> Dishes
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Menu</TableHead>
                <TableHead>Eaten</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allDishes.map(dish => (
                <TableRow key={dish}>
                  <TableCell>{dish}</TableCell>
                  <TableCell>
                    {country.dishes.includes(dish) ? <Check className="h-4 w-4 text-green-500" /> : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold flex items-center mb-2">
            <Book className="mr-2 h-4 w-4" /> Field Notes
          </h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-sm text-gray-600 truncate">
                  {country.notes || countriesData.find(c => c.id === country.id)?.defaultNote || "No field notes added yet."}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{country.notes || countriesData.find(c => c.id === country.id)?.defaultNote || "No field notes added yet."}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}

interface AddCountryFormProps {
  countries: Country[];
  onAdd: (country: Country) => void;
}

function AddCountryForm({ countries, onAdd }: AddCountryFormProps) {
  const [selectedCountry, setSelectedCountry] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const country = countries.find(c => c.name === selectedCountry)
    if (country) {
      onAdd(country)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          Select a country
        </label>
        <select
          id="country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
        >
          <option value="">Choose a country</option>
          {countries.map(country => (
            <option key={country.id} value={country.name}>
              {country.flag} {country.name}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit" disabled={!selectedCountry}>
        Add Country
      </Button>
    </form>
  )
}