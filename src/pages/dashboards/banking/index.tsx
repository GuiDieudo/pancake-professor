import { Grid } from '@mui/material'
import Head from 'next/head'
import type { ReactElement } from 'react'
import Bills from 'src/client/components/Dashboards/Banking/Bills'
import Investments from 'src/client/components/Dashboards/Banking/Investments'
import MainAccount from 'src/client/components/Dashboards/Banking/MainAccount'
import PageHeader from 'src/client/components/Dashboards/Banking/PageHeader'
import Payments from 'src/client/components/Dashboards/Banking/Payments'
import Requests from 'src/client/components/Dashboards/Banking/Requests'
import SecondaryAccounts from 'src/client/components/Dashboards/Banking/SecondaryAccounts'
import TransactionsStatistics from 'src/client/components/Dashboards/Banking/TransactionsStatistics'
import Transfers from 'src/client/components/Dashboards/Banking/Transfers'
import Footer from 'src/client/components/Footer'
import PageTitleWrapper from 'src/client/components/PageTitleWrapper'
import AccentSidebarLayout from 'src/client/layouts/AccentSidebarLayout'

function DashboardBanking() {
  return (
    <>
      <Head>
        <title>Banking Dashboard</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Grid sx={{ px: 4 }} container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
        <Grid item xs={12}>
          <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
            <Grid item lg={3} sm={6} xs={12}>
              <Transfers />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <Bills />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <Requests />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <Payments />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={8} xs={12}>
          <MainAccount />
        </Grid>
        <Grid item md={4} xs={12}>
          <SecondaryAccounts />
        </Grid>
        <Grid item lg={5} md={6} xs={12}>
          <Investments />
        </Grid>
        <Grid item lg={7} md={6} xs={12}>
          <TransactionsStatistics />
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}

export default DashboardBanking

DashboardBanking.getLayout = function getLayout(page: ReactElement) {
  return <AccentSidebarLayout>{page}</AccentSidebarLayout>
}
