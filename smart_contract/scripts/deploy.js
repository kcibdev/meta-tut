const main = async () => {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = hre.ethers.utils.parseEther("1");

  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();
  // const transactions = await Transactions.deploy(unlockTime, { value: lockedAmount });

  await transactions.deployed();

  console.log("Transactions with deployed to:", transactions.address);
};

const runMain = async () => {
  try {
    await main();
    process.exitCode = 0;
  } catch (e) {
    console.log("Error:", e);
    process.exitCode = 1;
  }
};

runMain();
