// Loads contract_class JSONs from public and returns only the abi arrays

async function fetchJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return res.json();
}

export async function loadAbis() {
  const [apartmentRegistry, reservationManager] = await Promise.all([
    fetchJson("/contracts_ApartmentRegistry.contract_class.json"),
    fetchJson("/contracts_ReservationManager.contract_class.json"),
  ]);

  const extractAbi = (obj) => {
    // Cairo v2 contract_class usually exposes "abi" field or within "abi" key
    if (Array.isArray(obj?.abi)) return obj.abi;
    if (obj?.contract_class?.abi && Array.isArray(obj.contract_class.abi)) {
      return obj.contract_class.abi;
    }
    // Some artifacts store sierra/compiled sections; try common keys
    if (obj?.abi?.entries && Array.isArray(obj.abi.entries))
      return obj.abi.entries;
    throw new Error("ABI not found in provided artifact");
  };

  const APARTMENT_REGISTRY_ABI = extractAbi(apartmentRegistry);
  const RESERVATION_MANAGER_ABI = extractAbi(reservationManager);

  return [APARTMENT_REGISTRY_ABI, RESERVATION_MANAGER_ABI];
}

export const ABI_PATHS = [
  "/contracts_ApartmentRegistry.contract_class.json",
  "/contracts_ReservationManager.contract_class.json",
];

// Deployed contract addresses
export const CONTRACT_ADDRESSES = {
  RESERVATION_MANAGER:
    "0x079dd3b4db3d0768bf5c462accdd06a36fe832446293ac7a93c444bb16e9568f",
  APARTMENT_REGISTRY:
    "0x06cbfb668a0514c26ab1728f6489c9b97550fafea0be0b695f56b4aaf1bb0282",
};
