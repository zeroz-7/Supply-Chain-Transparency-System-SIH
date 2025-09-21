let provider, signer, contract;
const contractAddress = "0xcCeD24c53583094aA92D924f9e2128252cd6287a";
const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "produceId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "crop",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			}
		],
		"name": "ProduceAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "produceId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "ProduceTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum AgriSupplyChain.Role",
				"name": "role",
				"type": "uint8"
			}
		],
		"name": "Registered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "produceId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "crop",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "quality",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			}
		],
		"name": "addProduce",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "agents",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "farmers",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "farmLocation",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "produceId",
				"type": "uint256"
			}
		],
		"name": "getProduce",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "currentOwner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "produceId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "crop",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "quantity",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "quality",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "farmLocation",
								"type": "string"
							}
						],
						"internalType": "struct AgriSupplyChain.Farmer",
						"name": "origin",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "newOwner",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "soldPrice",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "date",
								"type": "string"
							}
						],
						"internalType": "struct AgriSupplyChain.Transaction[]",
						"name": "supplyChain",
						"type": "tuple[]"
					}
				],
				"internalType": "struct AgriSupplyChain.Produce",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "produces",
		"outputs": [
			{
				"internalType": "address",
				"name": "currentOwner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "produceId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "crop",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "quality",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "farmLocation",
						"type": "string"
					}
				],
				"internalType": "struct AgriSupplyChain.Farmer",
				"name": "origin",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			}
		],
		"name": "registerAgent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "farmLocation",
				"type": "string"
			}
		],
		"name": "registerFarmer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "roles",
		"outputs": [
			{
				"internalType": "enum AgriSupplyChain.Role",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "produceId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "newOwnerAdd",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "soldPrice",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			}
		],
		"name": "transferProduce",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const connectBtn = document.getElementById("connectWalletBtn");
const roleSelection = document.getElementById("roleSelection");
const farmerDashboard = document.getElementById("farmerDashboard");
const agentDashboard = document.getElementById("agentDashboard");

// Connect Wallet
connectBtn.onclick = async () => {
    if (!window.ethereum) {
        alert("Install MetaMask!");
        return;
    }
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);

    checkRole();
};

// Check user role
async function checkRole() {
    const address = await signer.getAddress();
    const role = await contract.roles(address); // returns 0, 1, 2

    if (role == 1) showFarmerDashboard();
    else if (role == 2) showAgentDashboard();
    else roleSelection.style.display = "block"; // show registration options
}

// Registration
document.getElementById("registerFarmerBtn").onclick = async () => {
    const name = prompt("Enter your name:");
    const farmLocation = prompt("Enter your farm location:");
    const tx = await contract.registerFarmer(name, farmLocation);
    await tx.wait();
    showFarmerDashboard();
};

document.getElementById("registerAgentBtn").onclick = async () => {
    const name = prompt("Enter your name:");
    const location = prompt("Enter your location:");
    const tx = await contract.registerAgent(name, location);
    await tx.wait();
    showAgentDashboard();
};

// Dashboards
function showFarmerDashboard() {
    roleSelection.style.display = "none";
    farmerDashboard.style.display = "block";
}

function showAgentDashboard() {
    roleSelection.style.display = "none";
    agentDashboard.style.display = "block";
}

// Farmer Actions
document.getElementById("addProduceBtn").onclick = async () => {
    const produceId = document.getElementById("produceId").value;
    const crop = document.getElementById("crop").value;
    const quantity = document.getElementById("quantity").value;
    const quality = document.getElementById("quality").value;
    const date = document.getElementById("date").value;

    const tx = await contract.addProduce(produceId, crop, quantity, quality, date);
    await tx.wait();
    alert("Produce added!");
};

document.getElementById("transferProduceBtn").onclick = async () => {
    const produceId = document.getElementById("transferProduceId").value;
    const newOwner = document.getElementById("newOwner").value;
    const soldPrice = document.getElementById("soldPrice").value;
    const date = document.getElementById("transferDate").value;

    const tx = await contract.transferProduce(produceId, newOwner, soldPrice, date);
    await tx.wait();
    alert("Produce transferred!");
};

// document.getElementById("checkProduceBtn").onclick = async () => {
//     const produceId = document.getElementById("checkProduceId").value;
//     const produce = await contract.getProduce(produceId);
//     document.getElementById("produceOutput").innerText = JSON.stringify(produce, null, 2);
// };

// Agent Actions
document.getElementById("agentTransferProduceBtn").onclick = async () => {
    const produceId = document.getElementById("agentTransferProduceId").value;
    const newOwner = document.getElementById("agentNewOwner").value;
    const soldPrice = document.getElementById("agentSoldPrice").value;
    const date = document.getElementById("agentTransferDate").value;

    const tx = await contract.transferProduce(produceId, newOwner, soldPrice, date);
    await tx.wait();
    alert("Produce transferred!");
};

document.getElementById("checkProduceBtn").onclick = async () => {
	console.log("hello")
    const produceId = document.getElementById("checkProduceId").value;
    const produce = await contract.getProduce(produceId);
    console.log(produce);
    checkDisplayProduce(produce);
    // document.getElementById("agentProduceOutput").innerText = JSON.stringify(produce, null, 2);
};

document.getElementById("agentCheckProduceBtn").onclick = async () => {
	console.log("hello")
    const produceId = document.getElementById("agentCheckProduceId").value;
    const produce = await contract.getProduce(produceId);
    console.log(produce);
    agentDisplayProduce(produce);
    // document.getElementById("agentProduceOutput").innerText = JSON.stringify(produce, null, 2);
};


// Helper to convert BigNumber to number
function bnToNumber(bn) {
  return Number(bn._hex);
}

async function checkDisplayProduce(p) {
  const container = document.getElementById("checkProduceDisplay");
  container.innerHTML = ""; // clear previous content

  let html = `
    <h3>Produce details: </h3>
    <p><strong>Crop:</strong> ${p[2]}</p>
    <p><strong>Quantity:</strong> ${bnToNumber(p[3])}kg</p>
    <p><strong>Quality:</strong> ${p[4]}</p>
    <p><strong>Harvest Date:</strong> ${p[5]}</p>
    
    <h3>Origin: </h3>
    <p><strong>Farmer:</strong> ${p[6][0]}</p>
    <p><strong>Location:</strong> ${p[6][1]}</p>

    
    <h3>Supply Chain:</h3>
  `;
    async function getAgentName(address){
        const agent = await contract.agents(address)
        console.log(agent[0])
        return agent[0];
    }
  for (let idx = 0; idx < p[7].length; idx++) {
    const agentData = p[7][idx];
    console.log(agentData)
    const agentName = await getAgentName(agentData[0]); // await works here
    html += `
      <div style="margin-left: 15px; margin-bottom: 10px;">
        <p style="font-size:20px;"><strong>Agent ${idx + 1}:</strong> ${agentName}</p>
        <p><strong>Bought at:</strong> ₹${bnToNumber(agentData[1])}</p>
        <p><strong>Date:</strong> ${agentData[2]}</p>
      </div>
    `;
  }

  container.innerHTML = html;
}

// Function to display produce
async function agentDisplayProduce(p) {
  const container = document.getElementById("agentProduceDisplay");
  container.innerHTML = ""; // clear previous content

  let html = `
    <h3>Produce details: </h3>
    <p><strong>Crop:</strong> ${p[2]}</p>
    <p><strong>Quantity:</strong> ${bnToNumber(p[3])}kg</p>
    <p><strong>Quality:</strong> ${p[4]}</p>
    <p><strong>Harvest Date:</strong> ${p[5]}</p>
    
    <h3>Origin: </h3>
    <p><strong>Farmer:</strong> ${p[6][0]}</p>
    <p><strong>Location:</strong> ${p[6][1]}</p>

    
    <h3>Supply Chain:</h3>
  `;
    async function getAgentName(address){
        const agent = await contract.agents(address)
        console.log(agent[0])
        return agent[0];
    }
  for (let idx = 0; idx < p[7].length; idx++) {
    const agentData = p[7][idx];
    console.log(agentData)
    const agentName = await getAgentName(agentData[0]); // await works here
    html += `
      <div style="margin-left: 15px; margin-bottom: 10px;">
        <p style="font-size:20px;"><strong>Agent ${idx + 1}:</strong> ${agentName}</p>
        <p><strong>Bought at:</strong> ₹${bnToNumber(agentData[1])}</p>
        <p><strong>Date:</strong> ${agentData[2]}</p>
      </div>
    `;
  }

  container.innerHTML = html;
}