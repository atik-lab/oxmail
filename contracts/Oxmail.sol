pragma solidity ^0.4.19;

/**
 * @title Oxmail
 * @dev This contract stores the necessary information for the oxmail project.
 */
contract Oxmail
{
    // the mail struct and the array of mails
    struct Mail {
        string body;
        address from;
    }
    Mail[] public mail;

    // a list of the mail receivers
    mapping(address => uint) public addressToMail;
    // a list of the mail from
    mapping(address => uint) public addressFromMail;

    event NewMail(uint mailId, address from, address to);

    /**
     * @dev creates a mail
     */
    function _createMail(string _body) private returns(uint) {
        require(_body != '');
        Mail _mail = Mail(_body, msg.sender);
        uint _id = mail.push(_mail);
        addressFromMail[msg.sender] = _id;
        return _id;
    }

    /**
     * @dev creates a mail and sends it
     */
    function sendMail(string _body, address _to) {
        uint _id = _createMail(_body);
        addressToMail[_to] = _id;
        NewMail(_id, msg.sender, _to);
    }
}
