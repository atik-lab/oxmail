/**
 * Publicmail, the ethereum mail system open and public.
 */
let app = angular.module("PublicMail", []);

app.controller("mainControler", function($scope) {
    // the model of publicmail, this is an object with all the model
    $scope.openmail  = {
        "account": "0x",
        "mailcount": 0
    };

    // init
    $scope.init = function () {
        if (typeof web3 !== 'undefined') {
            $scope.w3 = new Web3(web3.currentProvider);
            $scope.contract = $scope.w3.eth.contract(contractABI).at(contractAddr);
            $scope.openmail.account = $scope.w3.eth.accounts[0];

            $scope.mailCount();
            //this.startMailWatcher();
            //this.getMailFromAccount();
        } else {
            console.log("No web3")
        }
    };

    // sendMail
    $scope.sendMail = function() {
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
    };

    // updates mailCount by executing the contract
    $scope.mailCount = function () {
        $scope.contract.mailCount(function (error, mailCount) {
            $scope.openmail.mailcount = mailCount;
        });
    };

    // initialize
    $scope.init();
});

class Publicmail
{
    getMainControllerScope() {
        return angular.element(document.getElementById('main-controller')).scope();
    }


    getMailFromAccount() {
        let self = this;
        this.contract.getMailFromAddress(this.account, function (error, mailFromAddress) {
            for (let i = 0; i < mailFromAddress.length; i++) {
                self.contract.mail(mailFromAddress[i], function (error, mail) {
                    console.log(mail);
                });
            }
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
/*
let publicmail;
window.addEventListener('load', function() {
    publicmail = new Publicmail();
});
*/