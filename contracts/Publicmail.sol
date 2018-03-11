pragma solidity ^0.4.19;

/**
 * @title Publicmail
 * @dev This contract stores the necessary information for the oxmail project.
 */
contract Publicmail
{
    // the mail struct and the array of mails
    struct Mail {
        string body;
        address from;
    }
    Mail[] public mail;
    uint public mailCount = 0;

    // a list of the mail receivers
    mapping(uint => address) mailToAddress;
    mapping(address => uint) mailToAddressCount;
    // a list of the mail from
    mapping(uint => address) mailFromAddress;
    mapping(address => uint) mailFromAddressCount;

    event NewMail(uint mailId, address from, address to, string body);

    /**
     * @dev creates a mail
     */
    function _createMail(string _body) private returns(uint) {
        // require(_body != '');
        Mail memory _mail = Mail(_body, msg.sender);
        uint _id = mail.push(_mail) - 1;
        mailFromAddress[_id] = msg.sender;
        mailFromAddressCount[msg.sender]++;
        mailCount++;
        return _id;
    }

    /**
     * @dev creates a mail and sends it
     */
    function sendMail(string _body, address _to) public {
        uint _id = _createMail(_body);
        mailToAddress[_id] = _to;
        mailToAddressCount[_to]++;
        NewMail(_id, msg.sender, _to, _body);
    }

    /**
     * @dev get all the mail identifier sent form an address
     */
    function getMailFromAddress(address _address) external view returns(uint[]) {
        uint[] memory result = new uint[](mailFromAddressCount[_address]);
        uint n = 0;
        for (uint i = 0; i < mail.length; i++) {
            if (mailFromAddress[i] == _address) {
                result[n] = i;
                n++;
            }
        }
        return result;
    }

    /**
     * @dev get mail to address
     */
    function getMailToAddress(address _address) external view returns(uint[]) {
        uint[] memory result = new uint[](mailToAddressCount[_address]);
        uint n = 0;
        for (uint i = 0; i < mail.length; i++) {
            if (mailToAddress[i] == _address) {
                result[n] = i;
                n++;
            }
        }
        return result;
    }
}
