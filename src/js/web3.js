async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error("User denied account access");
        }
    } else {
        console.log('Please install MetaMask!');
    }
}

document.getElementById('connectWallet').addEventListener('click', connectWallet);


const clubAbi = [
    {
      "inputs": [],
      "stateMutability": "payable",
      "type": "constructor",
      "payable": true
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "winner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "prize",
          "type": "uint256"
        }
      ],
      "name": "WinnerSelected",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "bets",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "bet",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "bettor",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "endTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "startTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "winner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "setBet",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [],
      "name": "selectWinner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "viewPool",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "bet",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "bettor",
              "type": "address"
            }
          ],
          "internalType": "struct Club.Bet[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "viewWinner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];
const factoryAbi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "club",
          "type": "address"
        }
      ],
      "name": "CreatedClub",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "clubs",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "makeClub",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "viewClubs",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];
const factoryAddress = '0x1f2bd590bc143991a84F9f1AD6b73d6B27E0EB76';

// Web3 instance
const webInstance = new Web3(window.ethereum);

// Contract instances
const factoryContract = new webInstance.eth.Contract(factoryAbi, factoryAddress);

// Functions to interact with contracts
async function createClub() {
  try {
      const accounts = await webInstance.eth.getAccounts();
      await factoryContract.methods.makeClub().send({ from: accounts[0] });
      console.log('Club created successfully.');
  } catch (error) {
      console.error('Error creating club:', error);
  }
}


async function getClubs() {
  try {
      const clubs = await factoryContract.methods.viewClubs().call();
      // Here you can process the list of clubs, for example, display them in the frontend
      console.log('Clubs:', clubs);
  } catch (error) {
      console.error('Error fetching clubs:', error);
  }
}

document.getElementById('createClub').addEventListener('click', createClub);
document.getElementById('viewClubs').addEventListener('click', getClubs);

