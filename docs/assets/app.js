/**
 * Publicmail, the ethereum mail system open and public.
 */
class Publicmail
{
    constructor() {
        if (typeof web3 !== 'undefined') {
            this.w3 = new Web3(web3.currentProvider);
            this.contract = this.w3.eth.contract(contractABI).at(contractAddr);
            this.account = this.w3.eth.accounts[0];

            this.startMailWatcher();
            this.getMailFrom();
        } else {
            console.log("No web3")
        }
    }

    sendMail() {
        let body = document.getElementById("send-mail-body").value;
        let to = document.getElementById("send-mail-to").value;
        this.contract.sendMail(body, to, {
            gas: 1000000,
            gasPrice: 10000000000,
            from: this.account,
        }, function(error, result) {
            if (!error) {
                console.log("Message sent");
            } else {
                console.log(error);
            }
        });
    }

    getMailFrom() {
        this.contract.mailFromAddress(1, function (error, mailFromAddress) {
            console.log("x" + mailFromAddress);
        });
    }

    startMailWatcher() {
        let NewMail = this.contract.NewMail({}, {
            fromBlock: 'latest',
            toBlock: 'latest'
        });
        NewMail.watch(function(error, mail) {
            // mail contains mailId, from, to
            let mailId = mail.args.mailId;
            let from = mail.args.from;
            let to = mail.args.to;
            console.log("New Mail (" + mailId + "): " + from + " -> " + to);
        })
    }
}

// initialize when page is loaded
let publicmail;
window.addEventListener('load', function() {
    oxmail = new Publicmail();
});
