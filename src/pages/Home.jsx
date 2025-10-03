import React, { useState } from "react";
import { Header } from "../components/Header";
import { ListingsSection } from "../components/Listings/ListingsSection.jsx";

export const saoPauloListings = [
  {
    id: 2,
    type: "Apartment in República",
    price: "R$265",
    rating: "4.99",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    type: "Room in Jardim Paulista",
    price: "R$194",
    rating: "4.93",
    image:
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    type: "Apartment near Campo Belo Station",
    price: "R$458",
    rating: "4.95",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    type: "Apartment near Campo Belo Station",
    price: "R$449",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    type: "Room in São Paulo",
    price: "R$192",
    rating: "4.98",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    type: "Apartment in Liberdade",
    price: "R$341",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400&h=300&fit=crop",
  },
  {
    id: 8,
    type: "Room in Bela Vista",
    price: "R$268",
    rating: "4.97",
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop",
  },
];

export const florianopolisListings = [
  {
    id: 9,
    type: "Room in Córrego Grande",
    price: "R$183",
    rating: "4.92",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
  },
  {
    id: 10,
    type: "Loft in Pantanal",
    price: "R$288",
    rating: "4.96",
    image:
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=400&h=300&fit=crop",
  },
  {
    id: 11,
    type: "Apartment in Centro",
    price: "R$377",
    rating: "4.96",
    image:
      "https://images.unsplash.com/photo-1522050212171-61b01dd24579?w=400&h=300&fit=crop",
  },
  {
    id: 12,
    type: "Condominium in Saco dos Limões",
    price: "R$503",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400&h=300&fit=crop",
  },
  {
    id: 13,
    type: "House in Campeche",
    price: "R$318",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=400&h=300&fit=crop",
  },
  {
    id: 14,
    type: "Shared room in Barra da Lagoa",
    price: "R$141",
    rating: "4.81",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
  },
  {
    id: 15,
    type: "Room in Centro",
    price: "R$272",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=300&fit=crop",
  },
];

// Main App Component
export default function Home() {
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-screen-2xl mx-auto px-6 lg:px-20 py-8">
        <ListingsSection
          title="Most searched accommodations"
          listings={saoPauloListings}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
        <ListingsSection
          title="Available in Florianópolis this weekend"
          listings={florianopolisListings}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </main>
    </div>
  );
}
