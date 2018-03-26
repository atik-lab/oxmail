/**
 * Publicmail, the ethereum mail system open and public.
 */
let app = angular.module("PublicMail", []);

app.controller("mainControler", function($scope) {
    // the model of publicmail, this is an object with all the model
    $scope.w3 = null;
    $scope.contract = null;
    $scope.account = "0x000...";
    $scope.accountIcon = null;
    $scope.openmail  = {
        mailCount: 0,
        inbox: [],
        sent: []
    };

    // init
    $scope.init = function () {
        if (typeof web3 !== 'undefined') {
            $scope.w3 = new Web3(web3.currentProvider);
            $scope.contract = $scope.w3.eth.contract(contractABI).at(contractAddr);

            // load account and account icon
            $scope.account = $scope.w3.eth.accounts[0];
            $scope.accountIcon = $scope._accountIcon($scope.account);

            $scope.mailCount();
            $scope.startNewMailWatcher();
            $scope.mailFromAccount();
            $scope.mailToAccount();

            console.log("Openmail initialized");
        } else {
            console.log("No web3")
        }
    };

    // calls sendMail contract with the form values
    $scope.sendMail = function() {
        let body = document.getElementById("send-mail-body").value;
        let to = document.getElementById("send-mail-to").value;
        $scope.contract.sendMail(body, to, {
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
            $scope.$applyAsync(function () {
                $scope.openmail.mailCount = mailCount;
            });
        });
    };

    // show mail from current account
    $scope.mailFromAccount = function () {
        $scope.contract.getMailFromAddress($scope.account, function (error, mailFromAddress) {
            let mailFromAddressLength = mailFromAddress.length;
            for (let i = 0; i < mailFromAddressLength; i++) {
                $scope.contract.mail(mailFromAddress[i], function (error, mail) {
                    $scope.$applyAsync(function () {
                        $scope.openmail.sent.push({
                            mailId: mailFromAddress[i],
                            body: mail[0],
                            from: mail[1],
                            accountIcon: $scope._accountIcon(mail[1])
                        });
                    });
                });
            }
        });
    };

    // show inbox
    $scope.mailToAccount = function () {
        $scope.contract.getMailToAddress($scope.account, function (error, mailToAddress) {
            console.log(mailToAddress);
            let mailToAddressLength = mailToAddress.length;
            for (let i = 0; i < mailToAddressLength; i++) {
                $scope.contract.mail(mailToAddress[i], function (error, mail) {
                    $scope.$applyAsync(function () {
                        $scope.openmail.inbox.push({
                            mailId: mailToAddress[i],
                            body: mail[0],
                            from: mail[1],
                            accountIcon: $scope._accountIcon(mail[1])
                        });
                    });
                });
            }
        });
    };

    // every time that a new mail is created, we add it to mails
    $scope.startNewMailWatcher = function () {
        let NewMail = $scope.contract.NewMail({}, {
            fromBlock: 'latest',
            toBlock: 'latest'
        });
        NewMail.watch(function(error, mail) {
            $scope.$applyAsync(function () {
                // mail contains mailId, from, to
                if (mail.args.from == $scope.account) {
                    $scope.openmail.sent.push({
                        mailId: mail.args.mailId,
                        from: mail.args.from,
                        accountIcon: $scope._accountIcon(mail.args.from),
                        to: mail.args.to,
                        body: mail.args._body
                    });
                }
                if (mail.args.to == $scope.account) {
                    $scope.openmail.inbox.push({
                        mailId: mail.args.mailId,
                        from: mail.args.from,
                        accountIcon: $scope._accountIcon(mail.args.from),
                        to: mail.args.to,
                        body: mail.args._body
                    });
                }
            });
        })
    };

    $scope._accountIcon = function (ethAddress) {
        let icon = blockies.create({
            seed: ethAddress
        });
        return icon.toDataURL("image/jpeg")
    };

    // initialize
    $scope.init();
});
