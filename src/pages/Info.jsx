import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { saoPauloListings, florianopolisListings } from "./Home.jsx";
import { Header } from "../components/Header/index.jsx";
import SuccessModal from "../components/SuccessModal.jsx";
import ErrorModal from "../components/ErrorModal.jsx";
import {
  Star,
  ArrowLeft,
  MapPin,
  Wifi,
  Car,
  Dumbbell,
  Coffee,
  Wallet,
} from "lucide-react";

export default function Info() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Starknet wallet state
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [starknet, setStarknet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  // Modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Contract address
  const RESERVATION_MANAGER =
    "0x079dd3b4db3d0768bf5c462accdd06a36fe832446293ac7a93c444bb16e9568f";

  // Setup básico com datas padrão
  useEffect(() => {
    // Definir datas padrão (hoje + 7 dias, hoje + 10 dias)
    const today = new Date();
    const startDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const endDate = new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000);

    setSelectedStartDate(startDate.toISOString().split("T")[0]);
    setSelectedEndDate(endDate.toISOString().split("T")[0]);
  }, []);

  // Função para conectar wallet
  const handleConnectWallet = async () => {
    try {
      // Check for modern Starknet wallet API
      if (typeof window !== "undefined" && window.starknet) {
        console.log("Using window.starknet");
        const starknetInstance = window.starknet;
        if (starknetInstance) {
          await starknetInstance.enable();
          setIsConnected(true);
          setAddress(starknetInstance.account.address);
          setStarknet(starknetInstance);
        } else {
          alert(
            "No Starknet wallet found. Please install Argent X or Braavos."
          );
        }
      } else if (typeof window !== "undefined" && window.getStarknet) {
        console.log("Using window.getStarknet");
        const starknetInstance = await window.getStarknet();
        if (starknetInstance) {
          await starknetInstance.enable();
          setIsConnected(true);
          setAddress(starknetInstance.account.address);
          setStarknet(starknetInstance);
        } else {
          alert(
            "No Starknet wallet found. Please install Argent X or Braavos."
          );
        }
      } else {
        alert(
          "Starknet wallet not detected. Please make sure your wallet is installed and refresh the page."
        );
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet: " + error.message);
    }
  };

  // Função para fazer a reserva
  const handleReservation = async () => {
    if (!isConnected || !starknet) {
      alert("Please connect your wallet first!");
      return;
    }

    if (!selectedStartDate || !selectedEndDate) {
      alert("Please select check-in and check-out dates!");
      return;
    }

    const startTimestamp = Math.floor(
      new Date(selectedStartDate).getTime() / 1000
    );
    const endTimestamp = Math.floor(new Date(selectedEndDate).getTime() / 1000);

    if (startTimestamp >= endTimestamp) {
      alert("Check-out date must be after check-in date!");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Making reservation with wallet:", starknet);

      console.log("Reservation details:", {
        apartmentId: parseInt(id),
        startDate: startTimestamp,
        endDate: endTimestamp,
        contractAddress: RESERVATION_MANAGER,
      });

      // Try different contract interaction methods
      let result;

      try {
        // Method 1: Using Argent X account.execute
        console.log("Trying method 1: account.execute (Argent X)");
        result = await starknet.account.execute({
          contractAddress: RESERVATION_MANAGER,
          entrypoint: "reserve_apartment",
          calldata: [parseInt(id), startTimestamp, endTimestamp],
        });
        console.log("Reservation result (method 1):", result);
      } catch (error1) {
        console.log("Method 1 failed, trying method 2:", error1);

        try {
          // Method 2: Using starknet.js with connected account
          console.log("Trying method 2: starknet.js with connected account");
          const { Contract, RpcProvider } = await import("starknet");

          const provider = new RpcProvider({
            nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_7",
          });

          // Create contract with correct ABI
          const contract = new Contract(
            [
              {
                name: "reserve_apartment",
                type: "function",
                inputs: [
                  { name: "apartment_id", type: "core::integer::u64" },
                  { name: "start_date", type: "core::integer::u64" },
                  { name: "end_date", type: "core::integer::u64" },
                ],
                outputs: [],
              },
            ],
            RESERVATION_MANAGER,
            provider
          );

          // Use the contract directly with the account
          result = await contract.reserve_apartment(
            parseInt(id),
            startTimestamp,
            endTimestamp
          );
          console.log("Reservation result (method 2):", result);
        } catch (error2) {
          console.log("Method 2 failed, trying method 3:", error2);

          try {
            // Method 3: Using starknet.request
            console.log("Trying method 3: starknet.request");
            result = await starknet.request({
              type: "starknet_addInvokeTransaction",
              params: {
                contractAddress: RESERVATION_MANAGER,
                entrypoint: "reserve_apartment",
                calldata: [parseInt(id), startTimestamp, endTimestamp],
              },
            });
            console.log("Reservation result (method 3):", result);
          } catch (error3) {
            console.log("Method 3 failed, trying method 4:", error3);

            try {
              // Method 4: Using account.execute with different parameters
              console.log("Trying method 4: account.execute alternative");
              result = await starknet.account.execute({
                contractAddress: RESERVATION_MANAGER,
                entrypoint: "reserve_apartment",
                calldata: [parseInt(id), startTimestamp, endTimestamp],
              });
              console.log("Reservation result (method 4):", result);
            } catch (error4) {
              console.log("All methods failed:", error4);
              throw new Error(
                `All contract interaction methods failed. Last error: ${error4.message}`
              );
            }
          }
        }
      }

      // Show success modal instead of alert
      const txHash =
        result.transaction_hash || result.hash || "Check console for details";
      setTransactionHash(txHash);
      setShowSuccessModal(true);
      setSuccess(true);
    } catch (error) {
      console.error("Reservation failed:", error);
      setErrorMessage(error.message);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Combina ambos os arrays e busca o listing específico pelo ID
  const allListings = [...saoPauloListings, ...florianopolisListings];
  const listing = allListings.find((item) => item.id === parseInt(id));

  // Determina a cidade baseada no ID
  const isFlorianopolis = florianopolisListings.some(
    (item) => item.id === parseInt(id)
  );
  const cityName = isFlorianopolis ? "Florianópolis" : "São Paulo";

  // Se não encontrar o listing, redireciona para home
  if (!listing) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-6xl mx-auto px-6 lg:px-20 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Main layout */}
        <div>
          {/* Main image */}
          <div className="relative h-[600px] rounded-2xl overflow-hidden mb-6">
            <img
              src={listing.image}
              alt={listing.type}
              className="w-full h-full object-cover"
            />
            {/* Image badge */}
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              1/90
            </div>
          </div>

          {/* Information card below the image */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {listing.type}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-600 mb-3">
              <MapPin className="w-4 h-4" />
              <span>{cityName}, Brazil</span>
            </div>

            {/* Basic details */}
            <div className="text-gray-600 mb-4">
              <p>Entire place • 2 guests • 1 bedroom • 1 bed • 1 bathroom</p>
            </div>

            {/* Rating and reviews */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-black" />
                  <span className="font-medium">{listing.rating}</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-600">
                  <span className="text-sm">Guest favorite</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">22 reviews</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="line-through text-gray-500">R$490</span>
                <span className="text-2xl font-bold text-gray-900">
                  {listing.price}
                </span>
              </div>
              <p className="text-sm text-gray-600">for 2 nights • Dec 12-14</p>
            </div>

            {/* Free cancellation */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-sm text-gray-600">Free cancellation</span>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <p className="text-green-800 text-sm">
                    Reservation successful! Your apartment #{id} has been
                    booked!
                  </p>
                </div>
              </div>
            )}

            {/* Wallet Connection */}
            {!isConnected && (
              <div className="mb-6">
                <button
                  onClick={handleConnectWallet}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  <Wallet className="w-5 h-5" />
                  Connect Wallet to Reserve
                </button>
              </div>
            )}

            {/* Connected Wallet Info */}
            {isConnected && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm">
                  Wallet Connected: {address.slice(0, 6)}...
                  {address.slice(-4)}
                </p>
              </div>
            )}

            {/* Date Selection */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={selectedStartDate}
                  onChange={(e) => setSelectedStartDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out Date
                </label>
                <input
                  type="date"
                  value={selectedEndDate}
                  onChange={(e) => setSelectedEndDate(e.target.value)}
                  min={
                    selectedStartDate || new Date().toISOString().split("T")[0]
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Reserve button */}
            <button
              onClick={handleReservation}
              disabled={!isConnected || isLoading}
              className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 px-6 rounded-xl font-medium text-lg transition-colors duration-200"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                `Reserve Apartment #${id}`
              )}
            </button>
          </div>
        </div>

        {/* Amenities section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Wifi className="w-5 h-5 text-gray-700" />
              <span className="text-sm">Free Wi-Fi</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Car className="w-5 h-5 text-gray-700" />
              <span className="text-sm">Parking</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Dumbbell className="w-5 h-5 text-gray-700" />
              <span className="text-sm">Gym</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Coffee className="w-5 h-5 text-gray-700" />
              <span className="text-sm">Breakfast</span>
            </div>
          </div>
        </div>

        {/* Description section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">About this place</h2>
          <p className="text-gray-700 leading-relaxed">
            Comfortable accommodation well located in {cityName}. This space
            offers all the necessary amenities for a pleasant stay, with easy
            access to public transportation and main tourist attractions in the
            city. Perfect for travelers seeking comfort and convenience.
          </p>
        </div>
      </main>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        transactionHash={transactionHash}
        apartmentId={id}
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        errorMessage={errorMessage}
      />
    </div>
  );
}
