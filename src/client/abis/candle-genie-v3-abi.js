const PREDICTION_CONTRACT_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_operatorAddress", type: "address" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "epoch",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "BetBear",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "epoch",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "BetBull",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "bufferSeconds",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "intervalSeconds",
        type: "uint256"
      }
    ],
    name: "BufferAndIntervalSecondsUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "epoch", type: "uint256" }
    ],
    name: "CancelRound",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "epoch",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "Claim",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "epoch",
        type: "uint256"
      },
      { indexed: false, internalType: "int256", name: "price", type: "int256" },
      {
        indexed: false,
        internalType: "uint32",
        name: "timestamp",
        type: "uint32"
      }
    ],
    name: "EndRound",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "epoch",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bullAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bearAmount",
        type: "uint256"
      }
    ],
    name: "HouseBet",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "InjectFunds",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "epoch",
        type: "uint256"
      },
      { indexed: false, internalType: "int256", name: "price", type: "int256" },
      {
        indexed: false,
        internalType: "uint32",
        name: "timestamp",
        type: "uint32"
      }
    ],
    name: "LockRound",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "epoch",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "minBetAmount",
        type: "uint256"
      }
    ],
    name: "MinBetAmountUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "priceSource",
        type: "string"
      }
    ],
    name: "NewPriceSource",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "epoch", type: "uint256" }
    ],
    name: "Pause",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "Paused",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "epoch",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rewardBaseCalAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rewardAmount",
        type: "uint256"
      }
    ],
    name: "RewardsCalculated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "epoch", type: "uint256" }
    ],
    name: "StartRound",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "epoch", type: "uint256" }
    ],
    name: "Unpause",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "Unpaused",
    type: "event"
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "address", name: "", type: "address" }
    ],
    name: "Bets",
    outputs: [
      {
        internalType: "enum CandleGeniePredictionV3.Position",
        name: "position",
        type: "uint8"
      },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "bool", name: "claimed", type: "bool" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "OwnershipRenounce",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "OwnershipTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "Rounds",
    outputs: [
      { internalType: "uint256", name: "epoch", type: "uint256" },
      { internalType: "uint256", name: "bullAmount", type: "uint256" },
      { internalType: "uint256", name: "bearAmount", type: "uint256" },
      { internalType: "uint256", name: "rewardBaseCalAmount", type: "uint256" },
      { internalType: "uint256", name: "rewardAmount", type: "uint256" },
      { internalType: "int256", name: "lockPrice", type: "int256" },
      { internalType: "int256", name: "closePrice", type: "int256" },
      { internalType: "uint32", name: "startTimestamp", type: "uint32" },
      { internalType: "uint32", name: "lockTimestamp", type: "uint32" },
      { internalType: "uint32", name: "closeTimestamp", type: "uint32" },
      { internalType: "uint32", name: "lockPriceTimestamp", type: "uint32" },
      { internalType: "uint32", name: "closePriceTimestamp", type: "uint32" },
      { internalType: "bool", name: "closed", type: "bool" },
      { internalType: "bool", name: "cancelled", type: "bool" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" }
    ],
    name: "UserBets",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "_owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "bufferSeconds",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "epoch", type: "uint256" },
      { internalType: "address", name: "user", type: "address" }
    ],
    name: "claimable",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "control_Pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "control_Resume",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "epoch", type: "uint256" },
      { internalType: "bool", name: "cancelled", type: "bool" },
      { internalType: "bool", name: "closed", type: "bool" }
    ],
    name: "control_RoundCancel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "int256", name: "price", type: "int256" },
      { internalType: "uint32", name: "timestamp", type: "uint32" }
    ],
    name: "control_RoundExecute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "int256", name: "price", type: "int256" },
      { internalType: "uint32", name: "timestamp", type: "uint32" }
    ],
    name: "control_RoundLock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "control_RoundStart",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "currentBlockNumber",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "currentBlockTimestamp",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "currentEpoch",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "uint256", name: "cursor", type: "uint256" },
      { internalType: "uint256", name: "size", type: "uint256" }
    ],
    name: "getUserRounds",
    outputs: [
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      {
        components: [
          {
            internalType: "enum CandleGeniePredictionV3.Position",
            name: "position",
            type: "uint8"
          },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "bool", name: "claimed", type: "bool" }
        ],
        internalType: "struct CandleGeniePredictionV3.BetInfo[]",
        name: "",
        type: "tuple[]"
      },
      { internalType: "uint256", name: "", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getUserRoundsLength",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "intervalSeconds",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "lockOnce",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "minBetAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "operatorAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "owner_BlackListInsert",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "owner_BlackListRemove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "string", name: "_priceSource", type: "string" }],
    name: "owner_ChangePriceSource",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
    name: "owner_FundsExtract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "owner_FundsInject",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "bullAmount", type: "uint256" },
      { internalType: "uint256", name: "bearAmount", type: "uint256" }
    ],
    name: "owner_HouseBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" }
    ],
    name: "owner_RewardUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_operatorAddress", type: "address" }
    ],
    name: "owner_SetOperator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "priceSource",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "epoch", type: "uint256" },
      { internalType: "address", name: "user", type: "address" }
    ],
    name: "refundable",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "rewardRate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_bufferSeconds", type: "uint256" },
      { internalType: "uint256", name: "_intervalSeconds", type: "uint256" }
    ],
    name: "setBufferAndIntervalSeconds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_minBetAmount", type: "uint256" }
    ],
    name: "settings_SetMinBetAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_rewardRate", type: "uint256" }],
    name: "settings_SetRewardRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "startOnce",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "epoch", type: "uint256" }],
    name: "user_BetBear",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "epoch", type: "uint256" }],
    name: "user_BetBull",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256[]", name: "epochs", type: "uint256[]" }],
    name: "user_Claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
]

module.exports = {
  PREDICTION_CONTRACT_ABI
}