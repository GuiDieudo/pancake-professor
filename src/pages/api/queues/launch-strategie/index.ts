/* eslint-disable no-param-reassign */
import BlocknativeSdk from 'bnc-sdk'
import { ethers } from 'ethers'
import { Queue } from 'quirrel/next'
import { PREDICTION_CONTRACT_ABI } from 'src/contracts/abis/pancake-prediction-abi-v3'
import { decrypt } from 'src/server/utils/crpyto'
import logger from 'src/server/utils/logger'
import WebSocket from 'ws'

const BET_BULL_METHOD_ID = '0x57fb096f'
const BET_BEAR_METHOD_ID = '0xaa6b873a'
const CLAIM_BEAR_METHOD_ID = '0x6ba4c138'

const MAX_BET_AMOUNT = 0.1
const MIN_BET_AMOUNT = 0.001

const provider = new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_PROVIDER)

const options = {
  dappId: process.env.BLOCKNATIVE_API_KEY,
  networkId: 56,
  ws: WebSocket,
  onerror: (error) => {
    logger.error(error)
  },
}

const blocknative = new BlocknativeSdk(options)

// https://docs.quirrel.dev/api/queue

export const launchStrategie = async (payload: any) => {
  const { user, strategie } = payload
  let preditionContract
  let signer

  // TODO define interface to stabilise objecti params that we need in addition to default fields
  // TODO load player from TheGraph to have special data like amountBNB played

  if (!user) throw new Error('No user given')
  if (!strategie) throw new Error('No strategie given')

  // TODO update user to isplaying True.
  logger.info(`[LAUNCHING] Job launching job for strategie ${strategie.id} and user ${user.id}`)

  // const betRound = async ({ epoch, betBull, betAmount, isAlreadyRetried = false }) => {
  const betRound = async ({ epoch, betBull, betAmount }) => {
    if (strategie.balance === 0) return logger.error('[PLAYING] Not enought BNB')

    // if (bankroll > countedBankroll * 1.5) {
    //   const newBetAmount = parseFloat(betAmount * 1.25).toFixed(4)
    //   logger.info(`[OPTIMIZE] Increasing bet amount from ${betAmount} to ${newBetAmount}`)
    //   betAmount = newBetAmount
    //   BET_AMOUNT = newBetAmount
    //   countedBankroll = bankroll
    // }

    // if (bankroll < countedBankroll / 1.5) {
    //   const newBetAmount = parseFloat(betAmount / 1.25).toFixed(4)
    //   logger.info(`[OPTIMIZE] Decreasing bet amount from ${betAmount} to ${newBetAmount}`)
    //   betAmount = newBetAmount
    //   BET_AMOUNT = newBetAmount
    //   countedBankroll = bankroll
    // }

    if (betAmount < MIN_BET_AMOUNT) betAmount = MIN_BET_AMOUNT

    if (betAmount > MAX_BET_AMOUNT) betAmount = MAX_BET_AMOUNT

    const amount = parseFloat(betAmount).toFixed(4)
    const betBullOrBear = betBull ? 'betBull' : 'betBear'

    const gasPrice = await provider.getGasPrice()

    if (+amount === 0) return logger.error('[PLAYING] Bet amount is 0')

    try {
      const tx = await preditionContract[betBullOrBear](epoch.toString(), {
        value: ethers.utils.parseEther(amount),
        gasPrice,
        nonce: provider.getTransactionCount(user.generated, 'latest'),
        // gasPrice: ethers.utils.parseUnits(FAST_GAS_PRICE.toString(), 'gwei').toString(),
        // gasLimit: ethers.utils.hexlify(250000),
      })

      await tx.wait()

      strategie.playedEpochs.push(epoch.toString())
      strategie.playsCount += 1
    } catch (error) {
      logger.error(`[PLAYING] Betting Tx Error for user ${user.id} and epoch ${epoch}`)
      logger.error(error.message)

      // Try to reenter
      // const { startTimestamp, lockTimestamp } = await preditionContract.rounds(currentEpoch)

      // const secondsFromEpoch = Math.floor(new Date().getTime() / 1000) - startTimestamp

      // const secondsLeftUntilNextEpoch = 5 * 60 - secondsFromEpoch

      // const minutesLeft = secondsLeftUntilNextEpoch < 60 ? 0 : Math.trunc(secondsLeftUntilNextEpoch / 60)
      // const secondsLeft = secondsLeftUntilNextEpoch - minutesLeft * 60

      // console.log('🚀  ~ secondsLeft', secondsLeft)

      // if (secondsLeft >= 15 && isAlreadyRetried === false) await bet(epoch, betBull, betAmount, true)
      // else {
      //   playsCount++
      //   playsCountForActualPlayer++
      // }
    }

    logger.info('------------------------------------------------------------')
    logger.info('------------------------------------------------------------')
  }

  const processRound = async (transaction) => {
    const epoch = await preditionContract.currentEpoch()

    logger.info(`[LISTEN] Transaction pending detected for playerAddress ${strategie.player} and epoch ${epoch}`)

    if (transaction.from.toLowerCase() !== strategie.player) {
      logger.error(`[LISTEN] Incoming transaction.`)
      return
    }

    if (transaction.to.toLowerCase() !== process.env.PANCAKE_PREDICTION_CONTRACT_ADDRESS) {
      logger.info(`[LISTEN] Not a transaction with pancake contract.`)
      return
    }

    if (!transaction.input.includes(BET_BULL_METHOD_ID) && !transaction.input.includes(BET_BEAR_METHOD_ID)) {
      logger.info(`[LISTEN] Not a bull or bear transaction.`)
      return
    }

    if (transaction.input.includes(CLAIM_BEAR_METHOD_ID)) {
      logger.info(`[LISTEN] Claim transaction.`)
      return
    }

    if (strategie.playedHashs.includes(transaction.hash)) {
      logger.info(`[LISTEN] Already played transaction hash.`)
      return
    }

    logger.info(`[LISTEN] Transaction : https://bscscan.com/tx/${transaction.hash}`)

    // TODO ANALYSE BET % FREQUENCY IN HISTORIE TO SEE IF IT'S A RISKED BET
    // --> (Some players bet really smaller amount when they are trying to play a market flip)
    // let playerBalance = await provider.getBalance(playerAddress, "latest")
    // playerBalance = ethers.utils.formatEther(playerBalance)

    // let balance = await provider.getBalance(signer.address)
    // balance = ethers.utils.formatEther(balance)

    // TODO DECODE FUNCTION (see pending.js)
    const betBull = transaction.input.includes(BET_BULL_METHOD_ID)

    const { betAmount } = strategie
    // const playerBetAmount = ethers.utils.formatEther(transaction.value)

    // logger.info(`[LISTEN] BetBull ${betBull}, playerBetAmount ${playerBetAmount}`)

    // // Check if less than average
    // if (parseFloat(+playerBetAmount).toFixed(3) < parseFloat(+player.averageBNB).toFixed(3)) {
    //   logger.info('**************************')
    //   logger.info(`[LISTEN] BET AMOUNT IS LESS THAN AVERAGE, not a secure bet. --> Decreasing bet amount value to 30%`)
    //   logger.info('**************************')
    //   betAmount *= 0.7
    //   // return
    // }

    // TODO check if it really good for equity to increase amoung in this case
    //  else if (
    //   parseFloat(+playerBetAmount).toFixed(3) >=
    //   parseFloat(+player.averageBNB * 1.5).toFixed(3)
    // ) {
    //   logger.info("**************************")
    //   logger.info(
    //     `[LISTEN] BET AMOUNT IS MUCH MORE THAN AVERAGE, looks to be a good spot. --> Increasin bet amount value to 25%`
    //   )
    //   logger.info("**************************")
    //   betAmount = betAmount * 1.25
    // }

    logger.info('------------------------------------------------------------')
    logger.info('------------------------------------------------------------')
    logger.info(`[PLAYING] Betting on ${betBull ? 'BULL' : 'BEAR'} with ${betAmount}BNB amount for epoch ${epoch}`)

    strategie.playedHashs.push(transaction.hash)

    await betRound({ epoch, betBull, betAmount })
  }

  const listen = async () => {
    const privateKey = decrypt(user.private)
    signer = new ethers.Wallet(privateKey, provider)

    const initialBankrollBigInt = await provider.getBalance(signer.address)
    strategie.initialBankroll = parseInt(ethers.utils.formatEther(initialBankrollBigInt), 10)
    strategie.bankroll = strategie.initialBankroll
    strategie.startedBalance = strategie.initialBankroll

    strategie.betAmount = (strategie.bankroll / 15).toFixed(4)

    strategie.playedHashs = []
    logger.info(`Stetting up bet amount to ${strategie.betAmount} for initial bankroll ${strategie.bankroll}.`)

    preditionContract = new ethers.Contract(
      process.env.PANCAKE_PREDICTION_CONTRACT_ADDRESS,
      PREDICTION_CONTRACT_ABI,
      signer
    )
    logger.info(`Starting for user ${user.generated} copy betting  player ${strategie.player}`)

    logger.info(`[LISTEN] Waiting for transaction for player ${strategie.player}`)
    const { emitter } = blocknative.account(strategie.player)
    emitter.on('txPool', processRound)

    logger.info(`[LISTEN] emitter is listenning to transaction from mempool`)
  }

  try {
    await listen()
  } catch (error) {
    console.log('🚀 ~ file: index.ts ~ line 199 ~ listen ~ error', error)
    throw new Error(error)
    // TODO update user to isplaying false.
  }
}

// export default Queue('api/jobs/launch-strategie', launchStrategie, {
export const launchStrategieQueue = Queue('api/jobs/launch-strategie', launchStrategie, {
  // export default Queue('api/jobs/launch-strategie', launchStrategie, {
  // if execution fails, it will be retried
  // 10s, 1min and 2mins after the scheduled date
  // retry: ['10s', '1min', '2min'],
})

// export { launchStrategie, LaunchStrategieQueue }
