import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'
import CloseIcon from '@mui/icons-material/Close'
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone'
import {
  Alert,
  Box,
  Button,
  Card,
  Collapse,
  Dialog,
  Grid,
  IconButton,
  Slide,
  Typography,
  useTheme,
  Zoom,
} from '@mui/material'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import { TransitionProps } from '@mui/material/transitions'
import { ethers } from 'ethers'
import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import { forwardRef, ReactElement, Ref, useState } from 'react'
import { useTranslation } from 'react-i18next'

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
)

const GaugeWrapper = styled(Box)(
  () => `
    position: relative;
`
)

const BoxButtons = styled(Box)(
  () => `
    display: flex;
    justify-content: center;
`
)

const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 0 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}

const LinearProgressWrapper = styled(LinearProgressWithLabel)(
  ({ theme }) => `
    flex-grow: 1;
    margin-right: ${theme.spacing(3)};
    margin-left: ${theme.spacing(3)};
    height: 15px;

    .MuiLinearProgress-barColorPrimary {
      background-color: ${theme.colors.primary.main};
      border-top-right-radius: ${theme.general.borderRadius};
      border-bottom-right-radius: ${theme.general.borderRadius};
    }
`
)

const IconButtonIncrement = styled(IconButton)(
  ({ theme }) => `
      background-color: ${theme.colors.alpha.black[5]};
      color: ${theme.colors.alpha.black[70]};
      width: ${theme.spacing(6)};
      height: ${theme.spacing(6)};
      border-radius: 50px;
      box-shadow: 0px 1px 3px ${theme.colors.alpha.black[30]}, 0px 3px 8px 1px ${theme.colors.alpha.black[10]};
      display: flex;
      align-items: center;
      margin: 0 15px;
      justify-content: center;
      transition: ${theme.transitions.create(['all'])};
      z-index: 5;

      &:hover {
        background-color: ${theme.colors.primary.main};
        color: ${theme.palette.primary.contrastText};
        box-shadow: ${theme.colors.shadows.primary};
      }
`
)

/* eslint-disable */
const Transition = forwardRef((props: TransitionProps & { children?: ReactElement<any, any> }, ref: Ref<unknown>) => (
  <Slide direction="down" ref={ref} {...props} />
))
/* eslint-enable */

function AddFundsForm({ user, handleCloseForm }) {
  const { t }: { t: any } = useTranslation()
  const theme = useTheme()

  const [gauge, setGauge] = useState(20)
  const [bnbValue, setBnbValue] = useState(parseFloat((user.balance * 20) / 100).toFixed(4))

  const [openDialog, setOpenDialog] = useState(false)

  const [openAlert, setOpenAlert] = useState(true)

  const { enqueueSnackbar } = useSnackbar()

  const handleGaugeIncrease = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (gauge === 100) return

    const updated = gauge + 2
    setGauge(updated)
    setBnbValue(parseFloat((user.balance * updated) / 100).toFixed(4))
  }

  const handleGaugeDecrease = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (gauge === 0) return

    const updated = gauge - 2
    setGauge(updated)
    setBnbValue(parseFloat((user.balance * updated) / 100).toFixed(4))
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const sumbitAddFunds = async () => {
    if (!window.ethereum?.request) return

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    if (!provider) return

    if (+bnbValue === 0) return

    const signer = provider.getSigner()

    const gasPrice = await provider.getGasPrice()

    const tx = {
      to: user.generated,
      value: ethers.utils.parseEther(bnbValue),
      nonce: provider.getTransactionCount(user.address, 'latest'),
      gasPrice,
    }

    try {
      await signer.sendTransaction(tx)

      enqueueSnackbar(t('Funds succefully sended.'), {
        variant: 'success',
        TransitionComponent: Zoom,
      })
    } catch (error) {
      enqueueSnackbar(t('Unexpected error during transaction.'), {
        variant: 'error',
        TransitionComponent: Zoom,
      })
    }

    handleCloseDialog()
    handleCloseForm()
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <Box display="flex" justifyContent="space-between" sx={{ pt: 4, px: 4, pb: 0, mb: 0 }} alignItems="center">
              <Box display="flex" alignItems="center">
                <Box pl={1}>
                  <Typography gutterBottom variant="h4">
                    {t('Add Funds')}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" fontWeight="normal">
                    {t('Add funds from your main address')}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box px={3} py={2}>
              <Box sx={{ mb: 2, textAlign: 'center' }}>
                <Typography sx={{ fontSize: `${theme.typography.pxToRem(20)}`, pt: 1 }} variant="h1">
                  {bnbValue} BNB
                </Typography>
              </Box>
              <LinearProgressWrapper value={gauge} color="primary" variant="determinate" />
              <BoxButtons px={3} py={2}>
                <IconButtonIncrement onClick={handleGaugeDecrease}>
                  <RemoveTwoToneIcon fontSize="medium" />
                </IconButtonIncrement>
                <IconButtonIncrement onClick={handleGaugeIncrease}>
                  <AddTwoToneIcon fontSize="medium" />
                </IconButtonIncrement>
              </BoxButtons>
            </Box>

            <Box px={3} py={2}>
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <Button
                    size="small"
                    disabled={+bnbValue === 0}
                    fullWidth
                    variant="contained"
                    // color="success"
                    onClick={handleOpenDialog}>
                    <b> {t('Add funds')}</b>
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button size="small" fullWidth variant="outlined" color="secondary" onClick={handleCloseForm}>
                    <b> {t('Return')}</b>
                    <CloseIcon fontSize="inherit" />
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <DialogWrapper
        open={openDialog}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}>
        <Box sx={{ px: 4, pb: 4, pt: 4 }}>
          <Collapse in={openAlert}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(false)
                  }}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              severity="warning">
              {t('This product is in beta, use it at your own risk.')}
            </Alert>
          </Collapse>

          <Typography align="center" sx={{ py: 4, pt: 5, pb: 5, pl: 10, pr: 10 }} variant="h3">
            {t('Are you sur to copy this player ? ')}
          </Typography>
          <Typography align="center" sx={{ py: 4, pt: 0, pb: 0, pr: 5, pl: 5 }} variant="body1">
            {t('We are listenning the adress directly from mempool to be as precise as possible.')}
          </Typography>
          <Typography align="center" sx={{ py: 4, pt: 0, pb: 5, pr: 5, pl: 5 }} variant="body1">
            {t(
              'Most of the time, you will play on the same block, but sometime, it could play on the next block and could be beatted for you but works for player.'
            )}
          </Typography>

          <Button fullWidth size="large" variant="contained" onClick={sumbitAddFunds}>
            {t('Add funds')}
          </Button>
        </Box>
      </DialogWrapper>
    </>
  )
}

AddFundsForm.propTypes = {
  user: PropTypes.shape({}).isRequired,
  handleCloseForm: PropTypes.func.isRequired,
}

export default AddFundsForm
