import React from "react";

// Simple Starknet integration with direct contract calls
export default function StarknetSimple() {
  const [isConnected, setIsConnected] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [starknet, setStarknet] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // Contract addresses
  const RESERVATION_MANAGER =
    "0x079dd3b4db3d0768bf5c462accdd06a36fe832446293ac7a93c444bb16e9568f";

  const connectWallet = async () => {
    try {
      // Debug: Log available wallet objects
      console.log("Available wallet objects:", {
        starknet: !!window.starknet,
        getStarknet: !!window.getStarknet,
        argentX: !!window.argentX,
        braavos: !!window.braavos,
        okxwallet: !!window.okxwallet,
        rabby: !!window.rabby,
      });

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
        // Fallback to older API
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
        console.log("Trying to detect wallet manually");
        // Try to detect wallet by checking for common wallet objects
        const possibleWallets = [
          window.argentX,
          window.braavos,
          window.okxwallet?.starknet,
          window.rabby?.starknet,
        ];

        const wallet = possibleWallets.find(
          (w) => w && w.isConnected !== undefined
        );

        if (wallet) {
          console.log("Found wallet:", wallet);
          await wallet.enable();
          setIsConnected(true);
          setAddress(wallet.account.address);
          setStarknet(wallet);
        } else {
          console.log(
            "No wallet found. Available objects:",
            Object.keys(window).filter(
              (k) =>
                k.toLowerCase().includes("stark") ||
                k.toLowerCase().includes("argent") ||
                k.toLowerCase().includes("braavos")
            )
          );
          alert(
            "Starknet wallet not detected. Please make sure your wallet is installed and refresh the page."
          );
        }
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet: " + error.message);
    }
  };

  const makeReservation = async () => {
    if (!isConnected || !starknet) {
      alert("Please connect your wallet first!");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Making reservation with wallet:", starknet);

      // Get current timestamp + 7 days and + 10 days
      const now = Math.floor(Date.now() / 1000);
      const startDate = now + 7 * 24 * 60 * 60; // +7 days
      const endDate = now + 10 * 24 * 60 * 60; // +10 days

      console.log("Reservation details:", {
        apartmentId: 1,
        startDate,
        endDate,
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
          calldata: [1, startDate, endDate],
        });
        console.log("Reservation result (method 1):", result);
      } catch (error1) {
        console.log("Method 1 failed, trying method 2:", error1);

        try {
          // Method 2: Using starknet.js with correct ABI
          console.log("Trying method 2: starknet.js with correct ABI");
          const { Contract, RpcProvider } = await import("starknet");

          const provider = new RpcProvider({
            nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_7",
          });

          // Create contract with correct ABI for u64 types
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
          result = await contract.reserve_apartment(1, startDate, endDate);
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
                calldata: [1, startDate, endDate],
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
                calldata: [1, startDate, endDate],
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

      alert(
        `Reservation successful! Transaction: ${
          result.transaction_hash || result.hash || "Check console for details"
        }`
      );
    } catch (error) {
      console.error("Reservation failed:", error);
      alert(`Reservation failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f8f0" }}>
      <h1>zkStay - Simple Starknet Integration</h1>

      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#e8f4fd",
          borderRadius: "8px",
        }}
      >
        <h3>Test Reservation</h3>
        <p>
          <strong>Apartment ID:</strong> 1
        </p>
        <p>
          <strong>Start Date:</strong>{" "}
          {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
        </p>
        <p>
          <strong>End Date:</strong>{" "}
          {new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}
        </p>
      </div>

      {!isConnected ? (
        <div>
          <p>Connect your Starknet wallet to make reservations:</p>
          <button
            onClick={connectWallet}
            style={{
              padding: "12px 24px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <div>
          <p style={{ color: "green", fontWeight: "bold" }}>
            Wallet Connected: {address.slice(0, 6)}...{address.slice(-4)}
          </p>
          <button
            onClick={makeReservation}
            disabled={isLoading}
            style={{
              padding: "12px 24px",
              backgroundColor: isLoading ? "#6c757d" : "#28a745",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {isLoading ? "Processing..." : "Make Reservation"}
          </button>
        </div>
      )}
    </div>
  );
}
