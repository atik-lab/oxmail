let contractAddr = "0x5ebb8a6e776b7ef90a535da3e27096dd583430d8";
let contractABI = [
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
        "name": "mailCount",
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
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "getMailFromAddress",
        "outputs": [
            {
                "name": "",
                "type": "uint256[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];