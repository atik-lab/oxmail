let contractAddr = "0x46f4e59ce925b12e459c31a3642c9ff95564dd84";
let contractABI = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "mailToAddress",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "mailFromAddress",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "mail",
        "outputs": [
            {
                "name": "body",
                "type": "string"
            },
            {
                "name": "from",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalMails",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "mailId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "to",
                "type": "address"
            }
        ],
        "name": "NewMail",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_body",
                "type": "string"
            },
            {
                "name": "_to",
                "type": "address"
            }
        ],
        "name": "sendMail",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];