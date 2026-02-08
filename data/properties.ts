//SEED DATA, NOT FOR PRODUCTION
export type Property = {
    id: string
    title: string
    address: string
    price: number
    status: "For Sale" | "Sold"
    type: string
    bedrooms: number
    bathrooms: number
    sqft: number
    yearBuilt: number
    parking: string
    description: string
    highlights: string[]
    images: string[]
    details: {
      buildingInfo: { label: string; value: string }[]
      expenses: { label: string; value: string }[]
      rooms: { label: string; value: string }[]
      characteristics: string[]
    }
  }
  
  export const properties: Property[] = [
    {
      id: "westmount-home",
      title: "Elegant Westmount Residence",
      address: "123 Avenue Greene, Westmount, QC",
      price: 3895000,
      status: "For Sale",
      type: "Detached House",
      bedrooms: 5,
      bathrooms: 4,
      sqft: 4200,
      yearBuilt: 1938,
      parking: "2 car garage",
      description:
        "A timeless Westmount residence blending classic architecture with refined modern updates. Bright living spaces, elegant finishes, and a private outdoor setting designed for elevated living.",
      highlights: [
        "Chef’s kitchen with premium appliances",
        "Sun filled living areas",
        "Private landscaped backyard",
        "Prestigious Westmount location",
      ],
      images: [
        "/images/listings/house_ph.png",
        "/images/services/service1.png",
        "/images/listings/house_ph.png",
      ],
      details: {
        buildingInfo: [
          { label: "Type", value: "Detached" },
          { label: "Year Built", value: "1938" },
          { label: "Living Area", value: "4,200 sq ft" },
          { label: "Parking", value: "2 car garage" },
        ],
        expenses: [
          { label: "Municipal Taxes", value: "Upon request" },
          { label: "School Taxes", value: "Upon request" },
        ],
        rooms: [
          { label: "Bedrooms", value: "5" },
          { label: "Bathrooms", value: "4" },
          { label: "Family Room", value: "1" },
          { label: "Office", value: "1" },
        ],
        characteristics: [
          "Hardwood floors",
          "Fireplace",
          "Central air",
          "Finished basement",
        ],
      },
    },
  
    {
      id: "old-port-penthouse",
      title: "Old Port Penthouse",
      address: "55 Rue de la Commune O, Montréal, QC",
      price: 2149000,
      status: "For Sale",
      type: "Luxury Condo",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1960,
      yearBuilt: 2012,
      parking: "1 indoor",
      description:
        "A striking penthouse in the Old Port offering panoramic city views, high ceilings, and a refined modern aesthetic. Designed for those who appreciate luxury and location.",
      highlights: [
        "Private terrace with city views",
        "Floor to ceiling windows",
        "High end finishes throughout",
        "Walkable historic neighborhood",
      ],
      images: [
        "/images/listings/house_ph.png",
        "/images/services/service1.png",
        "/images/listings/house_ph.png",
      ],
      details: {
        buildingInfo: [
          { label: "Type", value: "Condo" },
          { label: "Year Built", value: "2012" },
          { label: "Living Area", value: "1,960 sq ft" },
          { label: "Parking", value: "1 indoor" },
        ],
        expenses: [
          { label: "Condo Fees", value: "Upon request" },
          { label: "Municipal Taxes", value: "Upon request" },
        ],
        rooms: [
          { label: "Bedrooms", value: "3" },
          { label: "Bathrooms", value: "2" },
          { label: "Terrace", value: "Yes" },
        ],
        characteristics: [
          "Concierge",
          "Gym",
          "Elevator",
          "Secure access",
        ],
      },
    },
  ]
  
  export function getPropertyById(id: string): Property | undefined {
    return properties.find((p) => p.id === id)
  }
  
  export function formatPriceCAD(value: number) {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(value)
  }