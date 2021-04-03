import * as Types from './types'
import { getPoolContract, getPoolFactoryContract } from '../../utils/web3Pool'
import { payloadToDispatch, errorToDispatch } from '../helpers'
import { getUtilsContract } from '../../utils/web3Utils'

export const poolFactoryLoading = () => ({
  type: Types.POOLFACTORY_LOADING,
})

/**
 * Get address of pool via token address
 * @param {address} tokenAddr
 * @returns {address} poolAddr
 */
export const getPoolFactoryPool = (tokenAddr) => async (dispatch) => {
  dispatch(poolFactoryLoading())
  const contract = getPoolFactoryContract()

  try {
    const poolAddr = await contract.callStatic.getPool(tokenAddr)
    dispatch(payloadToDispatch(Types.POOLFACTORY_GET_POOL, poolAddr))
  } catch (error) {
    dispatch(errorToDispatch(Types.POOLFACTORY_ERROR, error))
  }
}

// /**
//  * Get listed pools count
//  * @returns {uint} poolCount
//  */
// export const getPoolFactoryCount = () => async (dispatch) => {
//   dispatch(poolFactoryLoading())
//   const contract = getPoolFactoryContract()

//   try {
//     const poolCount = await contract.callStatic.poolCount()
//     dispatch(payloadToDispatch(Types.POOLFACTORY_GET_COUNT, poolCount))
//   } catch (error) {
//     dispatch(errorToDispatch(Types.POOLFACTORY_ERROR, error))
//   }
// }

// /**
//  * Get listed tokens count
//  * @returns {uint} tokenCount
//  */
// export const getPoolFactoryTokenCount = () => async (dispatch) => {
//   dispatch(poolFactoryLoading())
//   const contract = getPoolFactoryContract()

//   try {
//     const tokenCount = await contract.callStatic.tokenCount()
//     dispatch(payloadToDispatch(Types.POOLFACTORY_GET_TOKEN_COUNT, tokenCount))
//   } catch (error) {
//     dispatch(errorToDispatch(Types.POOLFACTORY_ERROR, error))
//   }
// }

/**
 * Get array of all listed token addresses
 * @param {address} wbnbAddr
 * @returns {array} tokenArray
 */
export const getPoolFactoryTokenArray = (wbnbAddr) => async (dispatch) => {
  dispatch(poolFactoryLoading())
  const contract = getPoolFactoryContract()

  try {
    const tokenCount = await contract.callStatic.tokenCount()
    const tempArray = []
    for (let i = 0; i < tokenCount; i++) {
      tempArray.push(contract.callStatic.getToken(i))
    }
    const tokenArray = await Promise.all(tempArray)
    const wbnbIndex = tokenArray.findIndex((i) => i === wbnbAddr)
    if (wbnbIndex > -1)
      tokenArray[wbnbIndex] = '0x0000000000000000000000000000000000000000'
    dispatch(payloadToDispatch(Types.POOLFACTORY_GET_TOKEN_ARRAY, tokenArray))
  } catch (error) {
    dispatch(errorToDispatch(Types.POOLFACTORY_ERROR, error))
  }
}

// /**
//  * Get curated pools count
//  * @returns {uint} curatedPoolCount
//  */
// export const getPoolFactoryCuratedCount = () => async (dispatch) => {
//   dispatch(poolFactoryLoading())
//   const contract = getPoolFactoryContract()

//   try {
//     const curatedPoolCount = await contract.callStatic.getCuratedPoolsLength()
//     dispatch(
//       payloadToDispatch(Types.POOLFACTORY_GET_CURATED_COUNT, curatedPoolCount),
//     )
//   } catch (error) {
//     dispatch(errorToDispatch(Types.POOLFACTORY_ERROR, error))
//   }
// }

/**
 * Get array of curated pool addresses
 * @returns {array} curatedPoolArray
 */
export const getPoolFactoryCuratedArray = () => async (dispatch) => {
  dispatch(poolFactoryLoading())
  const contract = getPoolFactoryContract()

  try {
    const curatedPoolCount = await contract.callStatic.getCuratedPoolsLength()
    const tempArray = []
    for (let i = 0; i < curatedPoolCount; i++) {
      tempArray.push(contract.callStatic.getCuratedPool(i))
    }
    const curatedPoolArray = await Promise.all(tempArray)
    dispatch(
      payloadToDispatch(Types.POOLFACTORY_GET_CURATED_ARRAY, curatedPoolArray),
    )
  } catch (error) {
    dispatch(errorToDispatch(Types.POOLFACTORY_ERROR, error))
  }
}

// /**
//  * Get array of tokenAddresses grouped with poolAddresses
//  * @param {array} tokenArray
//  * @returns {array} poolArray
//  */
// export const getPoolFactoryArray = (tokenArray) => async (dispatch) => {
//   dispatch(poolFactoryLoading())
//   const contract = getPoolFactoryContract()

//   try {
//     const tempArray = await Promise.all(
//       tokenArray.map((token) => contract.callStatic.getPool(token)),
//     )
//     const poolArray = []
//     for (let i = 0; i < tokenArray.length; i++) {
//       const tempItem = {
//         tokenAddress: tokenArray[i],
//         poolAddress: tempArray[i],
//       }
//       poolArray.push(tempItem)
//     }
//     dispatch(payloadToDispatch(Types.POOLFACTORY_GET_ARRAY, poolArray))
//   } catch (error) {
//     dispatch(errorToDispatch(Types.POOLFACTORY_ERROR, error))
//   }
// }

/**
 * Get detailed array of token/pool information
 * @param {array} poolArray
 * @returns {array} detailedArray
 */
export const getPoolFactoryDetailedArray = (tokenArray, spartaAddr) => async (
  dispatch,
) => {
  dispatch(poolFactoryLoading())
  const contract = getUtilsContract()

  try {
    if (tokenArray[0] !== spartaAddr) {
      tokenArray.unshift(spartaAddr)
    }
    const tempArray = await Promise.all(
      tokenArray.map((i) => contract.callStatic.getTokenDetails(i)),
    )
    const detailedArray = []
    for (let i = 0; i < tokenArray.length; i++) {
      const tempItem = {
        // Layer1 Asset Details
        tokenAddress: tokenArray[i],
        balanceTokens: tempArray[i].balance.toString(),
        name: tempArray[i].name,
        symbol: tempArray[i].symbol,
        decimals: tempArray[i].decimals.toString(),
        totalSupply: tempArray[i].totalSupply.toString(),
        curated: '',
        symbolUrl: '',
        // SP-pTOKEN Details
        poolAddress: '',
        balanceLPs: '0',
        lockedLPs: '0',
        baseAmount: '',
        tokenAmount: '',
        poolUnits: '',
        lastMonthDivis: '',
        genesis: '',
        // SP-sTOKEN Details
      }
      detailedArray.push(tempItem)
    }
    dispatch(
      payloadToDispatch(Types.POOLFACTORY_GET_DETAILED_ARRAY, detailedArray),
    )
  } catch (error) {
    dispatch(errorToDispatch(Types.POOLFACTORY_ERROR, error))
  }
}

/**
 * Get finalised/useable array of token/pool information
 * @param {array} detailedArray
 * @param {array} curatedArray
 * @returns {array} finalArray
 */
export const getPoolFactoryFinalArray = (detailedArray, curatedArray) => async (
  dispatch,
) => {
  dispatch(poolFactoryLoading())
  const contract = getUtilsContract()

  try {
    const tempArray = await Promise.all(
      detailedArray.map((i) =>
        i.symbol === 'SPARTA'
          ? {
              genesis: '0',
              baseAmount: '0',
              tokenAmount: '0',
              poolUnits: '0',
            }
          : contract.callStatic.getPoolData(i.tokenAddress),
      ),
    )
    const finalArray = detailedArray
    for (let i = 0; i < detailedArray.length; i++) {
      finalArray[i].poolAddress = tempArray[i].poolAddress
      finalArray[i].genesis = tempArray[i].genesis.toString()
      finalArray[i].baseAmount = tempArray[i].baseAmount.toString()
      finalArray[i].tokenAmount = tempArray[i].tokenAmount.toString()
      finalArray[i].poolUnits = tempArray[i].poolUnits.toString()
      finalArray[i].curated =
        curatedArray.find((item) => item === tempArray[i].poolAddress) > 0
    }
    dispatch(payloadToDispatch(Types.POOLFACTORY_GET_FINAL_ARRAY, finalArray))
  } catch (error) {
    dispatch(errorToDispatch(Types.POOLFACTORY_ERROR, error))
  }
}

/**
 * Add LP holdings to final array (maybe add the other LP calls here too?)
 * @param {array} finalArray
 * @returns {array} finalLpArray
 */
export const getPoolFactoryFinalLpArray = (finalArray, walletAddress) => async (
  dispatch,
) => {
  dispatch(poolFactoryLoading())

  try {
    let tempArray = []
    for (let i = 0; i < finalArray.length; i++) {
      const contract =
        finalArray[i].symbol === 'SPARTA'
          ? null
          : getPoolContract(finalArray[i].poolAddress)
      tempArray.push(
        finalArray[i].symbol === 'SPARTA'
          ? '0'
          : contract.callStatic.map30DPoolRevenue(),
      )
      tempArray.push(
        finalArray[i].symbol === 'SPARTA'
          ? '0'
          : contract.callStatic.mapPast30DPoolRevenue(),
      )
      tempArray.push(
        finalArray[i].symbol === 'SPARTA' || !walletAddress
          ? '0'
          : contract.callStatic.balanceOf(walletAddress),
      )
    }
    tempArray = await Promise.all(tempArray)
    const finalLpArray = finalArray
    for (let i = 0; i < tempArray.length - 2; i += 3) {
      finalLpArray[i / 3].recentDivis = tempArray[i].toString()
      finalLpArray[i / 3].lastMonthDivis = tempArray[i + 1].toString()
      finalLpArray[i / 3].balanceLPs = tempArray[i + 2].toString()
    }
    dispatch(
      payloadToDispatch(Types.POOLFACTORY_GET_FINAL_LP_ARRAY, finalLpArray),
    )
  } catch (error) {
    dispatch(errorToDispatch(Types.POOLFACTORY_ERROR, error))
  }
}
