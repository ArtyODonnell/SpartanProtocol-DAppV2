import React, { useRef, useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'react-i18next'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'
import WalletSelect from '../../../../components/WalletSelect/index'
import { Icon } from '../../../../components/Icons'

import styles from './styles.module.scss'
import { formatShortString } from '../../../../utils/web3'

const AddressConn = () => {
  const wallet = useWeb3React()
  const [walletModalShow, setWalletModalShow] = useState(false)
  const [showPopConnect, setShowPopConnect] = useState(false)
  const { t } = useTranslation()

  const target = useRef(null)

  useEffect(() => {
    async function listenAccountsChanged() {
      window.ethereum?.on('accountsChanged', async () => {
        document.location.reload(true)
      })
      window.BinanceChain?.on('accountsChanged', async () => {
        document.location.reload(true)
      })
    }
    async function listenNetworkChanged() {
      window.ethereum?.on('chainChanged', async () => {
        document.location.reload(true)
      })
      window.BinanceChain?.on('chainChanged', async () => {
        document.location.reload(true)
      })
    }
    listenAccountsChanged()
    listenNetworkChanged()
  }, [])

  useEffect(() => {
    setShowPopConnect(true)
    setTimeout(() => {
      setShowPopConnect(false)
    }, 3500)
  }, [])

  return (
    <>
      <WalletSelect
        show={walletModalShow}
        onHide={() => setWalletModalShow(false)}
      />
      <div
        role="button"
        className={`${styles.headerBtn} mx-2`}
        onClick={() => setWalletModalShow(true)}
        onKeyPress={() => setWalletModalShow(true)}
        ref={target}
        aria-hidden="true"
      >
        <Icon
          icon="bnbChainConnected"
          fill={wallet?.account ? 'green' : '#d80000'}
          size="27"
        />
        <span className={`${styles.btnText} ms-1`}>
          {wallet?.account
            ? formatShortString(wallet.account)
            : t('connectWallet')}
        </span>
      </div>
      <Overlay
        target={target.current}
        show={showPopConnect}
        placement="bottom"
        onHide={() => setShowPopConnect(false)}
      >
        <Popover>
          <Popover.Header />
          <Popover.Body>
            <b>{t('checkConnectWallet')}</b>
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  )
}
export default AddressConn
