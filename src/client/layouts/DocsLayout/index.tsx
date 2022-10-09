import { Box, Card, Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { FC, ReactNode } from 'react'
import Footer from 'src/client/components/Footer'

import Header from './Header'
import Sidebar from './Sidebar'

interface DocsLayoutProps {
  children?: ReactNode
}

const MainWrapper = styled(Box)(
  () => `
    flex: 1;
    display: flex;
    height: 100%;
`
)

const MainContent = styled(Box)(
  ({ theme }) => `
    flex: 1;
    margin-top: ${theme.spacing(10)};
    overflow: auto;
`
)

const DocsLayout: FC<DocsLayoutProps> = ({ children }) => (
  <>
    <Header />
    <MainWrapper>
      <Sidebar />
      <MainContent>
        <Container maxWidth="lg">
          <Card
            sx={{
              minHeight: 650,
              pb: 3,
              mb: 6,
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
            }}>
            {children || { children }}
          </Card>
        </Container>
        <Footer />
      </MainContent>
    </MainWrapper>
  </>
)

DocsLayout.propTypes = {
  children: PropTypes.node,
}

export default DocsLayout
