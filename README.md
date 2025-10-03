#  Starknet Apartment Reservation DApp
![Starknet](https://img.shields.io/badge/Starknet-Blockchain-6353FF?style=flat-square)
![Testnet](https://img.shields.io/badge/Network-Testnet-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
Guia completo para deploy dos contratos ReservationManager e ApartmentRegistry na Starknet e configuração do frontend do seu sistema de reservas de apartamentos.
---
##  Pré-requisitos
- Contratos compilados em target/dev/
- Ferramentas Starknet instaladas (CLI / Foundry)
- Wallet com ETH para taxas de transação
- Node.js e npm instalados para rodar o frontend
---
## 🔧 Deploy dos Contratos
Você possui dois contratos principais: 
- ApartmentRegistry: Registra apartamentos, seus preços e proprietários.  
- ReservationManager: Gerencia reservas de apartamentos.
### 🛠️ Opção 1: Starknet CLI
```bash
# Deploy do ApartmentRegistry
starknet deploy \
  --contract target/dev/apartment_registry.compiled_contract_class.json \
  --network testnet
# Deploy do ReservationManager (precisa do endereço do registry)
starknet deploy \
  --contract target/dev/reservation_manager.compiled_contract_class.json \
  --network testnet \
  --constructor-args <REGISTRY_CONTRACT_ADDRESS>
 Dica: Anote os endereços retornados dos dois contratos.
 Opção 2: Starkscan Deploy
Acesse Starkscan Deploy
Faça upload dos arquivos .compiled_contract_class.json
Conecte sua wallet e confirme o deploy
Anote os endereços dos contratos
 Opção 3: Starknet Foundry (snforge)
bash
Copiar código
snforge init
# Deploy ApartmentRegistry
snforge deploy \
  --contract target/dev/apartment_registry.compiled_contract_class.json \
  --network testnet
# Deploy ReservationManager com referência ao registry
snforge deploy \
  --contract target/dev/reservation_manager.compiled_contract_class.json \
  --network testnet \
  --constructor-args <REGISTRY_CONTRACT_ADDRESS>
 Funções Principais
ApartmentRegistry
register_apartment(apartment_id, price, owner_id)
Registra um novo apartamento no sistema.
get_apartment(apartment_id)
Retorna os detalhes de um apartamento específico.
 Evento: ApartmentRegistered
ReservationManager
reserve_apartment(apartment_id, start_date, end_date)
Cria uma nova reserva, verificando conflitos de datas.
get_reservations(apartment_id)
Retorna todas as reservas de um apartamento.
 Evento: ApartmentReserved
 Configuração do Frontend
Abra:
text
Copiar código
frontend/src/hooks/useStarknet.ts
Atualize os endereços dos contratos:
ts
Copiar código
const APARTMENT_REGISTRY_ADDRESS = '<ENDERECO_DO_REGISTRY>';
const RESERVATION_MANAGER_ADDRESS = '<ENDERECO_DO_RESERVATION>';
Inicie o frontend:
bash
Copiar código
cd frontend
npm install
npm start
 Redes Disponíveis
Rede    RPC URL    Chain ID    Explorer
Testnet    Blast API    SN_SEPOLIA    Starkscan Testnet
Mainnet    Blast API    SN_MAIN    Starkscan Mainnet
 Obter ETH para Testnet
Faucet Starknet: Clique aqui
Bridge Ethereum → Starknet: Starkgate
 Testando o DApp
Conecte sua wallet (Argent/Braavos)
Cadastre apartamentos usando ApartmentRegistry
Faça reservas usando ReservationManager
Verifique se os eventos aparecem e os dados são retornados corretamente
Confira as transações no Starkscan
 Solução de Problemas
Erro de Conectividade
Rede correta (Testnet/Mainnet)
Endereços dos contratos corretos
Testar nova wallet
Erro de Transação
ETH suficiente para taxas
Contratos deployados corretamente
Logs do console do navegador
Erro de ABI
Confirme se a ABI do frontend bate com a do contrato
Recompile contratos se necessário
 Suporte e Referências
Documentação Starknet
Sempre teste em Testnet antes de Mainnet
Verifique logs e dependências do frontend
 Parabéns! Seu sistema de reservas de apartamentos na Starknet está pronto para uso!
