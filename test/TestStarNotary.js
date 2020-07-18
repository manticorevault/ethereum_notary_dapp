//Import the StarNotary Smart Contract ABI
const StarNotary = artifacts.require("StarNotary");

//List of development accounts provided by Truffle
let accounts; 

//Global variable use it in the test cases;
let owner;

//This called the StarNotary Smart Contract and initialize it
contract("StarNotary", (accs) => {
    //Assigning test accounts
    accounts = accs; 
    
    //Assigning the owner test account
    owner = accounts[0];

});

//Example test case. It will test if the contract is able to return StarName
//property initialized in the contract constructor

it("has correct name", async () => {
    //Making sure the Smart Contract is deployed and getting the instance
    let instance = await StarNotary.deployed();

    //Calling the StarName property
    let starName = await instance.starName.call();

    //Assert if the starName property was initialized correctly
    assert.equal(starName, "Yangari's Fall");
});

it("can be claimed", async () => {
    //Making sure the Smart Contract is deployed and getting the instance.
    let instance = await StarNotary.deployed();

    //Calling the Smart Contract function claimStar()
    await instance.claimStar({ from: owner });

    //Getting the owner address
    let starOwner = await instance.starOwner.call();

    //Verifying if the owner address match with the one given
    assert.equal(starOwner, owner);
});

// Example test case, it will test is the Smart Contract 
// function claimStar assigned the Star to the owner address 
// and it can be changed
it("can change owners", async () => {
    let instance = await StarNotary.deployed();
    let secoundUser = accounts[1];
    await instance.claimStar({ from:owner });
    let starOwner = await instance.starOwner.call();
    assert.equal(starOwner, owner);
    await instance.claimStar({ from: secoundUser });
    let secondOwner = await instance.starOwner.call();
    assert.equal(secondOwner, secoundUser); 
});

it('can change names', async () => {
    await instance.claimStar({ from: owner });
    await instance.changeName('New Name', { from: owner });
    assert.equal(await instance.starName.call(), 'New Name');
});