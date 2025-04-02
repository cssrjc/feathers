// populateRewards.ts
import db from '@/utils/firebase' // Adjust the import path to your firebase config
import { collection, doc, setDoc } from 'firebase/firestore'

// Define the interface for reward items
interface RewardItem {
  name: string
  price: number
  imageUrl: string
}

// Your items array with modified structure for the database
const items: RewardItem[] = [
  { name: "House socks", price: 60, imageUrl: "" },
  { name: "Griffles Plushie", price: 130, imageUrl: "" },
  { name: "Griffles Plushie House Keychain", price: 70, imageUrl: "" },
  { name: "Track & Field Singlet", price: 60, imageUrl: "" },
  { name: "Shirts ALL", price: 80, imageUrl: "" },
  { name: "Iron Press Badges (House)", price: 35, imageUrl: "" },
  { name: "Team Raffles Games'22 Pins", price: 40, imageUrl: "" },
  { name: "Stickers (Buckle-Buckley)", price: 20, imageUrl: "" },
  { name: "Stickers (Morrison-Richardson)", price: 20, imageUrl: "" },
  { name: "Stickers (Dream Light Unite)", price: 10, imageUrl: "" },
  { name: "Open House folder", price: 20, imageUrl: "" },
  { name: "Pencil Case (Wonderland)", price: 20, imageUrl: "" },
  { name: "Notebook (Open house'23)", price: 30, imageUrl: "" },
  { name: "Notebook (Mangata)", price: 30, imageUrl: "" },
  { name: "Bookmark (Open House '23)", price: 10, imageUrl: "" },
  { name: "Shoebag (Mangata)", price: 30, imageUrl: "" },
  { name: "Shoebag (Wonderland)", price: 40, imageUrl: "" },
  { name: "Shoebag (Wayfarers)", price: 40, imageUrl: "" },
  { name: "Totebag (Open House'23)", price: 80, imageUrl: "" },
  { name: "Box Files ALL", price: 40, imageUrl: "" },
  { name: "Team Raffles Metal Water Bottle", price: 40, imageUrl: "" },
  { name: "Towel (Mangata)", price: 20, imageUrl: "" },
  { name: "Collapsible Cups Raffles", price: 30, imageUrl: "" },
  { name: "Wristband (Morrison-Richardson)", price: 30, imageUrl: "" },
  { name: "Totebag (Buckle-Buckley)", price: 80, imageUrl: "" },
  { name: "Tattoo (Wonderland)", price: 10, imageUrl: "" },
  { name: "Keychain Open House'22", price: 10, imageUrl: "" },
]

// Function to populate the rewards collection
async function populateRewards() {
  try {
    const rewardsRef = collection(db, 'rewards')
    
    // Loop through each item and add it as a document
    for (const item of items) {
      // Using the name as the document ID (you could also use auto-generated IDs)
      const docRef = doc(rewardsRef, item.name)
      
      await setDoc(docRef, {
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl
      })
      
      console.log(`Successfully added ${item.name}`)
    }
    
    console.log('All rewards have been added successfully!')
  } catch (error) {
    console.error('Error adding rewards:', error)
  }
}

// Run the function
populateRewards()