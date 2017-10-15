var RagnaCrowdsale = artifacts.require("./RagnaCrowdsale.sol");
var RagnaCoin = artifacts.require("./RagnaCoin.sol");

contract('RagnaCrowdsale', function(accounts) {
    it("RagnaCrowdsale must create token contract", function() {
        return RagnaCrowdsale.deployed()
            .then(instance => {
                account1 = accounts[1];
                instance.token().then(addr => {
                        tokenAddress = addr;
                    })
                    .then(function() {
                        rcInstance = RagnaCoin.at(tokenAddress);
                    })
                    .then(function() {
                        rcInstance.balanceOf(account1)
                            .then(balance => bal = balance.toString(10))
                            .then(x => {
                                console.log(bal);
                                assert.equal(bal, '0', 'Address ' + account1.toString() + ' contains 0 tokens.');
                            });
                    });
            });
    });

    it("RagnaCrowdsale must sell tokens", function() {
        return RagnaCrowdsale
            .deployed()
            .then(instance => {
                account1 = accounts[1];
                instance.token()
                    .then(addr => {
                        instance.sendTransaction({ from: account1, value: web3.toWei(1, "ether")});
                    })
                    .then(() => {
                        RagnaCoin.at(tokenAddress)
                            .then(x => {
                                x.balanceOf(account1)
                                    .then(b => {
                                        ragnacoinBalance = b.toString(10);
                                        console.log(ragnacoinBalance);
                                        assert.equal(ragnacoinBalance, '5000000000000000000000', 'Address ' + account1.toString() + ' contains 5000000000000000000000 tokens.');
                                    })
                            })
                    })
            })

    });



    it("CrowdSale contract should sell tokens", function() {

    });
    // it("should call a function that depends on a linked library", function() {
    //   var meta;
    //   var metaCoinBalance;
    //   var metaCoinEthBalance;
    //
    //   return MetaCoin.deployed().then(function(instance) {
    //     meta = instance;
    //     return meta.getBalance.call(accounts[0]);
    //   }).then(function(outCoinBalance) {
    //     metaCoinBalance = outCoinBalance.toNumber();
    //     return meta.getBalanceInEth.call(accounts[0]);
    //   }).then(function(outCoinBalanceEth) {
    //     metaCoinEthBalance = outCoinBalanceEth.toNumber();
    //   }).then(function() {
    //     assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, "Library function returned unexpected function, linkage may be broken");
    //   });
    // });
    // it("should send coin correctly", function() {
    //   var meta;
    //
    //   // Get initial balances of first and second account.
    //   var account_one = accounts[0];
    //   var account_two = accounts[1];
    //
    //   var account_one_starting_balance;
    //   var account_two_starting_balance;
    //   var account_one_ending_balance;
    //   var account_two_ending_balance;
    //
    //   var amount = 10;
    //
    //   return MetaCoin.deployed().then(function(instance) {
    //     meta = instance;
    //     return meta.getBalance.call(account_one);
    //   }).then(function(balance) {
    //     account_one_starting_balance = balance.toNumber();
    //     return meta.getBalance.call(account_two);
    //   }).then(function(balance) {
    //     account_two_starting_balance = balance.toNumber();
    //     return meta.sendCoin(account_two, amount, {from: account_one});
    //   }).then(function() {
    //     return meta.getBalance.call(account_one);
    //   }).then(function(balance) {
    //     account_one_ending_balance = balance.toNumber();
    //     return meta.getBalance.call(account_two);
    //   }).then(function(balance) {
    //     account_two_ending_balance = balance.toNumber();
    //
    //     assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
    //     assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    //   });
    // });
});
